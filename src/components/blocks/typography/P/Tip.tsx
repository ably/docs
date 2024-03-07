import { HtmlComponentProps } from '../../../html-component-props';
import Html from '../../Html';
import { inlineGridParagraph } from '../../list/list.module.css';
import { leftSideElement, tipTitleElement, inlineContentContainer } from '../typography.module.css';

// This needs to be set to a grid in order to render properly
export const Tip = ({ data, attribs }: HtmlComponentProps<'p'>) => (
  <div className={`${inlineGridParagraph} ${attribs?.className}`}>
    <span className={leftSideElement}>&nbsp;</span>
    <strong className={tipTitleElement}>Tip</strong>
    <p className={inlineContentContainer}>
      <Html data={data} />
    </p>
  </div>
);
