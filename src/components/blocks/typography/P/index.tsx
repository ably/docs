import GenericHtmlBlock from '../../Html/GenericHtmlBlock';
import '@ably/ui/core/styles.css';
import { PendingClassName } from './PendingClassName';
import { HtmlComponentProps } from '../../../html-component-props';
import { Tip } from './Tip';
import { attribsContainClass } from '../../../../clientside-data-utilities';

const Paragraph = ({ data, attribs }: HtmlComponentProps<'p'> & { attribs: { ['data-variant']: string } }) => {
  const isTip = attribsContainClass('tip', attribs);
  const BaseComponent = isTip ? Tip : GenericHtmlBlock('p');
  const ParagraphComponent = PendingClassName({ data, attribs }, BaseComponent);

  if (attribs.className && attribs.className.includes('definition')) {
    return ParagraphComponent('font-mono font-semibold text-code');
  }

  switch (attribs['data-variant']) {
    case 'p1-strong':
      return ParagraphComponent('ui-text-p1 font-medium mb-32');
    case 'p2':
      return ParagraphComponent('ui-text-p2 mb-24');
    case 'p2-strong':
      return ParagraphComponent('ui-text-p2 font-medium mb-24');
    case 'p3':
      return ParagraphComponent('ui-text-p3 mb-24');
    case 'p3-strong':
      return ParagraphComponent('ui-text-p3 font-medium');
    case 'standfirst':
      return ParagraphComponent('ui-text-standfirst mb-48 xl:mb-64');
    case 'title':
      return ParagraphComponent('ui-text-title mt-64 mb-40 sm:mt-80 sm:mb-40');
    case 'quote':
      return ParagraphComponent('ui-text-quote mb-48');
    case 'subheader':
      return ParagraphComponent('ui-text-sub-header mb-40');
    case 'overline1':
      return ParagraphComponent('ui-text-overline1 mb-8');
    case 'overline2':
      return ParagraphComponent('ui-text-overline2 mb-8');
    case 'menu-label-1':
      return ParagraphComponent('ui-text-menu1');
    case 'menu-label-2':
      return ParagraphComponent('ui-text-menu2');
    case 'menu-label-3':
      return ParagraphComponent('ui-text-menu3 ');
    default:
      return ParagraphComponent('ui-text-p2 mb-24');
  }
};

export default Paragraph;
