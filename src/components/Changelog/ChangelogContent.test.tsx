import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useLocation } from '@reach/router';
import ChangelogContent from './ChangelogContent';
import { ChangelogEntry } from './types';
import { ImageProps } from '../Image';

// ChangelogContent reads the shared `?product=` filter from the router and renders
// a client-paginated timeline; override only useLocation so each test controls the
// URL, keeping the rest of reach-router intact (Gatsby's <Link> relies on it).
jest.mock('@reach/router', () => ({
  ...jest.requireActual('@reach/router'),
  useLocation: jest.fn(),
}));

// The decorative background uses gatsby-plugin-image transitively via src/Image.
jest.mock('gatsby-plugin-image', () => ({
  GatsbyImage: jest.fn(() => null),
  StaticImage: jest.fn(() => null),
  getImage: jest.fn(),
}));

const mockLocation = (search = '') =>
  (useLocation as jest.Mock).mockReturnValue({
    pathname: '/docs/changelog',
    search,
    hash: '',
    state: null,
    key: 'test',
  });

// 12 chat entries + 3 spaces entries = 15 total, all in June 2026 (one month group).
const CHAT_COUNT = 12;
const SPACES_COUNT = 3;
const makeEntries = (): ChangelogEntry[] => [
  ...Array.from({ length: CHAT_COUNT }, (_, i) => ({
    link: `/docs/changelog/2026/06/chat-${i + 1}`,
    title: `Chat entry ${i + 1}`,
    description: `Chat description ${i + 1}`,
    // Newest first; dates 2026-06-28 down to 2026-06-17.
    date: `2026-06-${String(28 - i).padStart(2, '0')}`,
    products: ['chat'],
  })),
  ...Array.from({ length: SPACES_COUNT }, (_, i) => ({
    link: `/docs/changelog/2026/06/spaces-${i + 1}`,
    title: `Spaces entry ${i + 1}`,
    description: `Spaces description ${i + 1}`,
    date: `2026-06-0${i + 1}`,
    products: ['spaces'],
  })),
];

// Decorative background SVGs the component looks up by name; stubbing them keeps
// getImageFromList from warning about missing images during the test.
const IMAGES = [
  { base: 'mobile-grid.svg', extension: 'svg', publicURL: '/mobile-grid.svg' },
  { base: 'pattern-grid.svg', extension: 'svg', publicURL: '/pattern-grid.svg' },
] as unknown as ImageProps[];

const renderContent = (entries: ChangelogEntry[]) => render(<ChangelogContent entries={entries} images={IMAGES} />);

// Each entry card is rendered as a list item; counting them is the cleanest
// proxy for "how many entries are currently visible".
const visibleCount = () => screen.getAllByRole('listitem').length;

describe('ChangelogContent', () => {
  beforeEach(() => {
    mockLocation('');
  });

  describe('pagination', () => {
    it('caps the initial render at one page (10) and reports the total', () => {
      renderContent(makeEntries());

      expect(visibleCount()).toBe(10);
      expect(screen.getByText('Showing 10 of 15')).toBeInTheDocument();
      expect(screen.getByText('Show more')).toBeInTheDocument();
    });

    it('reveals another page on "Show more" and hides the button once exhausted', () => {
      renderContent(makeEntries());

      fireEvent.click(screen.getByText('Show more'));

      expect(visibleCount()).toBe(15);
      expect(screen.queryByText('Show more')).not.toBeInTheDocument();
    });

    it('does not paginate when there are fewer entries than a page', () => {
      renderContent(makeEntries().slice(0, 5));

      expect(visibleCount()).toBe(5);
      expect(screen.queryByText('Show more')).not.toBeInTheDocument();
    });
  });

  describe('product filter', () => {
    it('narrows the timeline to the selected product', () => {
      renderContent(makeEntries());

      fireEvent.click(screen.getByTestId('product-spaces'));

      expect(visibleCount()).toBe(SPACES_COUNT);
      expect(screen.getByText('Spaces entry 1')).toBeInTheDocument();
      expect(screen.queryByText('Chat entry 1')).not.toBeInTheDocument();
    });

    it('resets pagination to the first page when the filter changes', () => {
      renderContent(makeEntries());

      // Expand to show every entry...
      fireEvent.click(screen.getByText('Show more'));
      expect(visibleCount()).toBe(15);

      // ...then apply a filter whose result set still exceeds one page. The view
      // should collapse back to 10 rather than inherit the expanded count.
      fireEvent.click(screen.getByTestId('product-chat'));

      expect(visibleCount()).toBe(10);
      expect(screen.getByText('Showing 10 of 12')).toBeInTheDocument();
    });

    it('hydrates the filter from the ?product= query string on mount', () => {
      mockLocation('?product=spaces');

      renderContent(makeEntries());

      expect(visibleCount()).toBe(SPACES_COUNT);
      expect(screen.getByText('Spaces entry 1')).toBeInTheDocument();
      expect(screen.queryByText('Chat entry 1')).not.toBeInTheDocument();
    });

    it('ignores unknown product slugs in the query string', () => {
      mockLocation('?product=not-a-product');

      renderContent(makeEntries());

      // Unknown slug is dropped, so the filter is empty and all entries show.
      expect(visibleCount()).toBe(10);
      expect(screen.getByText('Showing 10 of 15')).toBeInTheDocument();
    });
  });
});
