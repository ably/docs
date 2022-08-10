import React, { useContext } from 'react';
import { TopHorizontalMenuEndAlign } from '.';
import { DEFAULT_LANGUAGE } from '../../../data/createPages/constants';
import PageLanguageContext from '../../contexts/page-language-context';
import { LanguageDropdownSelector } from './LanguageDropdownSelector/LanguageDropdownSelector';
import VersionMenu, { VersionMenuProps } from './VersionMenu';

const TopCodeMenu = ({ languages, versionData }: { languages: string[]; versionData: VersionMenuProps }) => {
  const pageLanguage = useContext(PageLanguageContext);
  const showCodeMenu = languages && languages.length > 1;
  const showDefaultLink = pageLanguage !== DEFAULT_LANGUAGE;
  return (
    <div className="fixed right-0 z-10 mt-64 w-full items-end bg-white border-b border-mid-grey">
      {showCodeMenu ? (
        <TopHorizontalMenuEndAlign>
          <VersionMenu {...versionData} />
          <LanguageDropdownSelector language={pageLanguage} languages={languages} showDefaultLink={showDefaultLink} />
        </TopHorizontalMenuEndAlign>
      ) : null}
    </div>
  );
};

export default TopCodeMenu;
