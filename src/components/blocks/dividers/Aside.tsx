import { HtmlComponentProps } from '../../html-component-props';
import Html from '../Html';
import Icon from '@ably/ui/core/Icon';
import { isArray } from 'lodash';
import HtmlDataTypes from '../../../../data/types/html';
import {
  inlineGridParagraph,
  inlineContentContainer,
  pitfallElement,
  leftSideElement,
  furtherReadingElement,
  noteElement,
  tipTitleElement,
} from './dividers.module.css';

const Aside = ({ data, attribs }: HtmlComponentProps<'div'>) => {
  let paddingBottom: string | false = false;
  if (isArray(data) && data[data.length - 1].name === HtmlDataTypes.ul) {
    paddingBottom = '0';
  }
  return (
    <aside className={`${inlineGridParagraph} ${attribs?.className}`}>
      {attribs && attribs[`data-type`] === `important` ? (
        <>
          <span className={`${leftSideElement} ${pitfallElement}`}>&nbsp;</span>
          <strong className={tipTitleElement}>
            <Icon name="icon-gui-warning" size="1rem" additionalCSS="mr-12" />
            <span className="mb-48">Important</span>
          </strong>
        </>
      ) : attribs && attribs[`data-type`] === `further-reading` ? (
        <>
          <span className={`${leftSideElement} ${furtherReadingElement}`}>&nbsp;</span>
          <strong className={tipTitleElement}>
            <Icon name="icon-gui-resources" size="1rem" additionalCSS="mr-12" />
            <span className="mb-48">Further Reading</span>
          </strong>
        </>
      ) : (
        <>
          <span className={`${leftSideElement} ${noteElement}`}>&nbsp;</span>
          <strong className={tipTitleElement}>
            <Icon name="icon-gui-document-generic" size="1rem" additionalCSS="mr-12" />
            <span className="mb-48">Note</span>
          </strong>
        </>
      )}

      <div className={inlineContentContainer} style={{ paddingBottom: paddingBottom || '24px' }}>
        <Html data={data} />
      </div>
    </aside>
  );
};

export default Aside;
