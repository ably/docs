import { HtmlComponentProps } from 'src/components/html-component-props';
import Html from '../../Html';

const ApiReferenceSpan = ({ data, attribs }: HtmlComponentProps<'span'>) => {
  const shouldShowBlock = true;

  return shouldShowBlock ? (
    <span {...attribs}>
      <Html data={data} />
    </span>
  ) : null;
};

export default ApiReferenceSpan;
