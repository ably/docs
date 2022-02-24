import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { HorizontalCodeMenu } from '.';
import { DEFAULT_LANGUAGE } from '../../../data/createPages/constants';
import PageLanguageContext from '../../contexts/page-language-context';
import LanguageLink from '../Link/LanguageLink';
import MenuLabel from './Label';
import MenuItem from './MenuItem';

const TopCodeMenu = ({ languages }) => {
  const pageLanguage = useContext(PageLanguageContext);
  const showCodeMenu = languages && languages.length > 1;
  const showDefaultLink = pageLanguage !== DEFAULT_LANGUAGE;
  return (
    <div className="fixed pt-64 right-0 z-10 w-full items-end">
      {showCodeMenu ? (
        <HorizontalCodeMenu>
          <MenuLabel>Show code examples in:</MenuLabel>
          {showDefaultLink ? (
            <MenuItem key={DEFAULT_LANGUAGE}>
              <LanguageLink language={DEFAULT_LANGUAGE} />
            </MenuItem>
          ) : null}
          {languages.map((language) => (
            <MenuItem key={language}>
              <LanguageLink language={language} />
            </MenuItem>
          ))}
        </HorizontalCodeMenu>
      ) : null}
    </div>
  );
};

TopCodeMenu.propTypes = {
  languages: PropTypes.array,
};

export default TopCodeMenu;
