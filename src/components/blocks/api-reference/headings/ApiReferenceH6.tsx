import React, { ComponentProps, ReactNode } from 'react';
import styled from 'styled-components';
import GenericHtmlBlock from '../../Html/GenericHtmlBlock';

// Preferring styled comopnents here because props pass through automatically.
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
styled.h6`
  align-items: center;
  padding: 4px 6px;
  background: #ffe6dc;
  margin-top: 10px;
  margin-bottom: 24px;
  border: 1px solid #ff9e7a;
  border-radius: 2px;
  width: fit-content;
`;

export const ApiReferenceH6 = GenericHtmlBlock(StyledApiReferenceH6);
