import React, { FC } from 'react';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';
import { HtmlAttributes } from 'src/components/html-component-props';

const AblyH4: FC<HtmlAttributes<'h4'>> = ({ children, ...attribs }) => (
  <h4 {...attribs} className="font-sans font-medium text-cool-black text-h4 mb-16">
    {children}
  </h4>
);

const H4 = LinkableHtmlBlock(AblyH4, 'mb-24');

export default H4;
