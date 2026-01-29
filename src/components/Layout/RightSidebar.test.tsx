import React from 'react';
import { useLocation } from '@reach/router';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import RightSidebar from './RightSidebar';
import { useLayoutContext } from 'src/contexts/layout-context';

jest.mock('src/contexts/layout-context', () => ({
  useLayoutContext: jest.fn(),
}));

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
}));

const mockUseLayoutContext = useLayoutContext as jest.Mock;
const mockUseLocation = useLocation as jest.Mock;

describe('RightSidebar', () => {
  beforeEach(() => {
    mockUseLayoutContext.mockReturnValue({
      activePage: {
        page: {
          name: 'Test Page',
          link: '/test-path',
        },
        tree: [0],
        languages: [],
      },
      products: [['pubsub']],
    });

    mockUseLocation.mockReturnValue({
      pathname: '/test-path',
    });

    document.body.innerHTML = `
      <article>
        <h2 id="header1">Header 1</h2>
        <h3 id="header2">Header 2</h3>
      </article>
    `;

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
    cleanup();
    document.body.innerHTML = '';
  });

  it('renders headers from the article', () => {
    render(<RightSidebar />);
    expect(screen.getByRole('heading', { level: 2, name: 'Header 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Header 2' })).toBeInTheDocument();
  });

  it('renders sidebar links for article headers', () => {
    const { container } = render(<RightSidebar />);

    // Verify sidebar links are created with correct IDs
    const header1Link = container.querySelector('#sidebar-header1');
    const header2Link = container.querySelector('#sidebar-header2');

    expect(header1Link).toBeInTheDocument();
    expect(header2Link).toBeInTheDocument();
    expect(header1Link).toHaveAttribute('href', '#header1');
    expect(header2Link).toHaveAttribute('href', '#header2');
  });

  it('sets active header on click', async () => {
    render(<RightSidebar />);
    const headerLink = await screen.findByRole('link', { name: 'Header 1' });
    fireEvent.click(headerLink);
    expect(headerLink).toHaveClass('text-neutral-1300');
  });
});
