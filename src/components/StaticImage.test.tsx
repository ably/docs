import React from 'react';
import { useStaticQuery } from 'gatsby';
import { render } from '@testing-library/react';
import { StaticImage } from 'src/components/StaticImage';

describe('<StaticImage/>', () => {
  describe('with assetPrefix', () => {
    beforeEach(() => {
      useStaticQuery.mockReturnValue({
        site: {
          assetPrefix: 'http://example.com',
        },
      });
    });

    it('prepends the asset prefix to the img src', () => {
      const { getByTestId } = render(<StaticImage src={'/images/example.png'} />);
      const img = getByTestId('static-image');

      expect(img).toHaveAttribute('src', 'http://example.com/images/example.png');
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

    it('does nothing to the img src', () => {
      const { getByTestId } = render(<StaticImage src="/images/example.png" />);
      const img = getByTestId('static-image');

      expect(img).toHaveAttribute('src', '/images/example.png');
    });
  });
});
