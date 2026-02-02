/**
 * Types for user session and API key data
 * These match the structure returned by the Rails /api/me and /api/api_keys endpoints
 */

export type AppApiKey = {
  ui_compatible_capabilities: boolean;
  capability: Record<string, string[]>;
  revocableTokens: boolean;
  paas_linked: boolean;
  is_webhook: boolean;
  webhook_url: string;
  whole_key: string;
  created: string;
  name: string;
  id: string;
};

export type App = {
  name: string;
  url: string;
  apiKeys: AppApiKey[];
  demo: boolean;
};

export type SessionState = {
  signedIn?: boolean;
  accountName?: string;
  preferredEmail?: string;
  user?: {
    email: string;
    firstName: string;
    lastName: string;
    id: string;
    uuid: string;
  };
};

export type UserDetails = {
  sessionState: SessionState;
  apps: App[];
};

/**
 * Demo API key used when user is not logged in
 * This key has limited capabilities and is safe to expose
 */
export const DEMO_API_KEY = 'xVLyHw.DQrNxQ:dPYjIbbXU0VTfMg1BQi9YbGBdYoLOlIRJKJFWqRTeDg';

/**
 * Get API key from user data
 * Falls back to demo key when user is not logged in or has no apps
 */
export const getApiKey = (userData: UserDetails | null, demoOnly = false): string => {
  // In development, allow override via environment variable
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ABLY_KEY) {
    return process.env.NEXT_PUBLIC_ABLY_KEY;
  }

  if (!userData) {
    return DEMO_API_KEY;
  }

  const apps = userData.apps ?? [];
  const app = apps.find((a) => a.demo === demoOnly);
  return app?.apiKeys?.[0]?.whole_key ?? DEMO_API_KEY;
};

/**
 * Update Ably connection keys in Sandpack files
 * Replaces import.meta.env.VITE_ABLY_KEY placeholders with actual API keys
 */
export const updateAblyConnectionKey = (
  files: Record<string, string>,
  apiKey: string,
  additionalKeys?: Record<string, string>
): Record<string, string> => {
  const ablyEndpoint = process.env.NEXT_PUBLIC_ABLY_ENVIRONMENT ?? 'main';
  const names = Object.keys(files);

  return names.reduce(
    (acc, name: string) => {
      let content = files[name];

      // Endpoint - for non-production environments
      if (ablyEndpoint !== 'main') {
        content = content.replaceAll(/new Ably\.(Realtime|Rest)\(\{/g, (_match, type) => {
          return `new Ably.${type}({\n  endpoint: '${ablyEndpoint}',`;
        });

        content = content.replaceAll(/new (Realtime|Rest)\(\{/g, (_match, type) => {
          return `new ${type}({\n  endpoint: '${ablyEndpoint}',`;
        });
      }

      // API Key - replace placeholder with actual key
      content = content.replaceAll(/import\.meta\.env\.VITE_ABLY_KEY/g, `"${apiKey}"`);

      // Additional keys - for other environment variables
      if (additionalKeys) {
        Object.entries(additionalKeys).forEach(([key, value]) => {
          content = content.replaceAll(`import.meta.env.VITE_${key}`, `"${value}"`);
        });
      }

      acc[name] = content;
      return acc;
    },
    {} as Record<string, string>
  );
};
