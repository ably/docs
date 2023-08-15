import React, { useContext } from 'react';
import { DEFAULT_LANGUAGE } from '../../../data/createPages/constants';
import PageLanguageContext from '../../contexts/page-language-context';
import { LanguageDropdownSelector } from './LanguageDropdownSelector/LanguageDropdownSelector';
import { VersionMenuProps } from './VersionMenu';
import { useMediaQuery } from '@react-hook/media-query';

const useScreenSize = () => {
  return useMediaQuery('only screen and (min-width: 1040px)');
};

const TopCodeMenu = ({ languages, versionData }: { languages: string[]; versionData: VersionMenuProps }) => {
  const isDesktop = useScreenSize();
  const pageLanguage = useContext(PageLanguageContext);
  const showVersionMenu = versionData;
  const showLanguageSelector = languages.length > 0;
  const showCodeMenu = showLanguageSelector || showVersionMenu;
  const showDefaultLink = pageLanguage !== DEFAULT_LANGUAGE;
  const containerStyling = isDesktop
                         ? 'col-start-3 sticky'
                         : 'fixed right-0 z-10 top-64 left-0 bg-white';
  const menuStyling = isDesktop ? 'pl-0' : 'relative flex justify-end pl-0 md:pl-244 w-full items-end px-24';

  return showCodeMenu ? (
    <div class={containerStyling} style={{ top: isDesktop ? 'calc(var(--top-nav-height))' : '' }}>
      <menu role="menu" id="top-code-menu" className={menuStyling}>
        {showLanguageSelector ? (
          <LanguageDropdownSelector language={pageLanguage} languages={languages} showDefaultLink={showDefaultLink} />
        ) : null}
      </menu>
    </div>
  ) : null;
};

export default TopCodeMenu;
