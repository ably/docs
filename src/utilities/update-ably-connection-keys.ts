import { UserDetails } from 'src/contexts';

export const getApiKey = (userData: UserDetails, demoOnly = false) => {
  if (process.env.NODE_ENV === 'development' && process.env.GATSBY_VITE_ABLY_KEY) {
    return process.env.GATSBY_VITE_ABLY_KEY;
  }

  const apps = userData.apps ?? [];
  const app = apps.find((a) => a.demo === demoOnly);
  return app?.apiKeys?.[0]?.whole_key;
};

export const updateAblyConnectionKey = (
  files: Record<string, string>,
  apiKey: string,
  additionalKeys?: Record<string, string>,
) => {
  const ablyEndpoint = process.env.GATSBY_ABLY_ENVIRONMENT ?? 'main';
  const names = Object.keys(files);

  return names.reduce(
    (acc, name: string) => {
      let content = files[name];

      // Endpoint
      if (ablyEndpoint !== 'main') {
        content = content.replaceAll(/new Ably\.(Realtime|Rest)\(\{/g, (_match, type) => {
          return `new Ably.${type}({\n  endpoint: '${ablyEndpoint}',`;
        });

        content = content.replaceAll(/new (Realtime|Rest)\(\{/g, (_match, type) => {
          return `new ${type}({\n  endpoint: '${ablyEndpoint}',`;
        });
      }

      // API Key
      content = content.replaceAll(/import\.meta\.env\.VITE_ABLY_KEY/g, `"${apiKey}"`);

      // Additional keys
      if (additionalKeys) {
        Object.entries(additionalKeys).forEach(([key, value]) => {
          content = content.replaceAll(`import.meta.env.VITE_${key}`, `"${value}"`);
        });
      }

      acc[name] = content;
      return acc;
    },
    {} as Record<string, string>,
  );
};
