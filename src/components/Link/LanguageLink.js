import { Link } from 'gatsby';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DEFAULT_LANGUAGE } from '../../../data/createPages/constants';
import PageLanguageContext from '../../contexts/page-language-context';
import languageLabels from '../../maps/language';
import { primary } from '../../styles/colors';

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

const LanguageLink = ({ language }) => {
  const pageLanguage = useContext(PageLanguageContext);

  const languageIsDefault = language === DEFAULT_LANGUAGE;
  const pageIsDefault = pageLanguage === DEFAULT_LANGUAGE;

  const href = pageIsDefault ? `./language/${language}` : `../../${languageIsDefault ? '' : `language/${language}`}`;

  const isActiveClassName = language === pageLanguage ? 'active' : 'inactive';

  return (
    // 'active' className doesn’t need to be in the Tailwind config safe list as it isn’t part of the Tailwind ecosystem.
    <HoverLink className={isActiveClassName} to={href}>
      {languageLabels[language] ?? language}
    </HoverLink>
  );
};

LanguageLink.propTypes = {
  language: PropTypes.string,
};

export default LanguageLink;
