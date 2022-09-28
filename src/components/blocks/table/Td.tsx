import React, { ComponentProps } from 'react';
import { HtmlComponentProps, ValidReactElement } from 'src/components/html-component-props';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const Td = (props: { data: HtmlComponentProps<ValidReactElement>[]; attribs: ComponentProps<'td'> }) => {
  return <td className="p-16" {...props} />;
};

export default GenericHtmlBlock(Td);
