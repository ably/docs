import React, { useContext } from 'react';
import { HorizontalMenu, HorizontalMenuVariant } from 'src/components';
import { DEFAULT_LANGUAGE } from '../../../data/createPages/constants';
import PageLanguageContext from '../../contexts/page-language-context';
import { LanguageDropdownSelector } from './LanguageDropdownSelector/LanguageDropdownSelector';
import { VersionMenuProps } from './VersionMenu';
import { useMediaQuery } from '@react-hook/media-query';
import { LATEST_ABLY_API_VERSION_STRING } from '../../../data/transform/constants';

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

  return showCodeMenu ? (
    <div
      id="top-code-menu"
      className={`${
        isDesktop ? 'pl-200' : 'fixed right-0 z-10 top-64 left-0 md:pl-244 border-b border-mid-grey'
      } w-full items-end bg-white px-24`}
    >
      <HorizontalMenu variant={HorizontalMenuVariant.end}>
        {showLanguageSelector ? (
          <LanguageDropdownSelector language={pageLanguage} languages={languages} showDefaultLink={showDefaultLink} />
        ) : null}
      </HorizontalMenu>
    </div>
  ) : null;
};

export default TopCodeMenu;
