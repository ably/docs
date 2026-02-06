import React, { useContext } from 'react';
import { useLayoutContext } from 'src/contexts/layout-context';
import { LanguageKey } from 'src/data/languages/types';
import UserContext from 'src/contexts/user-context';

interface IfProps {
  lang?: LanguageKey;
  client_lang?: LanguageKey;
  agent_lang?: LanguageKey;
  client_or_agent_lang?: LanguageKey;
  loggedIn?: boolean;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

const If: React.FC<IfProps> = ({ lang, client_lang, agent_lang, client_or_agent_lang, loggedIn, children }) => {
  const { activePage } = useLayoutContext();
  const { language, clientLanguage, agentLanguage } = activePage;
  const userContext = useContext(UserContext);

  let shouldShow = true;

  // Check language condition if lang prop is provided
  if (lang !== undefined && language) {
    const splitLang = lang.split(',');
    shouldShow = shouldShow && splitLang.includes(language);
  }

  // Check client language condition if client_lang prop is provided
  if (client_lang !== undefined && clientLanguage) {
    const splitLang = client_lang.split(',');
    shouldShow = shouldShow && splitLang.includes(clientLanguage);
  }

  // Check agent language condition if agent_lang prop is provided
  if (agent_lang !== undefined && agentLanguage) {
    const splitLang = agent_lang.split(',');
    shouldShow = shouldShow && splitLang.includes(agentLanguage);
  }

  // Check if either client or agent matches (OR logic) - useful for shared requirements
  if (client_or_agent_lang !== undefined) {
    const splitLang = client_or_agent_lang.split(',');
    const clientMatches = clientLanguage && splitLang.includes(clientLanguage);
    const agentMatches = agentLanguage && splitLang.includes(agentLanguage);
    shouldShow = shouldShow && (clientMatches || agentMatches);
  }

  // Check logged in condition if loggedIn prop is provided
  if (loggedIn !== undefined && userContext.sessionState !== undefined) {
    const isSignedIn = userContext.sessionState.signedIn ?? false;
    shouldShow = shouldShow && (loggedIn ? isSignedIn : !isSignedIn);
  }

  return shouldShow ? children : null;
};

export default If;
