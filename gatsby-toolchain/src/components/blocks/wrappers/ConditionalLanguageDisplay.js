import React, { Children, useContext } from 'react';
import { IGNORED_LANGUAGES_FOR_DISPLAY } from '../../../../data/createPages/constants';
import PageLanguageContext from '../../../contexts/page-language-context';

const ConditionalLanguageDisplay = ({ attribs, children }) => {
    const language = useContext(PageLanguageContext);
    const langIsRelevant = attribs && attribs.lang && !IGNORED_LANGUAGES_FOR_DISPLAY.includes(attribs.lang);
    // When we wrap child elements, we'll just need to ensure that the first lang attribute encountered is set to null
    if(langIsRelevant && attribs.lang !== language) {
        return null;
    }
    const BlockWithData = Children.only(children);
    return BlockWithData;
};

export default ConditionalLanguageDisplay;