import React from 'react';
import Icon from '@ably/ui/core/Icon';
import cn from '@ably/ui/core/utils/cn';

const ExamplesCheckbox = ({
  label,
  name,
  value,
  disabled = false,
  isChecked = false,
  handleSelect,
}: {
  label: string;
  name: string;
  value: string;
  disabled?: boolean;
  isChecked?: boolean;
  handleSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex items-center mb-0">
      <input
        data-ui-checkbox-native=""
        type="checkbox"
        id={name}
        data-testid={name}
        name={name}
        className="ui-checkbox-input"
        value={value}
        checked={isChecked}
        disabled={disabled}
        onChange={(e) => handleSelect(e)}
      />
      <div
        data-ui-checkbox-styled=""
        className={cn(['ui-checkbox-styled', disabled && '!border-neutral-800 !bg-orange-600'])}
      >
        <Icon
          size="1rem"
          name="icon-gui-check-outline"
          additionalCSS={cn(['ui-checkbox-styled-tick cursor-pointer', disabled && 'text-neutral-000'])}
        />
      </div>
      <label htmlFor={name} className="ui-text-p4 text-neutral-900">
        {label}
      </label>
    </div>
  );
};

export default ExamplesCheckbox;
