import React, { useContext } from 'react';
import { useLayoutContext } from 'src/contexts/layout-context';
import { LanguageKey } from 'src/data/languages/types';
import UserContext from 'src/contexts/user-context';

interface IfProps {
  lang?: LanguageKey;
  fe_lang?: LanguageKey;
  be_lang?: LanguageKey;
  fe_or_be_lang?: LanguageKey;
  loggedIn?: boolean;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

const If: React.FC<IfProps> = ({ lang, fe_lang, be_lang, fe_or_be_lang, loggedIn, children }) => {
  const { activePage } = useLayoutContext();
  const { language, feLanguage, beLanguage } = activePage;
  const userContext = useContext(UserContext);

  let shouldShow = true;

  // Check language condition if lang prop is provided
  if (lang !== undefined && language) {
    const splitLang = lang.split(',');
    shouldShow = shouldShow && splitLang.includes(language);
  }

  // Check frontend language condition if fe_lang prop is provided
  if (fe_lang !== undefined && feLanguage) {
    const splitLang = fe_lang.split(',');
    shouldShow = shouldShow && splitLang.includes(feLanguage);
  }

  // Check backend language condition if be_lang prop is provided
  if (be_lang !== undefined && beLanguage) {
    const splitLang = be_lang.split(',');
    shouldShow = shouldShow && splitLang.includes(beLanguage);
  }

  // Check if either fe or be matches (OR logic) - useful for shared requirements
  if (fe_or_be_lang !== undefined) {
    const splitLang = fe_or_be_lang.split(',');
    const feMatches = feLanguage && splitLang.includes(feLanguage);
    const beMatches = beLanguage && splitLang.includes(beLanguage);
    shouldShow = shouldShow && (feMatches || beMatches);
  }

  // Check logged in condition if loggedIn prop is provided
  if (loggedIn !== undefined && userContext.sessionState !== undefined) {
    const isSignedIn = userContext.sessionState.signedIn ?? false;
    shouldShow = shouldShow && (loggedIn ? isSignedIn : !isSignedIn);
  }

  return shouldShow ? children : null;
};

export default If;
