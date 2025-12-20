/// <reference types="vite/client" />

/**
 * 给 import.meta.env 增加项目自定义的环境变量类型
 *
 * 说明：
 * - 只有以 VITE_ 开头的变量才会被 Vite 暴露到 import.meta.env
 * - 这里声明后，TS strict 模式下引用 import.meta.env.VITE_BASE_URL 才不会报错
 */
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


