import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useLocation } from '@reach/router';
import ChangelogContent from './ChangelogContent';
import { ChangelogEntry } from './types';
import { ImageProps } from '../Image';

// Entries render as internal <Link>s (Gatsby/reach-router). Keep reach-router intact
// and stub useLocation so <Link> has a location to read during the test render.
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

const mockLocation = () =>
  (useLocation as jest.Mock).mockReturnValue({
    pathname: '/docs/changelog',
    search: '',
    hash: '',
    state: null,
    key: 'test',
  });

// 15 entries, all in June 2026.
const makeEntries = (): ChangelogEntry[] =>
  Array.from({ length: 15 }, (_, i) => ({
    link: `/docs/changelog/2026/06/entry-${i + 1}`,
    title: `Entry ${i + 1}`,
    description: `Description ${i + 1}`,
    date: `2026-06-${String(28 - i).padStart(2, '0')}`,
    products: ['pub-sub'],
  }));

// Decorative background SVGs the component looks up by name; stubbing them keeps
// getImageFromList from warning about missing images during the test.
const IMAGES = [
  { base: 'mobile-grid.svg', extension: 'svg', publicURL: '/mobile-grid.svg' },
  { base: 'pattern-grid.svg', extension: 'svg', publicURL: '/pattern-grid.svg' },
] as unknown as ImageProps[];

const renderContent = (entries: ChangelogEntry[]) => render(<ChangelogContent entries={entries} images={IMAGES} />);

// Each entry is rendered as a list item; counting them is the cleanest proxy for
// "how many entries are currently visible".
const visibleCount = () => screen.getAllByRole('listitem').length;

describe('ChangelogContent pagination', () => {
  beforeEach(() => {
    mockLocation();
  });

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
