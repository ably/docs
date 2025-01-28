import React from 'react';
import { getSandpackCssText } from '@codesandbox/sandpack-react';

const onRenderBody = ({ setHeadComponents }: { setHeadComponents: (components: React.ReactNode[]) => void }) => {
  const inlineScripts: React.ReactNode[] = [];

  // OneTrust consent management, inspiration taken from gatsby-google-tagmanager implementation
  if (process.env.ONE_TRUST_ENABLED === 'true' && !!process.env.ONE_TRUST_DOMAIN) {
    let domainId = process.env.ONE_TRUST_DOMAIN;

    if (process.env.ONE_TRUST_TEST === 'true') {
      domainId = `${domainId}-test`;
    }

    inlineScripts.push(
      <script
        key="one-trust-1"
        async={false}
        defer={false}
        src="https://cdn-ukwest.onetrust.com/scripttemplates/otSDKStub.js"
        data-domain-script={domainId}
      />,
    );
    inlineScripts.push(
      <script
        key="one-trust-2"
        dangerouslySetInnerHTML={{
          __html: `window.OptanonWrapper = function(){};`,
        }}
      />,
    );
  }

  // Sandpack CSS
  inlineScripts.push(
    <style
      id="sandpack"
      key="sandpack-css"
      dangerouslySetInnerHTML={{
        __html: getSandpackCssText(),
      }}
    />,
  );

  setHeadComponents(inlineScripts);
};

/**
 * Load our user state
 */
import UserContextWrapper from './src/contexts/user-context/wrap-with-provider';
const wrapRootElement = UserContextWrapper;

export { onRenderBody, wrapRootElement };
