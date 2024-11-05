import GenericHtmlBlock from '../Html/GenericHtmlBlock';
import PropTypes from 'prop-types';
import { HtmlComponentProps } from 'src/components/html-component-props';

const Button = ({ data, attribs }: HtmlComponentProps<'button'>) => {
  switch (attribs?.['data-variant']) {
    case 'primary-alt':
      return PriorityButton({ data, attribs });
    case 'secondary':
      return SecondaryButton({ data, attribs });
    case 'primary-inverted':
      return PrimaryButton({ data, attribs });
    case 'secondary-inverted':
      return SecondaryButton({ data, attribs });
    default:
      return PrimaryButton({ data, attribs });
  }
};

const PrimaryButton = ({ data, attribs }: HtmlComponentProps<'button'>) =>
  GenericHtmlBlock('button')({ data, attribs: { ...attribs, className: 'ui-button-primary' } });

const PriorityButton = ({ data, attribs }: HtmlComponentProps<'button'>) =>
  GenericHtmlBlock('button')({ data, attribs: { ...attribs, className: 'ui-button-priority' } });

const SecondaryButton = ({ data, attribs }: HtmlComponentProps<'button'>) =>
  GenericHtmlBlock('button')({ data, attribs: { ...attribs, className: 'ui-button-secondary' } });

Button.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  attribs: PropTypes.object,
};

export default Button;
