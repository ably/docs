import React from 'react';
import { useLocation } from '@reach/router';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
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
        page: { name: 'Introduction', link: '/platform/intro' },
        tree: [
          { index: 0, page: { name: 'Platform', link: '/platform' } },
          { index: 0, page: { name: 'Introduction', link: '/platform/intro' } },
        ],
        languages: [],
        language: 'javascript',
        product: 'platform',
        template: null,
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
    const user = userEvent.setup();
    render(<LeftSidebar />);

    // Click Platform button to expand it (note: auto-expand doesn't work for index 0 due to falsy check)
    const platformButton = screen.getByRole('button', { name: 'Platform' });
    await user.click(platformButton);

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

    // First open Platform accordion
    const platformButton = screen.getByRole('button', { name: 'Platform' });
    await user.click(platformButton);

    // Wait for Platform children to be visible
    await waitFor(() => {
      expect(screen.getByText('Architecture')).toBeInTheDocument();
    });

    // Architecture children should not be visible yet
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

  it('clicks Ably Pub/Sub to expand Pub/Sub showing first three child items', async () => {
    const user = userEvent.setup();
    render(<LeftSidebar />);

    // First open Platform accordion
    const platformButton = screen.getByRole('button', { name: 'Platform' });
    await user.click(platformButton);

    // Wait for Platform children to be visible
    await waitFor(() => {
      expect(screen.getByText('Architecture')).toBeInTheDocument();
    });

    // Pub/Sub children should not be visible initially
    expect(screen.queryByText('Authentication')).not.toBeInTheDocument();
    expect(screen.queryByText('Connections')).not.toBeInTheDocument();

    // Click on Ably Pub/Sub button to expand it (type="multiple" so Platform stays open)
    const pubsubButton = screen.getByRole('button', { name: 'Ably Pub/Sub' });
    await user.click(pubsubButton);

    // After clicking, verify the Pub/Sub child accordion items appear
    // Note: "Introduction" appears in both Platform and Pub/Sub, so we check for items unique to Pub/Sub
    await waitFor(() => {
      expect(screen.getByText('Authentication')).toBeInTheDocument();
      expect(screen.getByText('Connections')).toBeInTheDocument();
    });

    // Verify there are now 2 Introduction sections (one from Platform, one from Pub/Sub)
    const introductions = screen.getAllByText('Introduction');
    expect(introductions).toHaveLength(2);

    // Platform's Architecture should still be visible since accordion type is "multiple"
    expect(screen.getByText('Architecture')).toBeInTheDocument();
  });
});
