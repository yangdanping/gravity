import type { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
/**
 * 单次请求额外配置（在 AxiosRequestConfig 基础上扩展）
 */
export type RequestConfig<D = unknown> = AxiosRequestConfig<D> & {
  /**
   * 是否返回“完整响应对象”
   *
   * - false（默认）：只返回后端数据 data（最常用）
   * - true：返回 AxiosResponse<T>，用于你需要 headers/status 等信息的场景（比如下载、分页从 header 取字段等）
   */
  raw?: boolean;

  /**
   * 单次请求的轻量“钩子”（可选）
   * - request：发起请求前最后一次加工 config（例如：追加某个 header）
   * - response：拿到 data 后再加工（例如：把后端结构映射成前端更好用的结构）
   *
   * 说明：当 raw=true 时，response 钩子不执行（因为此时返回的是 AxiosResponse）
   */
  interceptors?: {
    request?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
    response?: <T>(data: T) => T | Promise<T>;
  };
};

/**
 * 全局/实例级拦截器（用于创建不同实例时复用）
 */
export type RequestInterceptors = {
  request?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  requestError?: (error: unknown) => unknown;
  response?: <T>(response: AxiosResponse<T>) => AxiosResponse<T> | Promise<AxiosResponse<T>>;
  responseError?: (error: unknown) => unknown;
};

export type RequestOptions = {
  baseURL: string;
  timeout: number;
  interceptors?: RequestInterceptors;
  paramsSerializer?: AxiosRequestConfig['paramsSerializer'];
};
