import React from 'react';
import { HtmlComponentProps } from 'src/components/html-component-props';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const Td = (props: HtmlComponentProps<'td'>) => {
  return <td className="p-8" {...props} />;
};

export default GenericHtmlBlock(Td);
