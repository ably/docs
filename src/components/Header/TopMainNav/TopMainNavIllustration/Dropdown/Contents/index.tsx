import React from 'react';
import { DropdownItemContent } from './DropdownItemContent';
import { Title } from './Title';
import { Content } from './types';

export const ContentsContainer = ({ contents, title }: { contents: Content[]; title: string }) => (
  <aside className="w-3/4 bg-white">
    <Title>{title}</Title>
    <menu className="list-none">
      {contents.map((content, i) => (
        <DropdownItemContent key={i} content={content} />
      ))}
    </menu>
  </aside>
);
