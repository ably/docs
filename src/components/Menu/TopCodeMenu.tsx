import React, { useContext } from 'react';
import { TopHorizontalMenuEndAlign } from '.';
import { DEFAULT_LANGUAGE } from '../../../data/createPages/constants';
import PageLanguageContext from '../../contexts/page-language-context';
import { LanguageDropdownSelector } from './LanguageDropdownSelector';
import VersionMenu, { VersionData } from './VersionMenu';

const TopCodeMenu = ({ languages, versionData }: { languages: string[]; versionData: VersionData }) => {
  const pageLanguage = useContext(PageLanguageContext);
  const showCodeMenu = languages && languages.length > 1;
  const showDefaultLink = pageLanguage !== DEFAULT_LANGUAGE;
  return (
    <div className="fixed right-0 z-10 mt-64 w-full items-end bg-white" style={{ boxShadow: '0px 1px 0px #E5E5E5' }}>
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
