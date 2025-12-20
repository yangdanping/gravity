import { BASE_URL, TIMEOUT } from './config';
import { Request } from '../index';

/**
 * 项目默认的请求实例
 *
 * 用法示例：
 *   import request from '@/services/request'  // 如果你未来加了 alias '@'
 *   // 当前项目没有配置 alias 时，用相对路径：
 *   // import request from './services/request'
 *
 *   // GET
 *   const list = await request.get<ListItem[]>('/home/highscore', { params: { page: 1 } });
 *
 *   // POST
 *   const res = await request.post<{ ok: boolean }, { name: string }>('/user', { name: 'Tom' });
 */
const request = new Request({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  paramsSerializer: (params) => {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      const value = params[key];
      // 过滤掉 null 和 undefined
      if (value !== null && value !== undefined) {
        /**
         * 关键逻辑：对象/数组转 JSON 字符串
         * 这样 GET 请求传数组时，后端收到的是 ids=[1,2,3] 这种 JSON 字符串格式
         * 如果不加这个，axios 默认会转成 ids[]=1&ids[]=2 这种格式
         */
        searchParams.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
      }
    }
    return searchParams.toString();
  },
});

export default request;
// export * from '../request';
// export * from './config';
