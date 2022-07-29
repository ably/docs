import React from 'react';
import { DropdownMenuContainer } from '../dropdown-menu-container';
import { DropdownItemContent } from './DropdownItemContent';
import { Title } from './Title';
import { Content } from './types';

export const ContentsContainer = ({ contents, title }: { contents: Content[]; title: string }) => (
  <DropdownMenuContainer id={title}>
    <Title>{title}</Title>
    <menu className="list-none">
      {contents.map((content, i) => (
        <DropdownItemContent key={i} content={content} />
      ))}
    </menu>
  </DropdownMenuContainer>
);
