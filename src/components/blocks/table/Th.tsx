import React, { ComponentProps } from 'react';
import cn from 'classnames';
import { HtmlComponentProps, ValidReactElement } from 'src/components/html-component-props';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

import { theader } from './Th.module.css';

const Th = (props: { data: HtmlComponentProps<ValidReactElement>[]; attribs: ComponentProps<'th'> }) => {
  return (
    <th
      className={cn('px-16 uppercase font-normal text-menu1 pt-40 pb-20 sticky top-0 bg-white', theader)}
      {...props}
    />
  );
};

export default GenericHtmlBlock(Th);
