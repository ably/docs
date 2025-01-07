import React from 'react';
import { useLocation } from '@reach/router';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { RightSidebar } from './RightSidebar';
import { useLayoutContext } from 'src/contexts/layout-context';

jest.mock('src/contexts/layout-context', () => ({
  useLayoutContext: jest.fn(),
}));

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
}));

jest.mock('./LanguageSelector', () => ({
  LanguageSelector: jest.fn(() => <div>LanguageSelector</div>),
}));

const mockUseLayoutContext = useLayoutContext as jest.Mock;
const mockUseLocation = useLocation as jest.Mock;

describe('RightSidebar', () => {
  beforeEach(() => {
    mockUseLayoutContext.mockReturnValue({
      activePage: {
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

  it('does not render the LanguageSelector component when activePage.languages is empty', () => {
    render(<RightSidebar />);
    expect(screen.queryByText('LanguageSelector')).not.toBeInTheDocument();
  });

  it('renders the LanguageSelector component when activePage.languages is not empty', () => {
    mockUseLayoutContext.mockReturnValue({
      activePage: {
        tree: [0],
        languages: ['javascript'],
      },
      products: [['pubsub']],
    });
    render(<RightSidebar />);
    expect(screen.getByText('LanguageSelector')).toBeInTheDocument();
  });

  it('renders headers from the article', () => {
    render(<RightSidebar />);
    expect(screen.getByRole('heading', { level: 2, name: 'Header 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Header 2' })).toBeInTheDocument();
  });

  it('renders external links', () => {
    render(<RightSidebar />);
    expect(screen.getByText('Edit on GitHub')).toBeInTheDocument();
    expect(screen.getByText('Request changes')).toBeInTheDocument();
  });

  it('sets active header on click', () => {
    render(<RightSidebar />);
    const headerLink = screen.getByRole('link', { name: 'Header 1' });
    fireEvent.click(headerLink);
    expect(headerLink).toHaveClass('font-bold');
  });
});
