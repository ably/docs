import React, { ComponentProps, ReactNode } from 'react';

import LinkableHtmlBlock from '../../Html/LinkableHtmlBlock';

const StyledApiReferenceH6 = ({ attribs, children }: { attribs: ComponentProps<'h6'>; children: ReactNode }) => {
  return (
    <h6
      {...attribs}
      className={`inline font-mono items-center w-min py-4 px-8 mt-10 mb-24 rounded-sm bg-api-reference-attribute-highlight border border-api-reference-attribute-border ${
        attribs?.className ?? ''
      }`}
    >
      {children}
    </h6>
  );
};

export const ApiReferenceH6 = LinkableHtmlBlock(StyledApiReferenceH6, 'mb-24');
