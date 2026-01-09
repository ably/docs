import React from 'react';
import { render, screen } from '@testing-library/react';
import Breadcrumbs from './Breadcrumbs';
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

describe('Breadcrumbs', () => {
  beforeEach(() => {
    mockUseLayoutContext.mockReturnValue({
      activePage: {
        tree: [
          { page: { name: 'Section 1', link: '/section-1' } },
          { page: { name: 'Subsection 1', link: '#' } },
          { page: { name: 'Current Page', link: '/section-1/subsection-1/page-1' } },
        ],
        page: { name: 'Current Page', link: '/section-1/subsection-1/page-1' },
        languages: [],
        language: 'javascript',
        product: null,
        template: null,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all breadcrumb nodes from activePage tree', () => {
    render(<Breadcrumbs />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Subsection 1')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
  });

  it('includes relevant links on the breadcrumb nodes', () => {
    render(<Breadcrumbs />);
    expect(screen.getByText('Home')).toHaveAttribute('href', '/docs');
    expect(screen.getByText('Section 1')).toHaveAttribute('href', '/section-1');
    expect(screen.getByText('Subsection 1')).toHaveAttribute('href', '#');
    expect(screen.getByText('Current Page')).toHaveAttribute('href', '/section-1/subsection-1/page-1');
  });

  it('disables the link for the current page and non-linked nodes', () => {
    render(<Breadcrumbs />);

    // Current page (last item) should be disabled
    expect(screen.getByText('Current Page')).toHaveClass('text-gui-unavailable');
    expect(screen.getByText('Current Page')).toHaveClass('pointer-events-none');

    // Non-linked nodes (link='#') should be disabled
    expect(screen.getByText('Subsection 1')).toHaveClass('text-gui-unavailable');
    expect(screen.getByText('Subsection 1')).toHaveClass('pointer-events-none');

    // Active links should not be disabled
    expect(screen.getByText('Section 1')).not.toHaveClass('text-gui-unavailable');
    expect(screen.getByText('Section 1')).not.toHaveClass('pointer-events-none');
  });

  it('shows only the last active node in mobile view', () => {
    render(<Breadcrumbs />);

    // All items except index 0 should have 'hidden sm:flex' classes
    expect(screen.getByText('Section 1')).not.toHaveClass('hidden');
    expect(screen.getByText('Subsection 1')).toHaveClass('hidden', 'sm:flex');
    expect(screen.getByText('Current Page')).toHaveClass('hidden', 'sm:flex');
  });

  it('correctly identifies last active node when current page is non-linked', () => {
    mockUseLayoutContext.mockReturnValue({
      activePage: {
        tree: [
          { page: { name: 'Section 1', link: '/section-1' } },
          { page: { name: 'Subsection 1', link: '/section-1/subsection-1' } },
          { page: { name: 'Current Page', link: '#' } },
        ],
        page: { name: 'Current Page', link: '#' },
        languages: [],
        language: 'javascript',
        product: null,
        template: null,
      },
    });

    render(<Breadcrumbs />);
    expect(screen.getByText('Section 1')).toHaveClass('hidden', 'sm:flex');
    expect(screen.getByText('Subsection 1')).not.toHaveClass('hidden');
    expect(screen.getByText('Current Page')).toHaveClass('hidden', 'sm:flex');
  });
});
