import React, { useContext } from 'react';
import { useLayoutContext } from 'src/contexts/layout-context';
import { LanguageKey } from 'src/data/languages/types';
import UserContext from 'src/contexts/user-context';

interface IfProps {
  lang?: LanguageKey;
  loggedIn?: boolean;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

const If: React.FC<IfProps> = ({ lang, loggedIn, children }) => {
  const { activePage } = useLayoutContext();
  const { language } = activePage;
  const userContext = useContext(UserContext);

  let shouldShow = true;

  // Check language condition if lang prop is provided
  if (lang !== undefined && language) {
    const splitLang = lang.split(',');
    shouldShow = shouldShow && splitLang.includes(language);
  }

  // Check logged in condition if loggedIn prop is provided
  if (loggedIn !== undefined && userContext.sessionState !== undefined) {
    const isSignedIn = userContext.sessionState.signedIn ?? false;
    shouldShow = shouldShow && (loggedIn ? isSignedIn : !isSignedIn);
  }

  return shouldShow ? children : null;
};

export default If;
