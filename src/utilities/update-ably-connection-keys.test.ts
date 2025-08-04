import { getApiKey } from './update-ably-connection-keys';
import type { AppApiKey, UserDetails } from 'src/contexts';

// Mock environment variables
const originalEnv = process.env;

// Test fixtures
const createMockAppApiKey = (whole_key: string): AppApiKey => ({
  whole_key,
  ui_compatible_capabilities: true,
  capability: {},
  revocableTokens: true,
  paas_linked: false,
  is_webhook: false,
  webhook_url: '',
  created: '2023-01-01',
  name: 'Test Key',
  id: 'test-id',
});

const createUserDataWithBothApps = (): UserDetails => ({
  sessionState: {},
  apps: [
    {
      name: 'Demo App',
      url: 'https://demo.example.com',
      apiKeys: [createMockAppApiKey('demo-key-456')],
      demo: true,
    },
    {
      name: 'Real App',
      url: 'https://real.example.com',
      apiKeys: [createMockAppApiKey('real-key-789')],
      demo: false,
    },
  ],
});

const createUserDataWithOnlyRealApp = (): UserDetails => ({
  sessionState: {},
  apps: [
    {
      name: 'Real App',
      url: 'https://real.example.com',
      apiKeys: [createMockAppApiKey('real-key-789')],
      demo: false,
    },
  ],
});

const createUserDataWithEmptyApiKeys = (): UserDetails => ({
  sessionState: {},
  apps: [
    {
      name: 'Demo App',
      url: 'https://demo.example.com',
      apiKeys: [],
      demo: true,
    },
  ],
});

const createUserDataWithMultipleApiKeys = (): UserDetails => ({
  sessionState: {},
  apps: [
    {
      name: 'Demo App',
      url: 'https://demo.example.com',
      apiKeys: [createMockAppApiKey('demo-key-1'), createMockAppApiKey('demo-key-2')],
      demo: true,
    },
  ],
});

describe('getApiKey', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('development environment with GATSBY_VITE_ABLY_KEY', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
      process.env.GATSBY_VITE_ABLY_KEY = 'dev-key-123';
    });

    it('returns the development key regardless of demoOnly parameter', () => {
      const userData = createUserDataWithBothApps();

      expect(getApiKey(userData, true)).toBe('dev-key-123');
      expect(getApiKey(userData, false)).toBe('dev-key-123');
    });
  });

  describe('production environment', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production';
      delete process.env.GATSBY_VITE_ABLY_KEY;
    });

    it('returns demo key when demoOnly is true', () => {
      const userData = createUserDataWithBothApps();

      expect(getApiKey(userData, true)).toBe('demo-key-456');
    });

    it('returns real key when demoOnly is false', () => {
      const userData = createUserDataWithBothApps();

      expect(getApiKey(userData, false)).toBe('real-key-789');
    });

    it('returns undefined when no matching app is found', () => {
      const userData = createUserDataWithOnlyRealApp();

      expect(getApiKey(userData, true)).toBeUndefined();
    });

    it('returns undefined when app has no apiKeys', () => {
      const userData = createUserDataWithEmptyApiKeys();

      expect(getApiKey(userData, true)).toBeUndefined();
    });

    it('returns undefined when userData has no apps', () => {
      const userData: UserDetails = {
        sessionState: {},
        apps: [],
      };

      expect(getApiKey(userData, true)).toBeUndefined();
      expect(getApiKey(userData, false)).toBeUndefined();
    });

    it('returns undefined when userData.apps is undefined', () => {
      const userData: UserDetails = {
        sessionState: {},
        apps: [],
      };

      expect(getApiKey(userData, true)).toBeUndefined();
      expect(getApiKey(userData, false)).toBeUndefined();
    });

    it('returns the first apiKey when multiple are present', () => {
      const userData = createUserDataWithMultipleApiKeys();

      expect(getApiKey(userData, true)).toBe('demo-key-1');
    });
  });
});
