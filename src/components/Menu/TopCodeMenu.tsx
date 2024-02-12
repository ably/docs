import React, { useContext } from 'react';
import { DEFAULT_LANGUAGE } from '../../../data/createPages/constants';
import PageLanguageContext from '../../contexts/page-language-context';
import { LanguageDropdownSelector } from './LanguageDropdownSelector/LanguageDropdownSelector';
import { VersionMenuProps } from './VersionMenu';

const TopCodeMenu = ({
  languages,
  versionData,
}: {
  languages: string[];
  versionData: Omit<VersionMenuProps, 'versions'>;
}) => {
  const pageLanguage = useContext(PageLanguageContext);
  const showVersionMenu = versionData;
  const showLanguageSelector = languages.length > 0;
  const showCodeMenu = showLanguageSelector || showVersionMenu;
  const showDefaultLink = pageLanguage !== DEFAULT_LANGUAGE;

  return showCodeMenu ? (
    <div className="px-24 md:px-0">
      <menu role="menu" id="top-code-menu" className="px-0">
        {showLanguageSelector ? (
          <LanguageDropdownSelector language={pageLanguage} languages={languages} showDefaultLink={showDefaultLink} />
        ) : null}
      </menu>
    </div>
  ) : null;
};

export default TopCodeMenu;
