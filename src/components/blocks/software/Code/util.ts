import type { App, AppApiKey } from 'src/contexts';

const atLeastOneAppHasApiKeys = (apps: App[] = []) => apps.some((app) => app.apiKeys.length > 0);
const findFirstApiKey = (apps: App[] = []): AppApiKey | undefined =>
  apps.find((app) => app.apiKeys.length > 0)?.apiKeys[0];

export { atLeastOneAppHasApiKeys, findFirstApiKey };
