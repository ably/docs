import React, { FC } from 'react';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';
import { HtmlAttributes } from 'src/components/html-component-props';

const AblyH3: FC<HtmlAttributes<'h3'>> = ({ children, ...attribs }) => (
  <h3 {...attribs} className="ui-text-h3">
    {children}
  </h3>
);

const H3 = LinkableHtmlBlock(AblyH3, 'mb-24');

export default H3;
