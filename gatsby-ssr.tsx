import React from 'react';
import type { GatsbySSR } from 'gatsby';
import { getSandpackCssText } from '@codesandbox/sandpack-react';

const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHeadComponents }) => {
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

type StyleComponent = React.ReactElement<
  {
    'data-href'?: string;
    href?: string;
  },
  'style'
>;

const isStyleComponent = (node: React.ReactNode): node is StyleComponent =>
  React.isValidElement(node) && node.type === 'style';

const getStyleHref = (node: StyleComponent): string | undefined => node.props?.['data-href'] ?? node.props?.href;

// Only Gatsby-emitted stylesheet chunks have a data-href/href; inline styles
// like Sandpack's do not, and must not be reordered or replaced.
const isExtractableStyleNode = (node: React.ReactNode): node is StyleComponent =>
  isStyleComponent(node) && getStyleHref(node) !== undefined;

const isGlobalStyleNode = (node: React.ReactNode): boolean => {
  if (!isExtractableStyleNode(node)) {
    return false;
  }
  // Heroku review apps set assetPrefix, which causes Gatsby to emit absolute
  // URLs. Normalize to a pathname so the regex matches both forms.
  try {
    const stylePathname = new URL(getStyleHref(node) ?? '', 'http://localhost').pathname;
    return /^\/styles\.[a-zA-Z0-9]+\.css$/.test(stylePathname);
  } catch {
    return false;
  }
};

/**
 * Gatsby inlines all styles from the app inside a `<style/>` tag. This makes
 * rendered HTML hostile to LLM/AI crawlers, which often bail before reaching
 * any content because of the wall of CSS at the top of the document.
 * Replacing each `<style data-href="…"/>` with a `<link rel="stylesheet"/>`
 * pointing at the same already-emitted CSS file keeps styling intact while
 * leaving the document body close to the top of the head.
 *
 * The same workaround is described in https://github.com/gatsbyjs/gatsby/issues/1526.
 *
 * Global styles sort first within the set of Gatsby-emitted stylesheet chunks
 * to preserve cascade order; non-style head components and any inline `<style>`
 * tags without a data-href/href (e.g. Sandpack) keep their original positions.
 */
const onPreRenderHTML: GatsbySSR['onPreRenderHTML'] = ({ getHeadComponents, replaceHeadComponents }) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  const headComponents = getHeadComponents();
  const sortedStyleComponents = headComponents
    .filter(isExtractableStyleNode)
    .sort((a, b) => Number(isGlobalStyleNode(b)) - Number(isGlobalStyleNode(a)));
  let sortedStyleIndex = 0;

  const transformedHeadComponents = headComponents.map((node) => {
    if (isExtractableStyleNode(node)) {
      const replacement = sortedStyleComponents[sortedStyleIndex++];
      const href = getStyleHref(replacement) as string;
      return <link key={href} href={href} rel="stylesheet" />;
    }

    return node;
  });

  replaceHeadComponents(transformedHeadComponents);
};

/**
 * Load our user state
 */
import UserContextWrapper from './src/contexts/user-context/wrap-with-provider';
const wrapRootElement = UserContextWrapper;

export { onRenderBody, onPreRenderHTML, wrapRootElement };
