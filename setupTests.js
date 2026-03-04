import '@testing-library/jest-dom';
import { server } from './mocks/server';

class ResizeObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}

window.ResizeObserver = ResizeObserver;

jest.mock('@ably/ui/core/utils/syntax-highlighter', () => ({
  highlightSnippet: jest.fn,
  LINE_HIGHLIGHT_CLASSES: {
    addition: 'code-line-addition',
    removal: 'code-line-removal',
    highlight: 'code-line-highlight',
  },
  parseLineHighlights: (lang) => ({ lang, highlights: {} }),
  registerDefaultLanguages: jest.fn,
  splitHtmlLines: (html) => html.split('\n'),
}));

jest.mock('@ably/ui/core/Code', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('@ably/ui/core/utils/syntax-highlighter-registry', () => ({
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
