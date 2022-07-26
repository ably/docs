import React from 'react';
import { ContentsContainer } from './Contents';
import { Summary } from './Summary';
import { DropdownData } from './types';

export const DropdownMenu = ({ summaryTitle, summaryDescription, summaryLink, title, contents }: DropdownData) => (
  <>
    <Summary titleText={summaryTitle} descriptionText={summaryDescription} />
    <ContentsContainer title={title} contents={contents} />
  </>
);
