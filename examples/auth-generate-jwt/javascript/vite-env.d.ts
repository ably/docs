interface ImportMetaEnv {
  readonly VITE_ABLY_KEY: string;
  readonly VITE_AUTH_JWT_URL: string;
  // Add other environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
