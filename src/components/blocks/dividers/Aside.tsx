import Icon from '@ably/ui/core/Icon';
import {
  inlineGridParagraph,
  inlineContentContainer,
  versioningContainer,
  versioningTitleElement,
  pitfallElement,
  leftSideElement,
  furtherReadingElement,
  noteElement,
  tipTitleElement,
} from './dividers.module.css';
import { PropsWithChildren } from 'react';

const versioningColors: { [key: string]: { bg: string; text: string } } = {
  new: { bg: '#FFF0BA', text: '#AC8600' },
  updated: { bg: '#FFB8F1', text: '#9C007E' },
  experimental: { bg: '#D8BCFB', text: '#460894' },
  'public-preview': { bg: '#B8E6FF', text: '#005A8C' },
};

type AsideProps = PropsWithChildren<{
  attribs: { 'data-type': string; className?: string };
}>;

const renderImportantAside = () => (
  <>
    <span className={`${leftSideElement} ${pitfallElement}`}>&nbsp;</span>
    <strong className={tipTitleElement}>
      <Icon name="icon-gui-exclamation-triangle-micro" size="1rem" additionalCSS="mr-3" />
      <span className="ui-text-p2 font-bold text-neutral-1300 mb-12">Important</span>
    </strong>
  </>
);

const renderFurtherReadingAside = () => (
  <>
    <span className={`${leftSideElement} ${furtherReadingElement}`}>&nbsp;</span>
    <strong className={tipTitleElement}>
      <Icon name="icon-gui-resources" size="1rem" additionalCSS="mr-3" />
      <span className="ui-text-p2 font-bold text-neutral-1300 mb-12">Further Reading</span>
    </strong>
  </>
);

const renderEvidenceAside = () => (
  <>
    <span className={`${leftSideElement}`} style={{ backgroundColor: '#FF5416' }}>
      &nbsp;
    </span>
    <strong className={tipTitleElement}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '12px' }}>
        <path
          d="M2 8H14M8 2L14 8L8 14"
          stroke="#FF5416"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="ui-text-p2 font-bold text-neutral-1300 mb-12">Evidence</span>
    </strong>
  </>
);

const renderVersioningAside = (attribs: { 'data-type': string; className?: string }) => (
  <span
    className={versioningTitleElement}
    style={{
      backgroundColor: versioningColors[attribs['data-type']].bg,
      color: versioningColors[attribs['data-type']].text,
    }}
  >
    {attribs['data-type']}
  </span>
);

const renderNoteAside = () => (
  <>
    <span className={`${leftSideElement} ${noteElement}`}>&nbsp;</span>
    <strong className={tipTitleElement}>
      <Icon name="icon-gui-document-text-micro" size="1rem" additionalCSS="mr-3" />
      <span className="ui-text-p2 font-bold text-neutral-1300 mb-12">Note</span>
    </strong>
  </>
);

const Aside = ({ children, attribs }: AsideProps) => {
  const dataType = attribs?.['data-type'];
  const isVersioningInfo = Boolean(dataType && Object.keys(versioningColors).includes(dataType));

  const renderAsideContent = () => {
    if (!attribs) {
      return renderNoteAside();
    }

    if (dataType === 'important') {
      return renderImportantAside();
    }
    if (dataType === 'further-reading') {
      return renderFurtherReadingAside();
    }
    if (dataType === 'evidence') {
      return renderEvidenceAside();
    }
    if (isVersioningInfo) {
      return renderVersioningAside(attribs);
    }

    return renderNoteAside();
  };

  return (
    <aside className={`${!isVersioningInfo && inlineGridParagraph} ${attribs?.className ?? ''}`}>
      {renderAsideContent()}

      <div
        className={isVersioningInfo ? versioningContainer : inlineContentContainer}
        style={{
          borderLeftColor: isVersioningInfo && dataType ? versioningColors[dataType].bg : '',
        }}
      >
        {children}
      </div>
    </aside>
  );
};

export default Aside;
