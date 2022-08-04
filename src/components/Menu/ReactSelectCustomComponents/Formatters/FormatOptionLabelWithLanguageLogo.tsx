import React from 'react';
import { ReactSelectOption } from '../../react-select-option-types';
import { imageMap } from '../../LanguageDropdownSelector/image-map';

export const FormatOptionLabelWithLanguageLogo = (languageOption: ReactSelectOption) => (
  <div className="language-option">
    {imageMap[languageOption.value] ? (
      <img src={imageMap[languageOption.value]} alt={`${languageOption.value} language logo`} />
    ) : null}
    <span>{languageOption.label}</span>
  </div>
);
