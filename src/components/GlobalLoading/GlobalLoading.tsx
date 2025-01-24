import { FunctionComponent as FC, ReactNode, useEffect, useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

// Session-related scripts
import '@ably/ui/core/scripts';
import { loadSprites } from '@ably/ui/core/scripts';
import sprites from '@ably/ui/core/sprites.svg';
import UserContext from '../../contexts/user-context';

import externalScriptInjector from 'src/external-scripts';

const GlobalLoading: FC<{ children: ReactNode }> = ({ children }) => {
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
            boomerangEnabled
            announcementEnabled
            oneTrustEnabled
            oneTrustDomain
            oneTrustTest
            inkeepEnabled
            inkeepApiKey
            inkeepIntegrationId
            inkeepOrganizationId
          }
        }
      }
    }
  `);

  const externalScriptsData = siteMetadata.externalScriptsData || {};
  const { injectScripts, sessionTracker } = externalScriptInjector(externalScriptsData);

  useEffect(() => {
    injectScripts();

    loadSprites(sprites);
  }, [injectScripts]);

  useEffect(() => {
    sessionTracker(sessionState);
  }, [sessionState, sessionTracker]);

  return <>{children}</>;
};

export default GlobalLoading;
