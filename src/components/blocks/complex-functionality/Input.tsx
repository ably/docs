import React from 'react';
import { HtmlBlockComponentProps } from '../block';
import SelfClosingHtmlBlock from '../Html/SelfClosingHtmlBlock';
import './styles.css';

const Input = ({ attribs }: HtmlBlockComponentProps) => {
  switch (attribs.type) {
    case 'text':
      return <InputTextField attribs={attribs} />;
    default: {
      const Type = SelfClosingHtmlBlock('input');
      return <Type attribs={attribs} />;
    }
  }
};

const InputTextField = ({ attribs }: HtmlBlockComponentProps) => (
  <input
    {...{
      className: 'input-field',
      ...attribs,
    }}
  />
);

export default Input;
