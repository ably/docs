import { HtmlComponentProps } from '../../html-component-props';
import Html from '../Html';
import Icon from '@ably/ui/core/Icon';
import { isArray } from 'lodash';
import HtmlDataTypes from '../../../../data/types/html';
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

const Aside = ({ data, attribs }: HtmlComponentProps<'div'>) => {
  const isVersioningInfo: boolean =
    attribs && (attribs[`data-type`] === 'new' || attribs[`data-type`] === 'updated') ? true : false;

  const versioningColors: { [key: string]: { bg: string; text: string } } = {
    new: { bg: '#FFF0BA', text: '#AC8600' },
    updated: { bg: '#FFB8F1', text: '#9C007E' },
  };

  let paddingBottom: string | false = false;
  if ((isArray(data) && data[data.length - 1].name === HtmlDataTypes.ul) || isVersioningInfo) {
    paddingBottom = '0';
  }
  return (
    <aside className={`${!isVersioningInfo && inlineGridParagraph} ${attribs?.className}`}>
      {attribs && attribs[`data-type`] === `important` ? (
        <>
          <span className={`${leftSideElement} ${pitfallElement}`}>&nbsp;</span>
          <strong className={tipTitleElement}>
            <Icon name="icon-gui-warning" size="1rem" additionalCSS="mr-12" />
            <span className="ui-text-p2 font-bold text-neutral-1300 mb-48">Important</span>
          </strong>
        </>
      ) : attribs && attribs[`data-type`] === `further-reading` ? (
        <>
          <span className={`${leftSideElement} ${furtherReadingElement}`}>&nbsp;</span>
          <strong className={tipTitleElement}>
            <Icon name="icon-gui-resources" size="1rem" additionalCSS="mr-12" />
            <span className="ui-text-p2 font-bold text-neutral-1300 mb-48">Further Reading</span>
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
            <Icon name="icon-gui-document-generic" size="1rem" additionalCSS="mr-12" />
            <span className="ui-text-p2 font-bold text-neutral-1300 mb-48">Note</span>
          </strong>
        </>
      )}

      <div
        className={isVersioningInfo ? versioningContainer : inlineContentContainer}
        style={{
          paddingBottom: paddingBottom || '24px',
          borderLeftColor: attribs && isVersioningInfo ? versioningColors[attribs[`data-type`]].bg : '',
        }}
      >
        <Html data={data} />
      </div>
    </aside>
  );
};

export default Aside;
