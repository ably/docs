import React, { Children, useContext } from 'react';
import { DEFAULT_LANGUAGE, IGNORED_LANGUAGES_FOR_DISPLAY } from "../../../../data/createPages/constants";
import PageLanguageContext from '../../../contexts/page-language-context';

const makeGroup = (lang, index, data) => ({
    start: index,
    end: index,
    index,
    primary: lang,
    languages: [lang],
    data: {
        [lang]: data
    }
});

const assignPrimary = (group, lang, targetLanguage, data, index) => {
    group.languages.push(lang);
    if(lang === targetLanguage) {
        return {
            ...group,
            index,
            data: null,
            primary: targetLanguage
        }
    }
    if(lang === DEFAULT_LANGUAGE && group.primary !== targetLanguage) {
        return {
            ...group,
            index,
            data: null,
            primary: DEFAULT_LANGUAGE
        }
    }
    if(group.data === null) {
        return group;
    }
    return {
        ...group,
        data: Object.assign(group.data, {
            [lang]: data
        })
    };
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
        ({ props, props: { attribs = null } }, index) => {
            if(
                attribs &&
                attribs.lang &&
                !IGNORED_LANGUAGES_FOR_DISPLAY.includes(attribs.lang)
            ) {
                if(!currentGroup) {
                    currentGroup = makeGroup(attribs.lang, index, props.data);
                } else if(currentGroup.languages.includes(attribs.lang)) {
                    // A repeated lang is possibly user error, but if it is not it would be hard to work out why your documentation doesn't show.
                    addToFilter(currentGroup, toFilter);
                    childLanguageGroups.push({...currentGroup});
                    currentGroup = makeGroup(attribs.lang, index, props.data);
                } else {
                    currentGroup.end = index;
                    currentGroup = assignPrimary(currentGroup, attribs.lang, language, props.data, index);
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
            const relevantGroup = childLanguageGroups.find(group => group.index === index);
            if(
                relevantGroup &&
                relevantGroup.data &&
                relevantGroup.primary !== language &&
                relevantGroup.languages.length > 1
            ) {
                return React.cloneElement(child, {
                    language,
                    languages: relevantGroup.languages,
                    altData: relevantGroup.data
                });
            }
            return child;
        }
    );
};

export default ConditionalChildrenLanguageDisplay;