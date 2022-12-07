import React from 'react';
import { DropdownItemContent } from './DropdownItemContent';
import { Title } from './Title';
import { Content } from './types';

export const ContentsContainer = ({ contents, title }: { contents: Content[]; title: string }) => (
  <div className="max-h-512 col-span-2 flex flex-col" id={title}>
    <Title>{title}</Title>
    <menu className="list-none col-start-2 grid grid-cols-2 gap-8 pl-32 pb-24">
      {contents.map((content, i) => (
        <DropdownItemContent key={i} content={content} />
      ))}
    </menu>
  </div>
);
