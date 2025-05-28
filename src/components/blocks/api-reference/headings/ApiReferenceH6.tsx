import React, { FC } from 'react';

import LinkableHtmlBlock from '../../Html/LinkableHtmlBlock';
import { HtmlAttributes } from '../../../html-component-props';

const StyledApiReferenceH6: FC<HtmlAttributes<'h6'>> = ({ children, ...attribs }) => {
  return (
    <h6
      {...attribs}
      className={`inline-block font-mono items-center text-p2 w-full py-1 px-2 my-3 rounded-sm bg-neutral-100 border border-neutral-200 ${
        attribs?.className ?? ''
      }`}
    >
      {children}
    </h6>
  );
};

export const ApiReferenceH6 = LinkableHtmlBlock(StyledApiReferenceH6, 'mb-6');
