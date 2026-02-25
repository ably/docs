/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ABLY_KEY: string;
  readonly VITE_AUTH_TOKEN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
