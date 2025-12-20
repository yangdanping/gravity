/**
 * axios 封装的基础配置
 *
 * 这里的 BASE_URL 不是“真实域名”，而是你在前端请求里使用的“路径前缀”：
 * - 开发环境：通常写成 `/dev-api`，配合 Vite dev server 的 proxy 转发到 `http://localhost:9000`
 * - 生产环境：通常写成 `/api`，上线后由 Nginx/网关转发到真实后端
 *
 * 你目前的约定：
 * - `/api`      -> http://8.138.223.188:9000
 * - `/dev-api`  -> http://localhost:9000
 */

// Vite 只会把以 VITE_ 开头的环境变量注入到 import.meta.env
export const BASE_URL = import.meta.env.VITE_BASE_URL ?? '';

// 请求超时时间（毫秒）
export const TIMEOUT = 10_000;
