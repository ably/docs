import React, { ReactNode } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { PageHeader } from './PageHeader';

const mockUseLayoutContext = jest.fn(() => ({
  activePage: {
    language: 'javascript',
    languages: ['javascript'],
    product: 'pubsub',
    page: {
      name: 'Test Page',
      link: '/docs/test-page',
    },
    tree: [],
    template: 'mdx' as const,
  },
}));

// Mock the layout context
jest.mock('src/contexts/layout-context', () => ({
  useLayoutContext: () => mockUseLayoutContext(),
}));

// Mock useLocation from @reach/router
jest.mock('@reach/router', () => ({
  useLocation: () => ({ pathname: '/docs/test-page' }),
}));

// Mock Radix UI Tooltip to avoid act() warnings from async state updates
jest.mock('@radix-ui/react-tooltip', () => ({
  Provider: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Root: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Trigger: ({ children, asChild }: { children: ReactNode; asChild?: boolean }) =>
    asChild ? children : <div>{children}</div>,
  Portal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Content: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

// Mock Icon component
jest.mock('@ably/ui/core/Icon', () => {
  return {
    __esModule: true,
    default: ({ name, size }: { name: string; size: string }) => (
      <span data-testid={`icon-${name}`} style={{ width: size, height: size }}>
        {name}
      </span>
    ),
  };
});

// Mock track function
jest.mock('@ably/ui/core/insights', () => ({
  track: jest.fn(),
}));

// Mock LanguageSelector to avoid its complexity
jest.mock('../LanguageSelector', () => ({
  LanguageSelector: () => <div data-testid="language-selector">Language Selector</div>,
}));

describe('PageHeader Markdown buttons', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllTimers();
  });

  it('shows Markdown copy and view buttons when markdown content is available', async () => {
    const mockMarkdownContent = '# Mock markdown content\n\nThis is a test.';

    // Mock successful fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        headers: {
          get: (name: string) => (name === 'Content-Type' ? 'text/markdown' : null),
        },
        text: () => Promise.resolve(mockMarkdownContent),
      } as Response),
    );

    // Mock clipboard API
    const mockWriteText = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    });

    // Use fake timers to control the setTimeout in resetCopyTooltip
    jest.useFakeTimers();

    render(<PageHeader title="Test Page" intro="Test intro" />);

    // Wait for the fetch to complete and state to update
    await screen.findByText('Markdown');

    // Check that the Copy button is present
    const copyButton = screen.getByLabelText('Copy Markdown');
    expect(copyButton).toBeInTheDocument();

    // Check that the View link is present
    const viewLink = screen.getByRole('link', { name: /icon-gui-eye-outline/i });
    expect(viewLink).toBeInTheDocument();
    expect(viewLink).toHaveAttribute('href', '/docs/test-page.md');

    // Click the copy button and verify clipboard interaction
    act(() => {
      fireEvent.click(copyButton);
    });

    expect(mockWriteText).toHaveBeenCalledWith(mockMarkdownContent);
    expect(mockWriteText).toHaveBeenCalledTimes(1);

    // Clean up timers
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('does not show Markdown buttons when markdown content is null', async () => {
    // Suppress console.error for this test since we're testing a failure case
    const originalError = console.error;
    console.error = jest.fn();

    // Mock failed fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      } as Response),
    );

    render(<PageHeader title="Test Page" intro="Test intro" />);

    // Wait a bit for any async updates
    await new Promise<void>((resolve) => setTimeout(resolve, 100));

    // Check that the Markdown section is not present
    expect(screen.queryByText('Markdown')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Copy Markdown')).not.toBeInTheDocument();

    // Restore console.error
    console.error = originalError;
  });
});
