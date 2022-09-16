import React, { FC } from 'react';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';
import '@ably/ui/core/styles.css';
import { HtmlAttributes } from 'src/components/html-component-props';

const AblyH4: FC<HtmlAttributes<'h4'>> = ({ children, ...attribs }) => (
  <h4 {...attribs} className="ui-text-h3">
    {children}
  </h4>
);

const H4 = LinkableHtmlBlock(AblyH4, 'mb-24');

export default H4;
