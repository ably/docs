import React, { ReactElement } from 'react';
import Html from '../Html';
import { HtmlAttributes, HtmlComponentProps } from '../../html-component-props';

import './styles.css';
import Img from './Img';
import { filterAttribsForReact } from 'src/react-utilities';
import Link from 'src/components/Link';

const A = ({ data, attribs }: HtmlComponentProps<'a'>): ReactElement => {
  const { href: href, ...props } = attribs ?? {};

  // If there is an image inside the link with src same as href, then nuke <a> and render <img> only
  if (Array.isArray(data)) {
    const imageElement = data.find((item) => item.name === 'img');
    if (imageElement) {
      const attribs = imageElement.attribs as HtmlAttributes<'img'>;
      if (attribs?.src === href && imageElement?.data) {
        return <Img attribs={filterAttribsForReact(attribs)} data={imageElement?.data} />;
      }
    }
  }

  return (
    <Link className="docs-link" to={href} {...props}>
      <Html data={data} />
    </Link>
  );
};

export default A;
