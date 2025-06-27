import React from 'react';
import { useStaticQuery } from 'gatsby';
import { useLocation, WindowLocation } from '@reach/router';
import { render } from '@testing-library/react';
import { Anchor } from 'src/components/Markdown/MarkdownProvider';

// Mock the hooks
jest.mock('gatsby', () => ({
  useStaticQuery: jest.fn(),
  graphql: jest.fn((query) => query),
}));

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
}));

jest.mock('src/components/Link', () => {
  return function MockLink({ to, children, ...props }: any) {
    const isExternal = to?.startsWith('http') || to?.startsWith('//');
    const testId = isExternal ? 'link-external' : 'link-internal';

    return (
      <a href={to} data-testid={testId} {...props}>
        {children}
      </a>
    );
  };
});

const mockUseStaticQuery = useStaticQuery as jest.MockedFunction<typeof useStaticQuery>;
const mockUseLocation = useLocation as jest.MockedFunction<typeof useLocation>;

describe('<Anchor/>', () => {
  beforeEach(() => {
    mockUseLocation.mockReturnValue({
      search: '',
    } as WindowLocation);

    mockUseStaticQuery.mockReturnValue({
      site: {
        assetPrefix: undefined,
      },
    });
  });

  describe('with assetPrefix', () => {
    beforeEach(() => {
      mockUseStaticQuery.mockReturnValue({
        site: {
          assetPrefix: 'http://example.com',
        },
      });
    });

    it('fixes broken assetPrefix links from MDX', () => {
      const { getByTestId } = render(<Anchor href="http:/example.com/docs/channels">Example docs</Anchor>);
      const a = getByTestId('link-internal');

      expect(a).toHaveAttribute('href', '/docs/channels');
    });

    it('preserves absolute links', () => {
      const { getByTestId } = render(<Anchor href="http://example.org/">Example.org</Anchor>);
      const a = getByTestId('link-external');

      expect(a).toHaveAttribute('href', 'http://example.org/');
    });
  });

  describe('without assetPrefix', () => {
    it('does nothing to the links from MDX', () => {
      const { getByTestId } = render(<Anchor href="/docs/channels">Example docs</Anchor>);
      const a = getByTestId('link-internal');

      expect(a).toHaveAttribute('href', '/docs/channels');
    });
  });

  describe('with lang parameter', () => {
    beforeEach(() => {
      mockUseLocation.mockReturnValue({
        search: '?lang=javascript',
      } as WindowLocation);
    });

    it('adds lang parameter to internal links', () => {
      const { getByTestId } = render(<Anchor href="/docs/channels">Example docs</Anchor>);
      const a = getByTestId('link-internal');

      expect(a).toHaveAttribute('href', '/docs/channels?lang=javascript');
    });

    it('does not add lang parameter to fragment links', () => {
      const { getByTestId } = render(<Anchor href="#">Fragment link</Anchor>);
      const a = getByTestId('link-internal');

      expect(a).toHaveAttribute('href', '#');
    });
  });
});
