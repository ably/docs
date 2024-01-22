import React from 'react';
import { useStaticQuery } from 'gatsby';
import { render } from '@testing-library/react';
import { Anchor } from 'src/components/Markdown/MarkdownProvider';

describe('<Anchor/>', () => {
  describe('with assetPrefix', () => {
    beforeEach(() => {
      useStaticQuery.mockReturnValue({
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
    beforeEach(() => {
      useStaticQuery.mockReturnValue({
        site: {
          assetPrefix: undefined,
        },
      });
    });

    it('does nothing to the links from MDX', () => {
      const { getByTestId } = render(<Anchor href="/docs/channels">Example docs</Anchor>);
      const a = getByTestId('link-internal');

      expect(a).toHaveAttribute('href', '/docs/channels');
    });
  });
});
