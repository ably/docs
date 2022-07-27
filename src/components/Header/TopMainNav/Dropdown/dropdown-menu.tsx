import React from 'react';
import { ContentsContainer } from './Contents';
import { Summary } from './Summary';
import { DropdownData } from './types';

export const DropdownMenu = ({ summaryTitle, summaryDescription, summaryLink, title, contents }: DropdownData) => (
  <aside id={summaryTitle}>
    <Summary titleText={summaryTitle} descriptionText={summaryDescription} />
    <ContentsContainer title={title} contents={contents} />
  </aside>
);
