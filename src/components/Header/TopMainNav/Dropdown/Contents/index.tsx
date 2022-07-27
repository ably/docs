import React from 'react';
import { DropdownItemContent } from './DropdownItemContent';
import { Title } from './Title';
import { Content } from './types';

export const ContentsContainer = ({ contents, title }: { contents: Content[]; title: string }) => (
  <div className="fixed top-64 h-256 left-1/4 w-3/4 bg-white" id={title}>
    <Title>{title}</Title>
    <menu className="list-none">
      {contents.map((content, i) => (
        <DropdownItemContent key={i} content={content} />
      ))}
    </menu>
  </div>
);
