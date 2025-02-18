import React from 'react';
import { useLocation } from '@reach/router';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LeftSidebar from './LeftSidebar';
import { useLayoutContext } from 'src/contexts/layout-context';
import { NavProduct } from 'src/data/nav/types';
import { ProductKey } from 'src/data/types';

jest.mock('src/contexts/layout-context', () => ({
  useLayoutContext: jest.fn(),
}));

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
}));

jest.mock('../Link', () => {
  const MockLink: React.FC<{ children: React.ReactNode; to: string }> = ({ children, to, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

const mockUseLayoutContext = useLayoutContext as jest.Mock;
const mockUseLocation = useLocation as jest.Mock;

const mockProducts: [ProductKey, NavProduct][] = [
  [
    'platform',
    {
      name: 'Platform',
      icon: { open: 'icon-gui-chevron-up-micro', closed: 'icon-gui-chevron-down-micro' },
      content: [
        {
          name: 'Overview',
          pages: [
            { name: 'Introduction', link: '/platform/intro' },
            { name: 'Getting Started', link: '/platform/getting-started' },
          ],
        },
      ],
      api: [
        {
          name: 'API Overview',
          pages: [
            { name: 'API Introduction', link: '/platform/api-intro' },
            { name: 'API Reference', link: '/platform/api-reference' },
          ],
        },
      ],
      link: '/platform',
      showJumpLink: true,
    },
  ],
  [
    'pubsub',
    {
      name: 'Pub/Sub',
      icon: { open: 'icon-gui-chevron-up-outline', closed: 'icon-gui-chevron-down-outline' },
      content: [
        {
          name: 'Overview',
          pages: [
            { name: 'Introduction', link: '/pubsub/intro' },
            { name: 'Getting Started', link: '/pubsub/getting-started' },
          ],
        },
      ],
      api: [],
      link: '/pubsub',
      showJumpLink: false,
    },
  ],
];

describe('LeftSidebar', () => {
  beforeEach(() => {
    mockUseLayoutContext.mockReturnValue({
      activePage: {
        tree: [
          { index: 0, page: { name: 'Link 1', link: '/link-1' } },
          { index: 1, page: { name: 'Link 2', link: '/link-2' } },
        ],
      },
      products: mockProducts,
    });

    mockUseLocation.mockReturnValue({
      pathname: '/platform/intro',
    });

    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;

    Element.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the sidebar with products', () => {
    render(<LeftSidebar />);
    expect(screen.getByRole('button', { name: 'Platform' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pub/Sub' })).toBeInTheDocument();
  });

  it('renders product content and API sections', () => {
    render(<LeftSidebar />);
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('API Overview')).toBeInTheDocument();
  });

  it('renders links for pages and API pages', () => {
    render(<LeftSidebar />);
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
    expect(screen.getByText('API Introduction')).toBeInTheDocument();
    expect(screen.getByText('API Reference')).toBeInTheDocument();
  });
});
