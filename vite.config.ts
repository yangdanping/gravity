import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';
import pxtorem from 'postcss-pxtorem';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  /**
   * mode 的来源：
   * - `npm run dev`  => mode=development（默认）
   * - `npm run build`=> mode=production（默认）
   * - 也可以手动：`vite --mode production`
   *
   * Vite 会根据 mode 自动加载对应的环境文件：
   * - .env.development
   * - .env.production
   *
   * 并把以 VITE_ 开头的变量暴露到 import.meta.env
   */
  const env = loadEnv(mode, process.cwd());

  // 约定：VITE_BASE_URL 只写路径前缀（/api 或 /dev-api）
  const baseUrlPrefix = env.VITE_BASE_URL || '/dev-api';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    /**
     * 开发环境跨域：把“前端请求的路径前缀”转发到真实后端地址
     *
     * 说明：
     * - 生产环境（vite build）不会走这里；生产跨域通常由 Nginx/网关处理
     * - 这里同时配置 /api 与 /dev-api，方便你通过 mode 或 env 切换
     */
    server: {
      proxy: {
        // 生产（或联调）后端
        '/api': {
          target: 'http://8.138.223.188:9000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        // 本地后端
        '/dev-api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, ''),
        },
      },
    },

    /**
     * 可选：给应用层提供"当前 base url 前缀"常量（调试时可能有用）
     * 也可以只用 import.meta.env.VITE_BASE_URL，不用这个 define
     */
    define: {
      __VITE_BASE_URL__: JSON.stringify(baseUrlPrefix),
    },

    /**
     * PostCSS 插件配置
     * postcss-pxtorem: 自动将 px 转换为 rem，配合根字体 clamp() 实现响应式
     */
    css: {
      postcss: {
        plugins: [
          pxtorem({
            rootValue: 16, // 基准值：1rem = 16px
            propList: ['*'], // 转换所有属性（font-size, padding, margin 等）
            selectorBlackList: ['.norem'], // 忽略 .norem 类名的元素
            minPixelValue: 2, // 小于 2px 不转换（避免 1px 边框等被转换）
          }),
        ],
      },
    },
  };
});
