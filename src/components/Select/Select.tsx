import ReactSelect, { Props, OptionProps } from 'react-select';
import Icon from '@ably/ui/core/Icon';
import { selectMenuStyles } from './styles';
import { ReactSelectOption } from './types';

const CustomOption = ({ innerProps, innerRef, isSelected, label }: OptionProps<ReactSelectOption, false>) => {
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="text-cool-black rounded w-full hover:bg-light-grey cursor-pointer hover:text-gui-active p-8 flex items-center justify-between font-sans text-btn2"
    >
      {label}
      {isSelected && <Icon name="icon-gui-check-micro" size="1rem" />}
    </div>
  );
};

const Select = ({ ...props }: Props<ReactSelectOption, false>) => {
  return (
    <ReactSelect
      {...props}
      classNames={{
        menu: () => `max-w-128 xs:max-w-256`,
      }}
      components={{ Option: CustomOption }}
      styles={selectMenuStyles}
      classNamePrefix="ably-select"
    />
  );
};

export default Select;
