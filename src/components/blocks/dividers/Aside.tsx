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

const Aside = ({ children, attribs }: AsideProps) => {
  const isVersioningInfo: boolean = Object.keys(versioningColors).includes(attribs?.[`data-type`] ?? '');

  return (
    <aside className={`${!isVersioningInfo && inlineGridParagraph} ${attribs?.className}`}>
      {attribs && attribs[`data-type`] === `important` ? (
        <>
          <span className={`${leftSideElement} ${pitfallElement}`}>&nbsp;</span>
          <strong className={tipTitleElement}>
            <Icon name="icon-gui-exclamation-triangle-micro" size="1rem" additionalCSS="mr-3" />
            <span className="ui-text-p2 font-bold text-neutral-1300 mb-12">Important</span>
          </strong>
        </>
      ) : attribs && attribs[`data-type`] === `further-reading` ? (
        <>
          <span className={`${leftSideElement} ${furtherReadingElement}`}>&nbsp;</span>
          <strong className={tipTitleElement}>
            <Icon name="icon-gui-resources" size="1rem" additionalCSS="mr-3" />
            <span className="ui-text-p2 font-bold text-neutral-1300 mb-12">Further Reading</span>
          </strong>
        </>
      ) : attribs && attribs[`data-type`] === `see-evidence` ? (
        <>
          <span className={`${leftSideElement} ${styles['see-evidence-element']}`}>&nbsp;</span>
          <strong className={tipTitleElement}>
            <span className="mr-3 text-3xl">🔎</span>
            <span className="ui-text-p2 font-bold text-neutral-1300 mb-12">See evidence</span>
          </strong>
        </>
      ) : attribs && isVersioningInfo ? (
        <>
          <span
            className={versioningTitleElement}
            style={{
              backgroundColor: versioningColors[attribs[`data-type`]].bg,
              color: versioningColors[attribs[`data-type`]].text,
            }}
          >
            {attribs[`data-type`]}
          </span>
        </>
      ) : (
        <>
          <span className={`${leftSideElement} ${noteElement}`}>&nbsp;</span>
          <strong className={tipTitleElement}>
            <Icon name="icon-gui-document-text-micro" size="1rem" additionalCSS="mr-3" />
            <span className="ui-text-p2 font-bold text-neutral-1300 mb-12">Note</span>
          </strong>
        </>
      )}

      <div
        className={isVersioningInfo ? versioningContainer : inlineContentContainer}
        style={{
          borderLeftColor: attribs && isVersioningInfo ? versioningColors[attribs[`data-type`]].bg : '',
        }}
      >
        {children}
      </div>
    </aside>
  );
};

export default Aside;
