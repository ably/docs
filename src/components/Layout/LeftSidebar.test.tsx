import React from 'react';
import { useLocation } from '@reach/router';
import { render, screen } from '@testing-library/react';
import LeftSidebar from './LeftSidebar';
import { useLayoutContext } from 'src/contexts/layout-context';

jest.mock('src/contexts/layout-context', () => ({
  useLayoutContext: jest.fn().mockReturnValue({
    activePage: {
      tree: [],
      page: { name: '', link: '' },
      languages: [],
      language: 'javascript',
      product: null,
      template: null,
    },
  }),
}));

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
}));

jest.mock('gatsby', () => ({
  ...jest.requireActual('gatsby'),
  useStaticQuery: jest.fn().mockReturnValue({
    site: {
      siteMetadata: {
        externalScriptsData: {
          inkeepSearchEnabled: true,
        },
      },
    },
  }),
  graphql: jest.fn(),
}));

jest.mock('../Link', () => {
  const { forwardRef } = require('react');
  const MockLink = forwardRef(({ children, to, ...props }: { children: React.ReactNode; to: string }, ref: React.Ref<HTMLAnchorElement>) => (
    <a href={to} ref={ref} {...props}>
      {children}
    </a>
  ));
  MockLink.displayName = 'MockLink';
  return MockLink;
});

const mockUseLayoutContext = useLayoutContext as jest.Mock;
const mockUseLocation = useLocation as jest.Mock;

describe('LeftSidebar', () => {
  beforeEach(() => {
    mockUseLayoutContext.mockReturnValue({
      activePage: {
        page: { name: 'About Ably', link: '/docs/platform' },
        tree: [
          { index: 0, page: { name: 'Platform', link: '/platform' } },
          { index: 0, page: { name: 'About Ably', link: '/docs/platform' } },
        ],
        languages: [],
        language: 'javascript',
        product: 'platform',
        template: null,
      },
    });

    mockUseLocation.mockReturnValue({
      pathname: '/docs/platform',
      search: '',
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

  it('renders nav content for the active product only', () => {
    render(<LeftSidebar />);
    // Platform nav sections should be present
    expect(screen.getByText('About Ably')).toBeInTheDocument();
    expect(screen.getByText('Architecture')).toBeInTheDocument();

    // Other products should NOT appear
    expect(screen.queryByText('Ably Pub/Sub')).not.toBeInTheDocument();
    expect(screen.queryByText('Ably Chat')).not.toBeInTheDocument();
  });

  it('shows placeholder when no product is active', () => {
    mockUseLayoutContext.mockReturnValue({
      activePage: {
        page: { name: '', link: '' },
        tree: [],
        languages: [],
        language: 'javascript',
        product: null,
        template: null,
      },
    });

    render(<LeftSidebar />);
    expect(screen.getByText('Select a product above to browse documentation.')).toBeInTheDocument();
  });

  it('renders top-level sections as static headings', () => {
    render(<LeftSidebar />);
    // Top-level sections render as plain headings, not accordion triggers
    const aboutHeading = screen.getByText('About Ably');
    expect(aboutHeading).toBeInTheDocument();
    // Should not be inside an accordion trigger button
    expect(aboutHeading.closest('button')).toBeNull();
  });
});
