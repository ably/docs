import React from 'react';
import { ReactSelectOption } from 'src/components';
import { imageMap, isInImageMap } from '../../LanguageDropdownSelector/image-map';

const returnNullIfNoLanguageAvailable = (languageOptionValue: string) =>
  isInImageMap(languageOptionValue) ? imageMap[languageOptionValue] : () => null;

export const FormatOptionLabelWithLanguageLogo = (languageOption: ReactSelectOption) => {
  const Component = returnNullIfNoLanguageAvailable(languageOption.value);
  const langLabelAndVersion = languageOption.label.split(' ');
  const languageVersion = langLabelAndVersion[langLabelAndVersion.length - 1];
  const languageLabel = langLabelAndVersion.slice(0, -1).join(' ');

  return (
    <div className="language-option items-center flex gap-16 p-2">
      <Component />
      <div className="flex justify-between w-full">
        <div className="py-4">{languageLabel} </div>
        {languageVersion !== 'none' && (
          <div
            className="text-active-orange font-medium bg-mid-grey px-4 py-4 rounded-lg"
            style={{ backgroundColor: '#FFEFE9' }}
          >
            {languageVersion}
          </div>
        )}
      </div>
    </div>
  );
};
