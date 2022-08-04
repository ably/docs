import React, { useContext } from 'react';
import { TopHorizontalMenuEndAlign } from '.';
import { DEFAULT_LANGUAGE } from '../../../data/createPages/constants';
import PageLanguageContext from '../../contexts/page-language-context';
import { LanguageDropdownSelector } from './LanguageDropdownSelector';

const TopCodeMenu = ({ languages }: { languages: string[] }) => {
  const pageLanguage = useContext(PageLanguageContext);
  const showCodeMenu = languages && languages.length > 1;
  const showDefaultLink = pageLanguage !== DEFAULT_LANGUAGE;
  return (
    <div className="fixed right-0 z-10 mt-64 w-full items-end" style={{ boxShadow: '0px 1px 0px #E5E5E5' }}>
      {showCodeMenu ? (
        <TopHorizontalMenuEndAlign>
          <LanguageDropdownSelector language={pageLanguage} languages={languages} showDefaultLink={showDefaultLink} />
        </TopHorizontalMenuEndAlign>
      ) : null}
    </div>
  );
};

export default TopCodeMenu;
