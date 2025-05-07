import { UserDetails } from 'src/contexts';

export const getApiKey = (userData: UserDetails) =>
  process.env.NODE_ENV === 'development' && process.env.GATSBY_VITE_ABLY_KEY
    ? process.env.GATSBY_VITE_ABLY_KEY
    : userData.apps?.[0]?.apiKeys?.[0]?.whole_key;

export const updateAblyConnectionKey = (
  files: Record<string, string>,
  apiKey: string,
  additionalKeys?: Record<string, string>,
) => {
  const ablyEnvironment = process.env.GATSBY_ABLY_ENVIRONMENT ?? 'production';
  const names = Object.keys(files);

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
