'use client';

import { FC, ReactNode, useEffect, useContext, useMemo } from 'react';

// Session-related scripts
import '@ably/ui/core/scripts';
import UserContext from '../../contexts/user-context';

import externalScriptInjector from 'src/external-scripts';
import { externalScriptsData } from 'lib/site-config';

type GlobalLoadingProps = {
  template: string;
  children: ReactNode;
};

const GlobalLoading: FC<GlobalLoadingProps> = ({ children, template }) => {
  const userContext = useContext(UserContext);
  const sessionState = userContext.sessionState;

  const { injectScripts, sessionTracker } = useMemo(
    () => externalScriptInjector(externalScriptsData),
    [externalScriptsData],
  );

  useEffect(() => {
    injectScripts();
  }, [injectScripts, template]);

  useEffect(() => {
    sessionTracker(sessionState);
  }, [sessionState, sessionTracker]);

  return <>{children}</>;
};

export default GlobalLoading;
