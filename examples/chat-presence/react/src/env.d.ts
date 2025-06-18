/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ABLY_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
