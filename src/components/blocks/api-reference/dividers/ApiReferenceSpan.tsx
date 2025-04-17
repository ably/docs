import { HtmlComponentProps } from 'src/components/html-component-props';
import Html from '../../Html';
import { matchesLanguageOrDefault } from '../../wrappers/language-utilities';
import { useLayoutContext } from 'src/contexts/layout-context';

const ApiReferenceSpan = ({ data, attribs }: HtmlComponentProps<'span'>) => {
  const { activePage } = useLayoutContext();
  const shouldShowBlock = matchesLanguageOrDefault(activePage.language, attribs?.lang);

  return shouldShowBlock ? (
    <span {...attribs}>
      <Html data={data} />
    </span>
  ) : null;
};

export default ApiReferenceSpan;
