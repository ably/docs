import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DEFAULT_LANGUAGE } from '../../../data/createPages/constants';
import PageLanguageContext from '../../contexts/page-language-context';
import languageLabels from '../../maps/language';
import { primary } from '../../styles/colors';
import { navigate } from 'gatsby';

const HoverButton = styled.button`
  cursor: pointer;
  display: block;
  position: relative;
  user-select: none;
  color: ${primary.black};

  &:hover,
  &.active,
  &.is-active {
    color: ${primary.richOrange};
  }
  &:focus {
    outline: none;
  }
`;

const LanguageButton = ({ language }) => {
  const pageLanguage = useContext(PageLanguageContext);

  const languageIsDefault = language === DEFAULT_LANGUAGE;
  const pageIsDefault = pageLanguage === DEFAULT_LANGUAGE;

  const href = pageIsDefault ? `./?lang=${language}` : `./${languageIsDefault ? '' : `?lang=${language}`}`;

  const isActiveClassName = language === pageLanguage ? 'active' : 'inactive';

  return (
    <HoverButton className={isActiveClassName} onClick={() => navigate(href)}>
      {languageLabels[language] ?? language}
    </HoverButton>
  );
};

LanguageButton.propTypes = {
  language: PropTypes.string,
};

export default LanguageButton;
