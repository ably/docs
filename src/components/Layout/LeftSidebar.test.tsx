import React from 'react';
import { useLocation } from '@reach/router';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import LeftSidebar from './LeftSidebar';
import { useLayoutContext } from 'src/contexts/layout-context';

jest.mock('src/contexts/layout-context', () => ({
  useLayoutContext: jest.fn(),
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

describe('LeftSidebar', () => {
  beforeEach(() => {
    mockUseLayoutContext.mockReturnValue({
      activePage: {
        page: { name: 'Test Page', link: '/platform/intro' },
        tree: [{ index: 0, page: { name: 'Link 1', link: '/link-1' } }],
      },
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
    expect(screen.getByRole('button', { name: 'Ably Pub/Sub' })).toBeInTheDocument();
  });

  it('shows Platform accordion expanded with first three child items when active page is under Platform', async () => {
    render(<LeftSidebar />);

    // Since activePage.page.link is '/platform/intro', the Platform accordion should be open by default
    // Verify the labels of the first three child accordion items are visible
    await waitFor(() => {
      expect(screen.getByText('Introduction')).toBeInTheDocument();
      expect(screen.getByText('Architecture')).toBeInTheDocument();
      expect(screen.getByText('Products and SDKs')).toBeInTheDocument();
    });

    // Verify these are clickable accordion triggers
    const introButton = screen.getByText('Introduction').closest('button');
    const archButton = screen.getByText('Architecture').closest('button');
    const productsButton = screen.getByText('Products and SDKs').closest('button');

    expect(introButton).toBeInTheDocument();
    expect(archButton).toBeInTheDocument();
    expect(productsButton).toBeInTheDocument();
  });

  it('expands Platform/Architecture accordion and shows first three child items', async () => {
    const user = userEvent.setup();
    render(<LeftSidebar />);

    // Platform is already expanded since activePage is /platform/intro
    expect(screen.queryByText('Overview')).not.toBeInTheDocument();
    expect(screen.queryByText('Edge network')).not.toBeInTheDocument();
    expect(screen.queryByText('Infrastructure operations')).not.toBeInTheDocument();

    // Find and click Architecture button to expand it
    const architectureButton = screen.getByText('Architecture').closest('button');
    if (!architectureButton) {
      throw new Error('Architecture button not found');
    }
    await user.click(architectureButton);

    // After clicking, verify the first three child items are visible
    await waitFor(() => {
      expect(screen.getByText('Overview')).toBeInTheDocument();
      expect(screen.getByText('Edge network')).toBeInTheDocument();
      expect(screen.getByText('Infrastructure operations')).toBeInTheDocument();
    });

    // Verify these are links (leaf nodes) not accordion triggers
    const overviewLink = screen.getByText('Overview').closest('a');
    const edgeNetworkLink = screen.getByText('Edge network').closest('a');
    const infrastructureLink = screen.getByText('Infrastructure operations').closest('a');

    expect(overviewLink).toBeInTheDocument();
    expect(edgeNetworkLink).toBeInTheDocument();
    expect(infrastructureLink).toBeInTheDocument();
  });

  it('clicks Ably Pub/Sub to close Platform and expand Pub/Sub showing first three child items', async () => {
    const user = userEvent.setup();
    render(<LeftSidebar />);

    // Initially on Platform page, so Platform accordion is open
    expect(screen.getByText('Architecture')).toBeInTheDocument();

    // Pub/Sub children should not be visible
    expect(screen.queryByText('Authentication')).not.toBeInTheDocument();
    expect(screen.queryByText('Connections')).not.toBeInTheDocument();

    // Click on Ably Pub/Sub button to expand it (this should close Platform since type="single")
    const pubsubButton = screen.getByRole('button', { name: 'Ably Pub/Sub' });
    await user.click(pubsubButton);

    // After clicking, verify the first three Pub/Sub child accordion items appear
    await waitFor(() => {
      expect(screen.getByText('Introduction')).toBeInTheDocument();
      expect(screen.getByText('Authentication')).toBeInTheDocument();
      expect(screen.getByText('Connections')).toBeInTheDocument();
    });

    // Platform's Architecture should no longer be visible since accordion closed
    expect(screen.queryByText('Architecture')).not.toBeInTheDocument();
  });
});
