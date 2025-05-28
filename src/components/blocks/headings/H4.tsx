import React, { FC } from 'react';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';
import { HtmlAttributes } from 'src/components/html-component-props';

const AblyH4: FC<HtmlAttributes<'h4'>> = ({ children, ...attribs }) => (
  <h4 {...attribs} className="ui-text-h4 mb-4">
    {children}
  </h4>
);

const H4 = LinkableHtmlBlock(AblyH4, 'mb-6');

export default H4;
