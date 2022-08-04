import React from 'react';
import { ReactSelectOption } from '../../react-select-option-types';
import { imageMap } from '../../LanguageDropdownSelector/image-map';

export const FormatOptionLabelWithLanguageLogo = (languageOption: ReactSelectOption) => {
  const Component = imageMap[languageOption.value] ?? (() => <></>);
  return (
    <div className="language-option items-center flex gap-8">
      <Component />
      <span className="px-8">{languageOption.label}</span>
    </div>
  );
};
