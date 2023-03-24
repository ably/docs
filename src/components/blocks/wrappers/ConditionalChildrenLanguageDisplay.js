import React, { Children, useContext } from 'react';
import { IGNORED_LANGUAGES_FOR_DISPLAY } from '../../../../data/createPages/constants';
import PageLanguageContext from '../../../contexts/page-language-context';
import { makeGroup, assignPrimary, addToFilter, isIrrelevantForLanguageDisplay } from './language-utilities';
import { isEmpty } from 'lodash';

const ConditionalChildrenLanguageDisplay = ({ children }) => {
  const language = useContext(PageLanguageContext);
  let currentGroup = false;
  const childLanguageGroups = [];
  const toFilter = [];
  Children.forEach(children, ({ props, props: { attribs = {} } }, index) => {
    if (isIrrelevantForLanguageDisplay(props.data)) {
      if (currentGroup?.languages) {
        currentGroup.languages.push('');
      }
      return;
    }
    if (attribs.lang && !IGNORED_LANGUAGES_FOR_DISPLAY.includes(attribs.lang)) {
      if (!currentGroup) {
        currentGroup = makeGroup(attribs.lang, index, props.data);
      } else if (currentGroup.languages.includes(attribs.lang)) {
        // A repeated lang is possibly user error, but if it is not it would be hard to work out why your documentation doesn't show.
        addToFilter(currentGroup, toFilter);
        childLanguageGroups.push({ ...currentGroup });
        currentGroup = makeGroup(attribs.lang, index, props.data);
      } else {
        currentGroup.end = index;
        currentGroup = assignPrimary(currentGroup, attribs.lang, language, props.data, index);
      }
      return;
    }

    if (currentGroup) {
      addToFilter(currentGroup, toFilter);
      childLanguageGroups.push({ ...currentGroup });
    }
    currentGroup = false;
    toFilter[index] = false;
  });
  if (currentGroup) {
    addToFilter(currentGroup, toFilter);
    childLanguageGroups.push({ ...currentGroup });
  }

  return Children.map(children, (child, index) => {
    if (toFilter[index]) {
      return null;
    }
    const relevantGroup = childLanguageGroups.find((group) => group.index === index);

    if (relevantGroup && relevantGroup.data && relevantGroup.languages.length > 1) {
      const allAltDataRealtime = Object.entries(relevantGroup.data).filter(([key]) => key.includes('realtime'));
      const allAltDataRest = Object.entries(relevantGroup.data).filter(([key]) => key.includes('rest'));
      const realtimeAltData = getCleanedSDKInterfaceAltData(allAltDataRealtime, language);
      const restAltCode = getCleanedSDKInterfaceAltData(allAltDataRest, language);

      return React.cloneElement(child, {
        language,
        languages: relevantGroup.languages,
        altData: relevantGroup.data,
        isSDKInterface: !isEmpty(realtimeAltData) || !isEmpty(restAltCode),
        realtimeAltData: !isEmpty(realtimeAltData) ? realtimeAltData[0] : null,
        restAltData: !isEmpty(restAltCode) ? restAltCode[0] : null,
      });
    }
    return child;
  });
};

export default ConditionalChildrenLanguageDisplay;

const getCleanedSDKInterfaceAltData = (sdkInterfaceSingleData, language) =>
  sdkInterfaceSingleData
    .map((e) => (e[0].includes(language) ? e[1] : null))
    .filter(function (n) {
      return n;
    });
