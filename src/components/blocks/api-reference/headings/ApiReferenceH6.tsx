import React, { FC } from 'react';

import LinkableHtmlBlock from '../../Html/LinkableHtmlBlock';
import { HtmlAttributes } from '../../../html-component-props';

const StyledApiReferenceH6: FC<HtmlAttributes<'h6'>> = ({ children, ...attribs }) => {
  return (
    <h6
      {...attribs}
      className={`inline-block font-mono items-center w-min py-4 px-8 mt-10 mb-24 rounded-sm bg-api-reference-attribute-highlight border border-api-reference-attribute-border ${
        attribs?.className ?? ''
      }`}
    >
      {children}
    </h6>
  );
};

export const ApiReferenceH6 = LinkableHtmlBlock(StyledApiReferenceH6, 'mb-6');
