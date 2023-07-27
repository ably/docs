import React, { FC } from 'react';
import LinkableHtmlBlock from 'src/components/blocks/Html/LinkableHtmlBlock';
import { HtmlAttributes } from 'src/components/html-component-props';

const StyledApiReferenceH5: FC<HtmlAttributes<'h5'>> = ({ children, ...attribs }) => (
  <h5 {...attribs} className="ui-text-h5 font-manrope my-16 font-bold leading-normal">
    {children}
  </h5>
);

export const ApiReferenceH5 = LinkableHtmlBlock(StyledApiReferenceH5, 'mb-24');
