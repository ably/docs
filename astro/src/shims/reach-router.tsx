/*
 * Shim for `import { useLocation, Link } from '@reach/router'`.
 * The Gatsby project aliases @reach/router to @gatsbyjs/reach-router;
 * under Astro we just read window.location.
 */
import { useEffect, useState } from 'react';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import React from 'react';

type Loc = {
  pathname: string;
  search: string;
  hash: string;
  href: string;
};

const readLocation = (): Loc => {
  if (typeof window === 'undefined') {
    return { pathname: '/', search: '', hash: '', href: '/' };
  }
  const { pathname, search, hash, href } = window.location;
  return { pathname, search, hash, href };
};

// Subscribes to popstate and pushState (via a tiny monkey-patch) so
// components re-render when navigation happens. Good enough for the chrome
// to highlight the active page.
let patched = false;
const listeners = new Set<() => void>();
const patchHistory = () => {
  if (patched || typeof window === 'undefined') return;
  patched = true;
  const notify = () => listeners.forEach((fn) => fn());
  window.addEventListener('popstate', notify);
  const origPush = window.history.pushState;
  const origReplace = window.history.replaceState;
  window.history.pushState = function patchedPush(...args) {
    const r = origPush.apply(this, args);
    notify();
    return r;
  };
  window.history.replaceState = function patchedReplace(...args) {
    const r = origReplace.apply(this, args);
    notify();
    return r;
  };
};

export const useLocation = (): Loc => {
  const [loc, setLoc] = useState<Loc>(readLocation);
  useEffect(() => {
    patchHistory();
    const update = () => setLoc(readLocation());
    listeners.add(update);
    update();
    return () => {
      listeners.delete(update);
    };
  }, []);
  return loc;
};

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children?: ReactNode;
}
export const Link = ({ to, children, ...rest }: LinkProps) =>
  React.createElement('a', { href: to, ...rest }, children);

export const navigate = (to: string): void => {
  if (typeof window !== 'undefined') window.location.assign(to);
};
