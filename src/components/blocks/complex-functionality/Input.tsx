import React from 'react';
import SelfClosingHtmlBlock from '../Html/SelfClosingHtmlBlock';
import './styles.css';

const Input = ({ attribs }: { attribs: React.ComponentProps<'input'> }) => {
  switch (attribs.type) {
    case 'text':
      return <InputTextField {...attribs} />;
    default: {
      const Type = SelfClosingHtmlBlock('input');
      return <Type {...attribs} />;
    }
  }
};

const InputTextField = (props: React.ComponentProps<'input'>) => (
  <input
    {...{
      className: 'input-field',
      ...props,
    }}
  />
);

export default Input;
