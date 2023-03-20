import React, { Children, useContext } from 'react';
import { DEFAULT_PREFERRED_INTERFACE, IGNORED_LANGUAGES_FOR_DISPLAY } from '../../../../data/createPages/constants';
import PageLanguageContext from '../../../contexts/page-language-context';
import { makeGroup, assignPrimary, addToFilter, isIrrelevantForLanguageDisplay } from './language-utilities';
import { PREFERRED_INTERFACE_KEY, safeWindow } from '../../../utilities';
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
      const selectedInterface = getSDKInterface();
      /*
        Check first if the languages consists of REST or Realtime ex: rest_ or rt_
        Then fetch only th languages if it has realtime or rest ex: rest_javascript
       */
      const realtimeCode = Object.entries(relevantGroup.data).filter(([key]) => key.includes('rt'));
      const restCode = Object.entries(relevantGroup.data).filter(([key]) => key.includes('rest'));
      const realtimeCodeLanguages = realtimeCode.map((e) => e[0]);
      const restCodeLanguages = restCode.map((e) => e[0]);

      return React.cloneElement(child, {
        language,
        languages:
          !isEmpty(realtimeCode) || !isEmpty(restCodeLanguages)
            ? selectedInterface === DEFAULT_PREFERRED_INTERFACE
              ? realtimeCodeLanguages
              : restCodeLanguages
            : relevantGroup.languages,
        altData: relevantGroup.data,
      });
    }
    return child;
  });
};

export default ConditionalChildrenLanguageDisplay;

export const getSDKInterface = () => {
  // Able to identify which tab is selected
  /*
      If sdkInterface is present in the URL then return the
      If not then get the PREFERRED_INTERFACE_KEY stored in the local storage
   */
  const urlParams = new URLSearchParams(window.location.search);
  const preferredSDKInterfaceStored = safeWindow.localStorage.getItem(PREFERRED_INTERFACE_KEY);
  return urlParams.get('sdkInterface') || preferredSDKInterfaceStored || PREFERRED_INTERFACE_KEY;
};
