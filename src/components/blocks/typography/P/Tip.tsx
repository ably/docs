import React from 'react';
import { HtmlComponentProps } from '../../../html-component-props';
import Html from '../../Html';
import styled from 'styled-components';
import { colors } from '../../../../styles';

/**
 * This is required because Tailwind v2 does not offer a good way to style one side of a border.
 * The closest to what design requires here is:
 * rounded-lg bg-{#FAFAFB} ring-2 ring-{#d9d9da} ring-inset border-l-8 border-{#08ff13} e p-4
 bg-{#08ff13} w-8 left-0 cursor-default
 */
const LeftsideElement = styled.span`
  width: 8px;
  border-radius: 0.5em 0 0 0.5em;
  background-color: #08ff13;
  left: 0;
  cursor: default;
  grid-row-start: 1;
  grid-row-end: span 2;
  grid-column-start: 1;
  grid-column-end: 1;
  height: 100%;
`;

const TipTitleElement = styled.strong`
  margin-left: var(--spacing-16);
  padding: var(--spacing-16);
  margin-top: var(--spacing-8);
  grid-column-start: 1;
  grid-row-start: 1;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 0.1em;
  line-height: 18px;
`;

const InlineContentContainer = styled.div`
  grid-row: 2;
  grid-column: 1;
  margin-left: var(--spacing-16);
  padding-left: var(--spacing-16);
  padding-right: var(--spacing-16);
  padding-bottom: var(--spacing-16);
  margin-bottom: var(--spacing-8);
`;

const InlineGridParagraph = styled.p`
  display: inline-grid;
  border-radius: 0.5em;
  background-color: ${colors.containers.three};
  border-width: 1px;
  border-color: #d9d9da;
  grid-template-rows: auto auto;
  font-size: 16px;
  line-height: 23px;
  padding: 0;
`;

// This needs to be set to a grid in order to render properly
export const Tip = ({ data, attribs }: HtmlComponentProps<'p'>) => (
  <InlineGridParagraph className={`${attribs?.className}`}>
    <LeftsideElement>&nbsp;</LeftsideElement>
    <TipTitleElement>Tip</TipTitleElement>
    <InlineContentContainer className={`inline`}>
      <Html data={data} />
    </InlineContentContainer>
  </InlineGridParagraph>
);
