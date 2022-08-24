import React from 'react';
import Markdown from 'markdown-to-jsx';
import { BodySectionDescriptionContainer } from './BodySectionDescriptionContainer';

export const BodySectionDescription = ({ description }: { description: string }) => (
  <BodySectionDescriptionContainer>
    <Markdown options={{ overrides: { a: { props: { className: 'docs-link' } } } }}>{description}</Markdown>
  </BodySectionDescriptionContainer>
);
