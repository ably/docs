import React from 'react';
import { Content, DropdownItemContent, dropdownTitleStyles } from '../../../../Dropdown/Contents';

export const HamburgerSidebarDropdownContents = ({ contents, title }: { contents: Content[]; title: string }) => (
  <div>
    <h4 className="ui-text-h4 uppercase pt-32 pl-24" style={dropdownTitleStyles}>
      {title}
    </h4>
    <menu className="list-none grid grid-cols-1 gap-16 pl-24 pb-24 font-medium">
      {contents.map((content, i) => (
        <DropdownItemContent key={i} content={content} />
      ))}
    </menu>
  </div>
);
