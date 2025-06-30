import React, { ReactElement } from 'react';
import { useLocation } from '@reach/router';
import Html from '../Html';
import { HtmlAttributes, HtmlComponentProps } from '../../html-component-props';
import Img from './Img';
import { filterAttribsForReact } from 'src/react-utilities';
import Link from 'src/components/Link';

const A = ({ data, attribs }: HtmlComponentProps<'a'>): ReactElement => {
  const { href, ...props } = attribs ?? {};
  const location = useLocation();

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

  const urlParams = new URLSearchParams(location.search);
  const langParam = urlParams.get('lang');

  let cleanHref = href;
  if (langParam && cleanHref && !cleanHref.startsWith('#')) {
    const url = new URL(cleanHref, 'https://ably.com');
    url.searchParams.set('lang', langParam);
    cleanHref = url.pathname + url.search;
  }

  return (
    <Link className="ui-link" to={cleanHref ?? '#'} {...props}>
      <Html data={data} />
    </Link>
  );
};

export default A;
