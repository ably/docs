import { Link } from 'gatsby';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { DEFAULT_LANGUAGE } from '../../../data/createPages/createPageVariants';
import PageLanguageContext from '../../contexts/page-language-context';
import languageLabels from '../../maps/language';
import { primary, text } from '../../styles/colors';

const HoverLink = styled(Link)`
    cursor: pointer;
    display: block;
    position: relative;
    user-select: none;
    color: ${text.aux};

    &:hover, &.active, &.is-active {
        color: ${ primary.richOrange}
    }
`;

const LanguageLink = ({ language }) => {
    const pageLanguage = useContext(PageLanguageContext);

    const languageIsDefault = language === DEFAULT_LANGUAGE;
    const pageIsDefault = pageLanguage === DEFAULT_LANGUAGE;

    const href = pageIsDefault ?
        `./language/${language}` :
        `../../${
            languageIsDefault ?
            '' :
            `language/${language}`
        }`;

    const isActiveClassName = language === pageLanguage ? 'active' : 'inactive';

    return <HoverLink className={isActiveClassName} to={href}>
        { languageLabels[language] ?? language }
    </HoverLink>;
}

export default LanguageLink;