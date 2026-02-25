interface ImportMetaEnv {
  readonly VITE_ABLY_KEY: string;
  readonly VITE_AUTH_TOKEN_URL: string;
  // Add other environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
