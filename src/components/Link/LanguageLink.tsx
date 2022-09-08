import { Link } from 'gatsby';
import React, { useContext } from 'react';
import styled from 'styled-components';
import PageLanguageContext from '../../contexts/page-language-context';
import languageLabels from '../../maps/language';
import { primary } from '../../styles/colors';
import { getLanguageDefaults } from '../common/language-defaults';

const HoverLink = styled(Link)`
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
`;

const LanguageLink = ({ language }: { language: string }) => {
  const pageLanguage = useContext(PageLanguageContext);

  const { isLanguageDefault, isPageLanguageDefault } = getLanguageDefaults(language, pageLanguage);
  const href = isPageLanguageDefault
    ? `./language/${language}`
    : `../../${isLanguageDefault ? '' : `language/${language}`}`;

  return <HoverLink to={href}>{languageLabels[language] ?? language}</HoverLink>;
};

export default LanguageLink;
