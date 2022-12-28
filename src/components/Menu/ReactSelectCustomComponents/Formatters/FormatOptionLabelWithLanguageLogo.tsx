import React from 'react';
import { ReactSelectOption } from 'src/components';
import { imageMap, isInImageMap } from '../../LanguageDropdownSelector/image-map';

const returnNullIfNoLanguageAvailable = (languageOptionValue: string) =>
  isInImageMap(languageOptionValue) && typeof window !== 'undefined' ? imageMap[languageOptionValue] : () => null;

export const FormatOptionLabelWithLanguageLogo = (languageOption: ReactSelectOption) => {
  const Component = returnNullIfNoLanguageAvailable(languageOption.value);
  return (
    <div className="language-option items-center flex gap-16">
      <Component />
      <span>{languageOption.label}</span>
    </div>
  );
};
