import { FC, ReactNode, useEffect, useContext, useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

// Session-related scripts
import '@ably/ui/core/scripts';
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
            inkeepChatEnabled
            inkeepSearchEnabled
            inkeepApiKey
            insightsEnabled
            insightsDebug
            mixpanelApiKey
            mixpanelAutoCapture
            posthogApiKey
            posthogHost
            conversationsUrl
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

  return <>{children}</>;
};

export default GlobalLoading;
