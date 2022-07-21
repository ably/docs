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

  const { isLanguageDefault, isPageLanguageDefault, maybeActiveButtonClassName } = getLanguageDefaults(
    language,
    pageLanguage,
  );
  const href = isPageLanguageDefault
    ? `./language/${language}`
    : `../../${isLanguageDefault ? '' : `language/${language}`}`;

  return (
    // 'active' className doesn’t need to be in the Tailwind config safe list as it isn’t part of the Tailwind ecosystem.
    <HoverLink className={maybeActiveButtonClassName} to={href}>
      {languageLabels[language] ?? language}
    </HoverLink>
  );
};

export default LanguageLink;
