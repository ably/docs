import { ReactElement, ReactNode } from 'react';
import Zoom from 'react-medium-image-zoom';
import { StaticImage } from 'src/components/StaticImage';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { HtmlComponentProps } from '../../html-component-props';
import SelfClosingHtmlBlock from '../Html/SelfClosingHtmlBlock';
import { useContentImages } from 'src/contexts/content-images-context';

import 'react-medium-image-zoom/dist/styles.css';
import { classDialog } from './Img.module.css';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <Zoom wrapElement="span" zoomMargin={32} classDialog={classDialog}>
    {children}
  </Zoom>
);

const Img = ({ attribs }: Pick<HtmlComponentProps<'img'>, 'attribs'>): ReactElement => {
  const rawSrc = attribs?.src;
  const { findImage } = useContentImages();

  if (!rawSrc) {
    return <></>;
  }

  if (rawSrc.startsWith('@')) {
    const image = findImage(rawSrc);
    const { childImageSharp, publicURL } = image ?? {};

    if (!childImageSharp && publicURL) {
      return (
        <Wrapper>
          <img {...attribs} src={publicURL} />
        </Wrapper>
      );
    }

    if (image) {
      const imageData = getImage(image?.childImageSharp);
      const { alt, className } = attribs ?? {};
      const imageAttributes = { alt: alt ?? '', className };

      if (imageData) {
        return (
          <Wrapper>
            <GatsbyImage image={imageData} {...imageAttributes} />
          </Wrapper>
        );
      }
    }
  }

  return (
    <Wrapper>
      {rawSrc && /^\/images.*/.test(rawSrc) ? (
        <StaticImage src={rawSrc} {...{ ...attribs }} />
      ) : (
        SelfClosingHtmlBlock('img')({ attribs })
      )}
    </Wrapper>
  );
};

export default Img;
