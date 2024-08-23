import { scriptLoader } from '../../external-scripts/utils';
import './redoc.module.css';
import { GoTopButton } from './GoTopButton';

export const Loader = ({ specUrl }: { specUrl: string }) => {
  const redocDependencyScript = '//cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js';
  const options = {
    hideDownloadButton: true,
    scrollYOffset: 64,
    /* AblyUI variables doesn't work on this theme settings  */
    theme: {
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
        links: {
          color: '#006EDC', // gui-default
          hover: '#2894FF', // gui-hover
          visited: '#4887c2', // gui-visited
        },
        code: {
          fontSize: '0.875rem',
          fontWeight: 400,
          fontFamily: 'JetBrains Mono',
        },
      },
      sidebar: {
        backgroundColor: '#F4F8FB', // light grey
        textColor: '#03020D', // ably black
      },
      colors: {
        primary: {
          main: '#03020D', // ably black
        },
      },
    },
  };
  if (typeof window !== 'undefined') {
    scriptLoader(document, redocDependencyScript, {
      onload: () => {
        // @ts-ignore
        Redoc.init(specUrl, options, document.getElementById('redoc-container'));
      },
    });
  }
  return (
    <>
      <GoTopButton />
      {specUrl ? (
        <div id="redoc-container" className="redoc-content"></div>
      ) : (
        <div className="ml-24 mb-20">
          Missing <span className="ui-text-code">{specUrl}</span> metadata
        </div>
      )}
    </>
  );
};
