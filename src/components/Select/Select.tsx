import React from 'react';
import ReactSelect, { Props } from 'react-select';
import Icon from '@ably/ui/core/Icon';
import { selectMenuStyles } from './styles';

// TODO: fix react-select props
const CustomOption = ({ innerProps, innerRef, isSelected, label }: any) => {
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="text-cool-black rounded w-full hover:bg-light-grey cursor-pointer hover:text-gui-active p-8 flex items-center justify-between font-sans text-btn2"
    >
      {label}
      {isSelected && <Icon name="icon-gui-tick" size="1rem" />}
    </div>
  );
};

const Select = (props: Props) => {
  // TODO: fix react-select props
  return <ReactSelect {...props} components={{ Option: CustomOption }} styles={selectMenuStyles as any} />;
};

export default Select;
