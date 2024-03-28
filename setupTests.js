import '@testing-library/jest-dom';
import { server } from './mocks/server';

class ResizeObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}

window.ResizeObserver = ResizeObserver;

jest.mock('@ably/ui/src/core/utils/syntax-highlighter', () => ({
  highlightSnippet: jest.fn,
  registerDefaultLanguages: jest.fn,
}));

jest.mock('@ably/ui/src/core/utils/syntax-highlighter-registry', () => ({
  __esModule: true,
  default: [],
}));

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
