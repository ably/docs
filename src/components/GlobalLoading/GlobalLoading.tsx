import { FC, ReactNode, useEffect, useContext, useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

// Session-related scripts
import '@ably/ui/core/scripts';
import { loadSprites } from '@ably/ui/core/scripts';
import sprites from '@ably/ui/core/sprites.svg';
import UserContext from '../../contexts/user-context';

import externalScriptInjector from 'src/external-scripts';

type GlobalLoadingProps = {
  template: string;
  children: ReactNode;
};

const GlobalLoading: FC<GlobalLoadingProps> = ({ children, template }) => {
  const userContext = useContext(UserContext);
  const sessionState = userContext.sessionState;

  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          externalScriptsData {
            gtmContainerId
            hubspotTrackingId
            headwayAccountId
            announcementEnabled
            inkeepEnabled
            inkeepApiKey
            insightsEnabled
            insightsDebug
            mixpanelApiKey
            mixpanelAutoCapture
            posthogApiKey
            posthogHost
          }
        }
      }
    }
  `);

  const { externalScriptsData } = siteMetadata;
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

  useEffect(() => {
    if (!document.querySelector('.ably-sprites')) {
      loadSprites(sprites);
    }
  }, []);

  return <>{children}</>;
};

export default GlobalLoading;
