import React from 'react';
import { ReactSelectOption } from 'src/components';
import { imageMap, isInImageMap } from '../../LanguageDropdownSelector/image-map';

const returnNullIfNoLanguageAvailable = (languageOption: ReactSelectOption) =>
  isInImageMap(languageOption.value) ? imageMap[languageOption.value] : () => null;

export const FormatOptionLabelWithLanguageLogo = (languageOption: ReactSelectOption) => {
  const Component = returnNullIfNoLanguageAvailable(languageOption);
  return (
    <div className="language-option items-center flex gap-8">
      <Component />
      <span className="px-8">{languageOption.label}</span>
    </div>
  );
};
