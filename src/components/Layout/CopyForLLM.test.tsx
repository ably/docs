import React, { ReactNode } from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import CopyForLLM from './CopyForLLM';

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

jest.mock('src/contexts/layout-context', () => ({
  useLayoutContext: () => mockUseLayoutContext(),
}));

jest.mock('@reach/router', () => ({
  useLocation: () => ({ pathname: '/docs/test-page' }),
}));

jest.mock('src/components/Icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <span data-testid={`icon-${name}`}>{name}</span>,
}));

jest.mock('@ably/ui/core/insights', () => ({
  track: jest.fn(),
}));

// Mock Radix DropdownMenu to render content directly
jest.mock('@radix-ui/react-dropdown-menu', () => ({
  Root: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Trigger: ({ children }: { children: ReactNode; asChild?: boolean }) => <div>{children}</div>,
  Portal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Content: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Item: ({
    children,
    onSelect,
    ...props
  }: {
    children: ReactNode;
    onSelect?: (e: Event) => void;
    asChild?: boolean;
  }) =>
    props.asChild ? (
      <>{children}</>
    ) : (
      <div onClick={() => onSelect?.({ preventDefault: () => undefined } as unknown as Event)}>{children}</div>
    ),
  Separator: () => <hr />,
}));

describe('CopyForLLM', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
    jest.clearAllTimers();
  });

  it('renders the dropdown trigger button', () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 404 } as Response));

    render(<CopyForLLM />);
    expect(screen.getByText('Copy for LLM')).toBeInTheDocument();
  });

  it('renders LLM links for ChatGPT and Claude', () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 404 } as Response));

    render(<CopyForLLM />);
    expect(screen.getByText('Open in ChatGPT')).toBeInTheDocument();
    expect(screen.getByText('Open in Claude')).toBeInTheDocument();
  });

  it('shows markdown items when content is available', async () => {
    const mockMarkdown = '# Test content';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        headers: {
          get: (name: string) => (name === 'Content-Type' ? 'text/markdown' : null),
        },
        text: () => Promise.resolve(mockMarkdown),
      } as Response),
    );

    const mockWriteText = jest.fn();
    Object.assign(navigator, { clipboard: { writeText: mockWriteText } });

    render(<CopyForLLM />);

    // Wait for the markdown to be fetched and state to update (button becomes enabled)
    const copyButton = await screen.findByText('Copy for LLM');
    await waitFor(() => {
      expect(copyButton.closest('button')).not.toBeDisabled();
    });

    jest.useFakeTimers();

    // Click copy via the dropdown item
    const copyItem = screen.getByText('Copy as markdown').closest('div');
    if (copyItem) {
      act(() => {
        fireEvent.click(copyItem);
      });
    }

    expect(mockWriteText).toHaveBeenCalledWith(mockMarkdown);

    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('disables copy button when fetch fails', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 404 } as Response));

    render(<CopyForLLM />);

    await new Promise<void>((resolve) => setTimeout(resolve, 50));

    const copyButton = screen.getByText('Copy for LLM').closest('button');
    expect(copyButton).toBeDisabled();
  });
});
