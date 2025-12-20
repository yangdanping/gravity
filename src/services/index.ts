import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { RequestConfig, RequestOptions } from './request/types';
/**
 * TS 版 axios 封装（目标：可维护、可扩展、类型友好）
 *
 * 设计要点：
 * - 统一创建 axios 实例，集中管理拦截器
 * - request() 返回泛型数据 T；需要完整响应时用 raw=true
 * - 提供 get/post/put/delete 四种 Restful 方法
 */
export class Request {
  private readonly instance: AxiosInstance;

  constructor(options: RequestOptions) {
    this.instance = axios.create({
      baseURL: options.baseURL,
      timeout: options.timeout,
      paramsSerializer: options.paramsSerializer,
    });

    // 1) 先挂载“自定义拦截器”（如果有）
    // - request 拦截器：后添加的先执行（LIFO），所以“后挂载的”会更早执行
    // - response 拦截器：按挂载顺序执行（FIFO）
    if (options.interceptors?.request || options.interceptors?.requestError) {
      this.instance.interceptors.request.use(options.interceptors.request, options.interceptors.requestError);
    }
    if (options.interceptors?.response || options.interceptors?.responseError) {
      this.instance.interceptors.response.use(options.interceptors.response, options.interceptors.responseError);
    }

    // 2) 再挂载“通用拦截器”（最通用的行为放这里）
    this.setupCommonInterceptors();
  }

  /**
   * 通用拦截器：建议只放“所有接口都适用”的逻辑
   * 例如：注入 token、统一打印日志、统一错误提示等
   */
  private setupCommonInterceptors() {
    // 请求拦截器：每次发请求前都会走这里
    this.instance.interceptors.request.use(
      (config) => {
        /**
         * 示例：统一加 token（按需打开）
         *
         * const token = localStorage.getItem('token');
         * if (token) config.headers.set('Authorization', `Bearer ${token}`);
         */

        // 示例：统一设置 Content-Type（按需调整）
        // 注意：Axios v1 的 headers 是 AxiosHeaders 实例，推荐用 set 方法
        config.headers.set('Content-Type', config.headers.getContentType() ?? 'application/json');

        return config;
      },
      (error) => Promise.reject(error),
    );

    // 响应拦截器：每次收到响应都会走这里
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        /**
         * 这里做“统一错误处理”更方便：
         * - 例如：401 跳登录、toast 提示、上报日志等
         *
         * 目前先把错误原样抛出，调用方自行 catch 处理。
         */
        return Promise.reject(error);
      },
    );
  }

  /**
   * 核心请求方法（支持泛型）
   */
  async request<T = unknown, D = unknown>(config: RequestConfig<D> & { raw: true }): Promise<AxiosResponse<T>>;
  async request<T = unknown, D = unknown>(config: RequestConfig<D> & { raw?: false }): Promise<T>;
  async request<T = unknown, D = unknown>(config: RequestConfig<D>): Promise<T | AxiosResponse<T>> {
    const { raw, interceptors, ...axiosConfig } = config;

    // 允许单次请求在“发出前”再加工一次 axiosConfig（避免把 raw/interceptors 传进 axios）
    const finalConfig = (await interceptors?.request?.(axiosConfig as InternalAxiosRequestConfig)) ?? (axiosConfig as InternalAxiosRequestConfig);

    const response = await this.instance.request<T, AxiosResponse<T>, D>(finalConfig as AxiosRequestConfig<D>);

    // raw=true：返回完整 AxiosResponse（例如：需要 headers/status）
    if (raw) return response;

    // 默认：只返回 data（最常用）
    const data = response.data;

    // 允许单次请求对 data 做二次加工（raw=true 时不执行）
    const transformed = (await interceptors?.response?.(data)) ?? data;
    return transformed;
  }

  /**
   * Restful: GET
   */
  get<T = unknown>(url: string, params?: any, config?: RequestConfig & { raw: true }): Promise<AxiosResponse<T>>;
  get<T = unknown>(url: string, params?: any, config?: RequestConfig & { raw?: false }): Promise<T>;
  get<T = unknown>(url: string, params?: any, config?: RequestConfig): Promise<T | AxiosResponse<T>> {
    const finalConfig = { ...(config ?? {}), url, params, method: 'GET' };
    if (config?.raw) {
      return this.request<T>({ ...finalConfig, raw: true } as RequestConfig & { raw: true });
    }
    return this.request<T>({ ...finalConfig, raw: false } as RequestConfig & { raw?: false });
  }

  /**
   * Restful: POST
   */
  post<T = unknown, D = unknown>(url: string, data: D | undefined, config: RequestConfig<D> & { raw: true }): Promise<AxiosResponse<T>>;
  post<T = unknown, D = unknown>(url: string, data?: D, config?: RequestConfig<D> & { raw?: false }): Promise<T>;
  post<T = unknown, D = unknown>(url: string, data?: D, config?: RequestConfig<D>): Promise<T | AxiosResponse<T>> {
    if (config?.raw) {
      return this.request<T, D>({ ...(config ?? {}), url, data, method: 'POST', raw: true } as RequestConfig<D> & { raw: true });
    }
    return this.request<T, D>({ ...(config ?? {}), url, data, method: 'POST' } as RequestConfig<D> & { raw?: false });
  }

  /**
   * Restful: PUT
   */
  put<T = unknown, D = unknown>(url: string, data: D | undefined, config: RequestConfig<D> & { raw: true }): Promise<AxiosResponse<T>>;
  put<T = unknown, D = unknown>(url: string, data?: D, config?: RequestConfig<D> & { raw?: false }): Promise<T>;
  put<T = unknown, D = unknown>(url: string, data?: D, config?: RequestConfig<D>): Promise<T | AxiosResponse<T>> {
    if (config?.raw) {
      return this.request<T, D>({ ...(config ?? {}), url, data, method: 'PUT', raw: true } as RequestConfig<D> & { raw: true });
    }
    return this.request<T, D>({ ...(config ?? {}), url, data, method: 'PUT' } as RequestConfig<D> & { raw?: false });
  }

  /**
   * Restful: DELETE
   *
   * 注意：部分后端会把“删除参数”放在 query（params）里，而不是 body（data）
   * - 如果你后端支持 body：可以在 config.data 里传
   * - 否则用 config.params
   */
  delete<T = unknown>(url: string, params?: any, config?: RequestConfig & { raw: true }): Promise<AxiosResponse<T>>;
  delete<T = unknown>(url: string, params?: any, config?: RequestConfig & { raw?: false }): Promise<T>;
  delete<T = unknown>(url: string, params?: any, config?: RequestConfig): Promise<T | AxiosResponse<T>> {
    const finalConfig = { ...(config ?? {}), url, params, method: 'DELETE' };
    if (config?.raw) {
      return this.request<T>({ ...finalConfig, raw: true } as RequestConfig & { raw: true });
    }
    return this.request<T>({ ...finalConfig, raw: false } as RequestConfig & { raw?: false });
  }
}
