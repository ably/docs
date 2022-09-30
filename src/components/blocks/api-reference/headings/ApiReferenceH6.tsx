import React, { ComponentProps, ReactNode } from 'react';
import GenericHtmlBlock from '../../Html/GenericHtmlBlock';

const StyledApiReferenceH6 = ({ attribs, children }: { attribs: ComponentProps<'h6'>; children: ReactNode }) => (
  <h6
    {...{ ...attribs }}
    className={`${attribs?.className ?? ''} font-mono
    items-center w-min pb-4 px-8 mt-10 mb-24
    rounded-sm bg-api-reference-attribute-highlight border border-api-reference-attribute-border`}
  >
    {children}
  </h6>
);

export const ApiReferenceH6 = GenericHtmlBlock(StyledApiReferenceH6);
