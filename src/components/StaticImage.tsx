import { graphql, useStaticQuery, withPrefix } from 'gatsby';
import { ComponentProps } from 'react';

export const StaticImage = ({ src, ...attribs }: ComponentProps<'img'>) => {
  const result = useStaticQuery(graphql`
    query AssetPrefixQuery {
      site {
        assetPrefix
      }
    }
  `);

  if (!src) {
    return;
  }

  const assetPrefix = result?.site.assetPrefix ?? '';
  const srcUrl = `${assetPrefix}${withPrefix(src)}`;

  return <img src={srcUrl} {...attribs} data-testid="static-image" />;
};
