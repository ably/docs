import { matchesLanguageOrDefault } from '../../wrappers/language-utilities';
import Html from '../../Html';
import { HtmlComponentProps, HtmlComponentPropsData } from 'src/components/html-component-props';
import { isString } from 'lodash/fp';
import { useLayoutContext } from 'src/contexts/layout-context';

const DIV_CONTENTS_WHICH_SHOULD_IGNORE_NORMAL_LANGUAGE_RULES = ['dt', 'dd'];

const childExistsOfIgnoredType = (data: HtmlComponentPropsData) =>
  data && !isString(data)
    ? data.reduce((acc, curr) => {
        if (!curr.name) {
          return false;
        }
        return acc || DIV_CONTENTS_WHICH_SHOULD_IGNORE_NORMAL_LANGUAGE_RULES.includes(curr.name);
      }, false)
    : false;

const ApiReferenceDiv = ({ data, attribs }: HtmlComponentProps<'div'>) => {
  const { activePage } = useLayoutContext();
  const shouldShowBlock =
    attribs?.forcedisplay ||
    matchesLanguageOrDefault(activePage.language, attribs?.lang) ||
    childExistsOfIgnoredType(data);

  return shouldShowBlock ? (
    <div {...attribs}>
      <Html data={data} />
    </div>
  ) : null;
};

export default ApiReferenceDiv;
