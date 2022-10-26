import React, { ComponentProps, ReactNode } from 'react';
import GenericHtmlBlock from 'src/components/blocks/Html/GenericHtmlBlock.js';

const StyledApiReferenceH6 = ({ attribs = {}, children }: { attribs: ComponentProps<'h6'>; children: ReactNode }) => (
  <h6
    {...attribs}
    className={`font-mono items-center w-min py-4 px-8 mt-10 mb-24 rounded-sm bg-api-reference-attribute-highlight border border-api-reference-attribute-border ${
      attribs?.className ?? ''
    } `}
  >
    {children}
  </h6>
);

export const ApiReferenceH6 = GenericHtmlBlock(StyledApiReferenceH6);
