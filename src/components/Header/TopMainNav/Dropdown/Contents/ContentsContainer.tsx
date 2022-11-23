import React from 'react';
import { DropdownMenuContainer } from '../DropdownMenuContainer';
import { DropdownItemContent } from './DropdownItemContent';
import { Title } from './Title';
import { Content } from './types';

export const ContentsContainer = ({ contents, title }: { contents: Content[]; title: string }) => (
  <DropdownMenuContainer id={title}>
    <Title>{title}</Title>
    <menu className="list-none grid grid-cols-2 gap-8 pl-32 pb-24">
      {contents.map((content, i) => (
        <DropdownItemContent key={i} content={content} />
      ))}
    </menu>
  </DropdownMenuContainer>
);
