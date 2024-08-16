import React from 'react';
import { ReactSelectOption } from 'src/components';
import { imageMap, isInImageMap } from '../../LanguageDropdownSelector/image-map';

type ExtendedReactSelectOption = ReactSelectOption & { selectedOption: string };

const returnNullIfNoLanguageAvailable = (languageOptionValue: string) =>
  isInImageMap(languageOptionValue) ? imageMap[languageOptionValue] : () => null;

export const FormatOptionLabelWithLanguageLogo = (languageOption: ExtendedReactSelectOption) => {
  const Component = returnNullIfNoLanguageAvailable(languageOption.value);
  const langLabelAndVersion = languageOption.label.split(' ');
  const languageVersion = langLabelAndVersion[langLabelAndVersion.length - 1];
  const languageLabel = langLabelAndVersion.slice(0, -1).join(' ');

  // we remove the version number and any whitespace from the selected option, so that we can
  // compare with the language label.
  const selectedOption = languageOption.selectedOption.replace(/v\d+\.\d+/, '').trim();

  return (
    <div className="language-option items-center flex gap-6 md:gap-8">
      <div className="custom-svg-wrapper" style={{ transform: 'scale(0.833)' }}>
        <Component />
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="py-4">{selectedOption !== languageLabel ? languageLabel : ''}</div>
        <div
          className="text-active-orange p-4 font-medium text-center"
          style={{
            backgroundColor: '#FFF3EF',
            fontSize: '0.688rem',
            borderRadius: '0.1875rem',
          }}
        >
          {languageVersion}
        </div>
      </div>
    </div>
  );
};
