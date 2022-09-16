import React, { FC } from 'react';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';
import '@ably/ui/core/styles.css';
import { HtmlAttributes } from 'src/components/html-component-props';

const AblyH2: FC<HtmlAttributes<'h2'>> = ({ children, ...attribs }) => (
  <h2 {...attribs} className="ui-text-h2">
    {children}
  </h2>
);

const H2 = LinkableHtmlBlock(AblyH2, 'mb-32');

export default H2;
