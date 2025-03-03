interface ImportMetaEnv {
  readonly VITE_PUBLIC_ABLY_KEY: string;
  // Add other environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
