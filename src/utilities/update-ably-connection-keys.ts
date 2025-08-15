import { UserDetails } from 'src/contexts';

export const getApiKey = (userData: UserDetails, demoOnly = false) => {
  if (process.env.NODE_ENV === 'development' && process.env.GATSBY_VITE_ABLY_KEY) {
    return process.env.GATSBY_VITE_ABLY_KEY;
  }

  const apps = userData.apps ?? [];
  const app = apps.find((a) => a.demo === demoOnly);
  return app?.apiKeys?.[0]?.whole_key;
};

/**
 * Redacts an API key by showing only the part before the first colon, followed by asterisks
 */
export const redactApiKey = (apiKey: string): string => {
  if (!apiKey) {
    return apiKey;
  }

  const colonIndex = apiKey.indexOf(':');
  if (colonIndex === -1) {
    // If no colon found, show first 4 characters followed by asterisks
    return apiKey.substring(0, 4) + '*****';
  }

  return apiKey.substring(0, colonIndex + 1) + '*****';
};

export const updateAblyConnectionKey = (
  files: Record<string, string>,
  apiKey: string,
  additionalKeys?: Record<string, string>,
) => {
  const ablyEnvironment = process.env.GATSBY_ABLY_ENVIRONMENT ?? 'production';
  const names = Object.keys(files);
  const redactedApiKey = redactApiKey(apiKey);

  return names.reduce(
    (acc, name: string) => {
      let content = files[name];

      // Environment
      if (ablyEnvironment !== 'production') {
        content = content.replaceAll(/new Ably\.(Realtime|Rest)\(\{/g, (_match, type) => {
          return `new Ably.${type}({\n  environment: '${ablyEnvironment}',`;
        });

        content = content.replaceAll(/new (Realtime|Rest)\(\{/g, (_match, type) => {
          return `new ${type}({\n  environment: '${ablyEnvironment}',`;
        });
      }

      // API Key - use redacted version
      content = content.replaceAll(/import\.meta\.env\.VITE_ABLY_KEY/g, `"${redactedApiKey}"`);

      // Additional keys - also redact these if they look like API keys
      if (additionalKeys) {
        Object.entries(additionalKeys).forEach(([key, value]) => {
          const redactedValue = redactApiKey(value);
          content = content.replaceAll(`import.meta.env.VITE_${key}`, `"${redactedValue}"`);
        });
      }

      acc[name] = content;
      return acc;
    },
    {} as Record<string, string>,
  );
};
