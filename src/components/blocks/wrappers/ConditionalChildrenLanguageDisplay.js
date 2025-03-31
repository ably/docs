import React, { Children } from 'react';
import {
  IGNORED_LANGUAGES_FOR_DISPLAY,
  REALTIME_SDK_INTERFACE,
  REST_SDK_INTERFACE,
} from '../../../../data/createPages/constants';
import { makeGroup, assignPrimary, addToFilter, isIrrelevantForLanguageDisplay } from './language-utilities';
import { isEmpty } from 'lodash';
import { useLayoutContext } from 'src/contexts/layout-context';

const ConditionalChildrenLanguageDisplay = ({ children }) => {
  const { activePage } = useLayoutContext();

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
        currentGroup = assignPrimary(currentGroup, attribs.lang, activePage.language, props.data, index);
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

    if (relevantGroup && relevantGroup.data && relevantGroup.languages.length >= 1) {
      const allAltDataRealtime = Object.entries(relevantGroup.data).filter(([key]) =>
        key.includes(REALTIME_SDK_INTERFACE),
      );
      const allAltDataRest = Object.entries(relevantGroup.data).filter(([key]) => key.includes(REST_SDK_INTERFACE));
      const realtimeAltData = getCleanedSDKInterfaceAltData(
        allAltDataRealtime,
        activePage.language,
        REALTIME_SDK_INTERFACE,
      );
      const restAltData = getCleanedSDKInterfaceAltData(allAltDataRest, activePage.language, REST_SDK_INTERFACE);

      return React.cloneElement(child, {
        pageLanguage: activePage.language,
        languages: relevantGroup.languages,
        altData: relevantGroup.data,
        isSDKInterface: !isEmpty(allAltDataRealtime) || !isEmpty(allAltDataRest),
        realtimeAltData: !isEmpty(realtimeAltData) ? realtimeAltData[0] : [],
        restAltData: !isEmpty(restAltData) ? restAltData[0] : [],
      });
    }

    return child;
  });
};

export default ConditionalChildrenLanguageDisplay;

const getCleanedSDKInterfaceAltData = (sdkInterfaceSingleData, language, sdkInterface) =>
  sdkInterfaceSingleData.map((e) => (e[0] === `${sdkInterface}_${language}` ? e[1] : null)).filter((n) => !!n);
