import React, { Children, useContext } from 'react';
import { DEFAULT_LANGUAGE, IGNORED_LANGUAGES_FOR_DISPLAY } from '../../../../data/createPages/createPageVariants';
import PageLanguageContext from '../../../contexts/page-language-context';

const makeGroup = (lang, index) => ({
    start: index,
    end: index,
    primary: lang,
    languages: [lang]
});

const assignPrimary = (group, lang, targetLanguage) => {
    group.languages.push(lang);
    if(lang === targetLanguage) {
        return {
            ...group,
            primary: targetLanguage
        }
    }
    if(lang === DEFAULT_LANGUAGE && group.primary !== targetLanguage) {
        return {
            ...group,
            primary: DEFAULT_LANGUAGE
        }
    }
    return group;
}

const addToFilter = (group, toFilter) => {
    for(let i = 0; group.start + i <= group.end; ++i) {
        toFilter[group.start+i] = group.languages[i] !== group.primary;
    }
}

const ConditionalChildrenLanguageDisplay = ({ children }) => {
    const language = useContext(PageLanguageContext);
    let currentGroup = false;
    const childLanguageGroups = [];
    const toFilter = [];
    Children.forEach(
        children,
        ({ props: { attribs = null } }, index) => {
            if(
                attribs &&
                attribs.lang &&
                !IGNORED_LANGUAGES_FOR_DISPLAY.includes(attribs.lang)
            ) {
                if(!currentGroup) {
                    currentGroup = makeGroup(attribs.lang, index);
                } else if(currentGroup.languages.includes(attribs.lang)) {
                    // A repeated lang is possibly user error, but if it is not it would be hard to work out why your documentation doesn't show.
                    addToFilter(currentGroup, toFilter);
                    childLanguageGroups.push({...currentGroup});
                    currentGroup = makeGroup(attribs.lang, index);
                } else {
                    currentGroup.end = index;
                    currentGroup = assignPrimary(currentGroup, attribs.lang, language);
                }
            } else {
                if(!!currentGroup) {
                    addToFilter(currentGroup, toFilter);
                    childLanguageGroups.push({...currentGroup});
                }
                currentGroup = false;
                toFilter[index] = false;
            }
        }
    );
    if(!!currentGroup) {
        addToFilter(currentGroup, toFilter);
        childLanguageGroups.push({...currentGroup});
    }
    return Children.map(
        children,
        (child, index) => {
            if(toFilter[index]) {
                return null;
            }
            return child;
        }
    );
};

export default ConditionalChildrenLanguageDisplay;