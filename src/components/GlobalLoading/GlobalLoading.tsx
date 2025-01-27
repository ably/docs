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
            hubspotTrackingId
            googleTagManagerAuthToken
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
  const { googleTagManagerAuthToken, gtmPreview } = externalScriptsData;
  const { injectScripts, sessionTracker } = externalScriptInjector(externalScriptsData);

  useEffect(() => {
    if (!document.querySelector('div[data-scripts-loaded="true"]')) {
      injectScripts();
    }

    if (!document.querySelector('.ably-sprites')) {
      loadSprites(sprites);
    }
  }, [injectScripts]);

  useEffect(() => {
    sessionTracker(sessionState);
  }, [sessionState, sessionTracker]);

  return (
    <>
      {googleTagManagerAuthToken && gtmPreview && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=GTM-TZ37KKW&gtm_auth=${googleTagManagerAuthToken}&gtm_preview=${gtmPreview}&gtm_cookies_win=x`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
      )}

      {children}
    </>
  );
};

export default GlobalLoading;
