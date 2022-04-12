import React from 'react';
import SelfClosingHtmlBlock from '../Html/SelfClosingHtmlBlock';
import './styles.css';

const Input = (props:React.ComponentProps<"input">) => {
  switch (props.type) {
    case 'text':
      return <InputTextField {...props} />;
    default: {
      const Type = SelfClosingHtmlBlock('input');
      return <Type {...props} />;
    }
  }
};

const InputTextField = (props:React.ComponentProps<"input">) => (
  <input
    {...{
      className: 'input-field',
      ...props,
    }}
  />
);

export default Input;
