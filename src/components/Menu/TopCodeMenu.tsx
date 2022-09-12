import React, { useContext } from 'react';
import { HorizontalMenu, HorizontalMenuVariant } from 'src/components';
import { DEFAULT_LANGUAGE } from '../../../data/createPages/constants';
import PageLanguageContext from '../../contexts/page-language-context';
import { LanguageDropdownSelector } from './LanguageDropdownSelector/LanguageDropdownSelector';
import VersionMenu, { VersionMenuProps } from './VersionMenu';

const TopCodeMenu = ({ languages, versionData }: { languages: string[]; versionData: VersionMenuProps }) => {
  const pageLanguage = useContext(PageLanguageContext);
  const showCodeMenu = languages && languages.length > 1;
  const showDefaultLink = pageLanguage !== DEFAULT_LANGUAGE;
  return (
    <div className="fixed right-0 z-10 mt-64 w-full items-end bg-white border-b border-mid-grey md:col-span-4 md:w-4/5">
      {showCodeMenu ? (
        <HorizontalMenu variant={HorizontalMenuVariant.end}>
          <VersionMenu {...versionData} />
          <LanguageDropdownSelector language={pageLanguage} languages={languages} showDefaultLink={showDefaultLink} />
        </HorizontalMenu>
      ) : null}
    </div>
  );
};

export default TopCodeMenu;
