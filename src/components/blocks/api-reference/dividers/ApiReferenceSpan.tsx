import { HtmlComponentProps } from 'src/components/html-component-props';
import { usePageLanguage } from 'src/contexts';
import Html from '../../Html';
import { matchesLanguageOrDefault } from '../../wrappers/language-utilities';

const ApiReferenceSpan = ({ data, attribs }: HtmlComponentProps<'span'>) => {
  const { currentLanguage: pageLanguage } = usePageLanguage();
  const shouldShowBlock = matchesLanguageOrDefault(pageLanguage, attribs?.lang);

  return shouldShowBlock ? (
    <span {...attribs}>
      <Html data={data} />
    </span>
  ) : null;
};

export default ApiReferenceSpan;
