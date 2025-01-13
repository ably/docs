import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Breadcrumbs from './Breadcrumbs';
import { useLayoutContext } from 'src/contexts/layout-context';

jest.mock('src/contexts/layout-context', () => ({
  useLayoutContext: jest.fn(),
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
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders relevant breadcrumb nodes', () => {
    render(<Breadcrumbs />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.queryByText('Subsection 1')).not.toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
  });

  it('includes relevant links on the breadcrumb nodes', () => {
    render(<Breadcrumbs />);
    expect(screen.getByText('Home')).toHaveAttribute('href', '/');
    expect(screen.getByText('Section 1')).toHaveAttribute('href', '/section-1');
    expect(screen.queryByText('Subsection 1')).not.toBeInTheDocument();
    expect(screen.getByText('Current Page')).toHaveAttribute('href', '/section-1/subsection-1/page-1');
  });

  it('disables the link for the current page', () => {
    render(<Breadcrumbs />);
    expect(screen.getByText('Current Page')).toHaveClass('text-gui-unavailable');
    expect(screen.getByText('Current Page')).toHaveClass('pointer-events-none');
  });
});
