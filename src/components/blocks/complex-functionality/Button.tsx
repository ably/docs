import GenericHtmlBlock from '../Html/GenericHtmlBlock';
import PropTypes from 'prop-types';
import { HtmlComponentProps } from 'src/components/html-component-props';

const Button = ({ data, attribs }: HtmlComponentProps<'button'>) => {
  switch (attribs?.['data-variant']) {
    case 'primary-alt':
      return PrimaryAltButton({ data, attribs });
    case 'secondary':
      return SecondaryButton({ data, attribs });
    case 'primary-inverted':
      return PrimaryButtonInverted({ data, attribs });
    case 'secondary-inverted':
      return SecondaryButtonInverted({ data, attribs });
    default:
      return PrimaryButton({ data, attribs });
  }
};

const PrimaryButton = ({ data, attribs }: HtmlComponentProps<'button'>) =>
  GenericHtmlBlock('button')({ data, attribs: { ...attribs, className: 'ui-btn' } });

const PrimaryAltButton = ({ data, attribs }: HtmlComponentProps<'button'>) =>
  GenericHtmlBlock('button')({ data, attribs: { ...attribs, className: 'ui-btn-alt' } });

const SecondaryButton = ({ data, attribs }: HtmlComponentProps<'button'>) =>
  GenericHtmlBlock('button')({ data, attribs: { ...attribs, className: 'ui-btn-secondary' } });

const PrimaryButtonInverted = ({ data, attribs }: HtmlComponentProps<'button'>) =>
  GenericHtmlBlock('button')({ data, attribs: { ...attribs, className: 'ui-btn-invert' } });

const SecondaryButtonInverted = ({ data, attribs }: HtmlComponentProps<'button'>) =>
  GenericHtmlBlock('button')({ data, attribs: { ...attribs, className: 'ui-btn-secondary-invert' } });

Button.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  attribs: PropTypes.object,
};

export default Button;
