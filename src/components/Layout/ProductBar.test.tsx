import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductBar from './ProductBar';
import { useLayoutContext } from 'src/contexts/layout-context';

jest.mock('src/contexts/layout-context', () => ({
  useLayoutContext: jest.fn(),
}));

jest.mock('src/components/Icon', () => {
  const MockIcon: React.FC<{ name: string }> = ({ name }) => <div data-testid={`icon-${name}`} />;
  MockIcon.displayName = 'MockIcon';
  return MockIcon;
});

jest.mock('../Link', () => {
  const MockLink: React.FC<{ to: string; children: React.ReactNode; className?: string }> = ({
    to,
    children,
    className,
  }) => (
    <a href={to} className={className}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

const mockUseLayoutContext = useLayoutContext as jest.Mock;

describe('ProductBar', () => {
  beforeEach(() => {
    mockUseLayoutContext.mockReturnValue({
      activePage: {
        product: 'pubsub',
        page: { name: '', link: '' },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a tab for each non-platform product', () => {
    render(<ProductBar />);

    expect(screen.getByText('Pub/Sub')).toBeInTheDocument();
    expect(screen.getByText('Chat')).toBeInTheDocument();
    expect(screen.getByText('AI Transport')).toBeInTheDocument();
    expect(screen.getByText('Spaces')).toBeInTheDocument();
    expect(screen.getByText('LiveObjects')).toBeInTheDocument();
    expect(screen.getByText('LiveSync')).toBeInTheDocument();
  });

  it('does not render a Platform tab', () => {
    render(<ProductBar />);
    expect(screen.queryByText('Platform')).not.toBeInTheDocument();
  });

  it('links each tab to its product nav link', () => {
    render(<ProductBar />);

    expect(screen.getByText('Pub/Sub').closest('a')).toHaveAttribute('href', '/docs/basics');
    expect(screen.getByText('Chat').closest('a')).toHaveAttribute('href', '/docs/chat');
    expect(screen.getByText('AI Transport').closest('a')).toHaveAttribute('href', '/docs/ai-transport');
  });

  it('applies the active class to the tab for the active product', () => {
    mockUseLayoutContext.mockReturnValue({
      activePage: {
        product: 'chat',
        page: { name: '', link: '' },
      },
    });

    render(<ProductBar />);

    expect(screen.getByText('Chat').closest('a')).toHaveClass('bg-orange-100');
    expect(screen.getByText('Pub/Sub').closest('a')).not.toHaveClass('bg-orange-100');
  });

  it('uses the open icon for the active tab and the closed icon for the others', () => {
    mockUseLayoutContext.mockReturnValue({
      activePage: {
        product: 'pubsub',
        page: { name: '', link: '' },
      },
    });

    render(<ProductBar />);

    expect(screen.getByTestId('icon-icon-gui-prod-pubsub-solid')).toBeInTheDocument();
    expect(screen.getByTestId('icon-icon-gui-prod-chat-outline')).toBeInTheDocument();
  });
});
