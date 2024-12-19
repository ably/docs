import React from 'react';
import Icon from '@ably/ui/core/Icon';

const ExamplesCheckbox = ({
  label,
  name,
  value,
  selectProductOrUseCase,
}: {
  label: string;
  name: string;
  value: string;
  selectProductOrUseCase: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex items-center mb-0">
      <input
        data-ui-checkbox-native=""
        type="checkbox"
        id={name}
        name={name}
        className="ui-checkbox-input"
        value={value}
        defaultChecked={value === 'all'}
        onChange={(e) => selectProductOrUseCase(e)}
      />
      <div data-ui-checkbox-styled="" className="ui-checkbox-styled">
        <Icon size="1rem" name="icon-gui-tick" additionalCSS="ui-checkbox-styled-tick cursor-pointer" />
      </div>
      <label htmlFor={name} className="ui-text-p4 text-neutral-900">
        {label}
      </label>
    </div>
  );
};

export default ExamplesCheckbox;
