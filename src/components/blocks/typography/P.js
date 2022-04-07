import GenericHtmlBlock from '../Html/GenericHtmlBlock';
import '@ably/ui/core/styles.css';
import PropTypes from 'prop-types';

const Paragraph = ({ data, attribs }) => {
  switch (attribs['data-variant']) {
    case 'p1-strong':
      return P1Strong({ data, attribs });
    case 'p2':
      return P2({ data, attribs });
    case 'p2-strong':
      return P2Strong({ data, attribs });
    case 'p3':
      return P3({ data, attribs });
    case 'p3-strong':
      return P3Strong({ data, attribs });
    case 'standfirst':
      return StandFirst({ data, attribs });
    case 'title':
      return Title({ data, attribs });
    case 'quote':
      return Quote({ data, attribs });
    case 'subheader':
      return Subheader({ data, attribs });
    case 'overline1':
      return Overline1({ data, attribs });
    case 'overline2':
      return Overline2({ data, attribs });
    case 'menu-label-1':
      return MenuLabel1({ data, attribs });
    case 'menu-label-2':
      return MenuLabel2({ data, attribs });
    case 'menu-label-3':
      return MenuLabel3({ data, attribs });
    default:
      return P1({ data, attribs });
  }
};

const P1 = ({ data, attribs }) =>
  GenericHtmlBlock('p')({ data, attribs: { ...attribs, className: 'ui-text-p1 mb-32' } });

const P1Strong = ({ data, attribs }) =>
  GenericHtmlBlock('p')({ data, attribs: { ...attribs, className: 'ui-text-p1 font-medium mb-32' } });

const P2 = ({ data, attribs }) =>
  GenericHtmlBlock('p')({ data, attribs: { ...attribs, className: 'ui-text-p2 mb-24' } });

const P2Strong = ({ data, attribs }) =>
  GenericHtmlBlock('p')({ data, attribs: { ...attribs, className: 'ui-text-p2 font-medium mb-24' } });

const P3 = ({ data, attribs }) =>
  GenericHtmlBlock('p')({ data, attribs: { ...attribs, className: 'ui-text-p3 mb-24' } });

const P3Strong = ({ data, attribs }) =>
  GenericHtmlBlock('p')({ data, attribs: { ...attribs, className: 'ui-text-p3 font-medium' } });

const StandFirst = ({ data, attribs }) =>
  GenericHtmlBlock('p')({ data, attribs: { ...attribs, className: 'ui-text-standfirst mb-48 xl:mb-64' } });

const Title = ({ data, attribs }) =>
  GenericHtmlBlock('p')({ data, attribs: { ...attribs, className: 'ui-text-title mt-64 mb-40 sm:mt-80 sm:mb-40' } });

const Quote = ({ data, attribs }) =>
  GenericHtmlBlock('p')({ data, attribs: { ...attribs, className: 'ui-text-quote mb-48' } });

const Subheader = ({ data, attribs }) =>
  GenericHtmlBlock('p')({ data, attribs: { ...attribs, className: 'ui-text-sub-header mb-40' } });

const Overline1 = ({ data, attribs }) =>
  GenericHtmlBlock('p')({ data, attribs: { ...attribs, className: 'ui-text-overline1 mb-8' } });

const Overline2 = ({ data, attribs }) =>
  GenericHtmlBlock('p')({ data, attribs: { ...attribs, className: 'ui-text-overline2 mb-8' } });

const MenuLabel1 = ({ data, attribs }) =>
  GenericHtmlBlock('p')({ data, attribs: { ...attribs, className: 'ui-text-menu1' } });

const MenuLabel2 = ({ data, attribs }) =>
  GenericHtmlBlock('p')({ data, attribs: { ...attribs, className: 'ui-text-menu2' } });

const MenuLabel3 = ({ data, attribs }) =>
  GenericHtmlBlock('p')({ data, attribs: { ...attribs, className: 'ui-text-menu3' } });

Paragraph.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  attribs: PropTypes.object,
};

export default Paragraph;
