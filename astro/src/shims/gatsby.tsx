/*
 * Shim for `import ... from 'gatsby'` so the real Header/Footer/LeftSidebar
 * from the docs repo can render under Astro without modification.
 *
 * Wired via vite.resolve.alias in astro.config.mjs.
 */
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import React from 'react';

// Tagged-template no-op — `graphql\`...\`` returns a placeholder that
// `useStaticQuery` ignores (our shim returns a fixed result).
export const graphql = (strings: TemplateStringsArray, ..._values: unknown[]): string => {
  return strings.join('');
};

// Minimum-viable static query result. The Header reads
// `site.siteMetadata.externalScriptsData.{inkeepSearchEnabled,inkeepChatEnabled}`.
// LeftSidebar reads similar metadata + (real) allFile/allMdx queries we
// can't reproduce cheaply — it falls back gracefully when they're empty.
export const useStaticQuery = <T = unknown,>(_query?: unknown): T => {
  return {
    site: {
      siteMetadata: {
        title: 'Documentation | Ably Realtime',
        siteUrl: 'https://ably.com',
        externalScriptsData: {
          inkeepSearchEnabled: false,
          inkeepChatEnabled: false,
          inkeepApiKey: '',
          posthogApiKey: '',
          posthogHost: '',
          oneTrustDomain: '',
          oneTrustEnabled: false,
          announcementEnabled: false,
          gtmContainerId: '',
          hubspotTrackingId: '',
          headwayAccountId: '',
          insightsEnabled: false,
          insightsDebug: false,
          mixpanelApiKey: '',
          mixpanelAutoCapture: false,
          conversationsUrl: '',
          posthogFeedbackSurveyName: 'Docs Feedback',
        },
      },
    },
    // Leave other query shapes empty — the LeftSidebar's own queries return
    // zero results and it bails early rather than crashing.
    allFile: { nodes: [] },
    allMdx: { nodes: [] },
  } as T;
};

// Gatsby's <Link> becomes a plain anchor. Prefetching/client-routing are not
// something Astro's static output needs.
interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  activeClassName?: string;
  partiallyActive?: boolean;
  children?: ReactNode;
}

export const Link = ({ to, activeClassName: _a, partiallyActive: _p, children, ...rest }: LinkProps) => {
  return React.createElement('a', { href: to, ...rest }, children);
};

export const navigate = (to: string): void => {
  if (typeof window !== 'undefined') window.location.assign(to);
};

// Gatsby also exports these — stub for imports that don't use them.
export const withPrefix = (path: string): string => path;
export const StaticQuery = ({ render }: { render: (data: unknown) => ReactNode }) =>
  render(useStaticQuery());
export const PageProps = undefined;
export const Script = (props: { src?: string; children?: ReactNode }) =>
  React.createElement('script', { src: props.src }, props.children);
export const Slice = ({ children }: { children?: ReactNode }) =>
  React.createElement(React.Fragment, null, children);

export default {
  graphql,
  useStaticQuery,
  Link,
  navigate,
  withPrefix,
  StaticQuery,
  Script,
  Slice,
};
