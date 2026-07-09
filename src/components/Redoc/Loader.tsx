import { useEffect, useRef } from 'react';
import { scriptLoader } from '../../external-scripts/utils';
import './redoc.module.css';
import { GoTopButton } from './GoTopButton';
import { overrideMenuItemNavigation } from './utils';
import { useTheme } from 'src/contexts/theme-context';

const REDOC_SCRIPT_URL = '//cdn.redoc.ly/redoc/v2.4.0/bundles/redoc.standalone.js';

// Redoc doesn't resolve CSS custom properties in its theme object, so these are
// literal Ably neutral/gui hex values rather than var(--color-*) references.
const baseTheme = {
  spacing: {
    sectionHorizontal: 24,
    sectionVertical: 16,
  },
  typography: {
    fontSize: '1rem',
    fontFamily: 'NEXT Book, Arial, Helvetica, sans-serif',
    fontWeightRegular: 300,
    fontWeightBold: 500,
    headings: {
      fontFamily: 'NEXT Book, Arial, Helvetica, sans-serif',
      fontWeight: 500,
    },
    code: {
      fontSize: '0.875rem',
      fontWeight: 400,
      fontFamily: 'JetBrains Mono',
    },
  },
};

const lightTheme = {
  ...baseTheme,
  typography: {
    ...baseTheme.typography,
    links: { color: '#006EDC', hover: '#2894FF', visited: '#4887c2' }, // gui-*
  },
  sidebar: {
    backgroundColor: '#F4F8FB', // light grey
    textColor: '#03020D', // ably black
  },
  colors: {
    primary: { main: '#03020D' }, // ably black
  },
};

const darkTheme = {
  ...baseTheme,
  typography: {
    ...baseTheme.typography,
    links: { color: '#4da6ff', hover: '#2894ff', visited: '#80b9f2' }, // gui-*-dark
    code: { ...baseTheme.typography.code, color: '#e6eaf0', backgroundColor: '#141924' },
  },
  sidebar: {
    backgroundColor: '#141924', // neutral-1200
    textColor: '#e6eaf0', // neutral-300
    activeTextColor: '#ff5416', // orange-600
  },
  rightPanel: {
    backgroundColor: '#03020d', // neutral-1300
    textColor: '#e6eaf0', // neutral-300
  },
  colors: {
    primary: { main: '#eef1f6' }, // neutral-200
    text: { primary: '#e6eaf0', secondary: '#8992a4' }, // neutral-300 / neutral-700
    border: { dark: '#3f4555', light: '#2c3344' }, // neutral-1000 / neutral-1100
    gray: { '50': '#141924', '100': '#2c3344' }, // neutral-1200 / neutral-1100
  },
  schema: {
    nestedBackground: '#141924', // neutral-1200
  },
  codeBlock: {
    backgroundColor: '#03020d', // neutral-1300
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getRedoc = (): any =>
  typeof window !== 'undefined' ? (window as unknown as { Redoc?: unknown }).Redoc : undefined;

// Load the Redoc CDN bundle at most once across mounts and re-inits. Memoising
// the load prevents attaching a second onload handler (and a second Redoc.init)
// if the theme is toggled while the script is still downloading.
let redocScriptPromise: Promise<void> | null = null;
const loadRedoc = (): Promise<void> => {
  if (getRedoc()) {
    return Promise.resolve();
  }
  if (!redocScriptPromise) {
    redocScriptPromise = new Promise<void>((resolve) => {
      scriptLoader(document, REDOC_SCRIPT_URL, { onload: () => resolve() });
    });
  }
  return redocScriptPromise;
};

export const Loader = ({ specUrl }: { specUrl: string }) => {
  const { resolvedTheme } = useTheme();
  // overrideMenuItemNavigation attaches document/body listeners + a
  // MutationObserver and returns a disposer; hold it so each init is torn down
  // before the next (theme toggle) and on unmount, rather than accumulating.
  const cleanupRef = useRef<(() => void) | null>(null);

  // (Re-)render Redoc for the current theme. Redoc bakes the theme in at init,
  // so a theme change re-inits into a cleared container.
  useEffect(() => {
    if (typeof window === 'undefined' || !specUrl) {
      return undefined;
    }
    let cancelled = false;
    const options = {
      hideDownloadButton: true,
      scrollYOffset: 64,
      theme: resolvedTheme === 'dark' ? darkTheme : lightTheme,
    };

    void loadRedoc().then(() => {
      const Redoc = getRedoc();
      const container = document.getElementById('redoc-container');
      if (cancelled || !Redoc || !container) {
        return;
      }
      cleanupRef.current?.();
      cleanupRef.current = null;
      container.innerHTML = '';
      Redoc.init(specUrl, options, container, () => {
        cleanupRef.current = overrideMenuItemNavigation();
      });
    });

    return () => {
      cancelled = true;
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [specUrl, resolvedTheme]);

  return (
    <>
      <GoTopButton />
      {specUrl ? (
        <div id="redoc-container" className="redoc-content max-w-[100vw]"></div>
      ) : (
        <div className="ml-6 mb-5">
          Missing <span className="ui-text-code">{specUrl}</span> metadata
        </div>
      )}
    </>
  );
};
