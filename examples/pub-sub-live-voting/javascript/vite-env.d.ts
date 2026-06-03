interface ImportMetaEnv {
  // Hosted docs sandbox only — injected by the docs build. Unset in a clone.
  readonly VITE_ABLY_KEY: string;
  readonly VITE_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
