import { FunctionComponent as FC, ReactNode, useEffect, useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

// Session-related scripts
import '@ably/ui/core/scripts';
import { loadSprites } from '@ably/ui/core/scripts';
import sprites from '@ably/ui/core/sprites.svg';
import UserContext from '../../contexts/user-context';

import externalScriptInjector from 'src/external-scripts';
import { GoogleTagManagerFallback } from 'src/external-scripts/google-tag-manager';

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
            hubspotTrackingId
            gtmContainerId
            gtmAuthToken
            gtmPreview
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
  const { gtmContainerId, gtmAuthToken, gtmPreview } = externalScriptsData;
  const { injectScripts, sessionTracker } = externalScriptInjector(externalScriptsData);

  useEffect(() => {
    injectScripts();

    loadSprites(sprites);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sessionTracker(sessionState);
  }, [sessionState, sessionTracker]);

  return (
    <>
      <GoogleTagManagerFallback containerId={gtmContainerId} authToken={gtmAuthToken} preview={gtmPreview} />
      {children}
    </>
  );
};

export default GlobalLoading;
