import React, { useContext } from 'react';
import { HtmlComponentProps } from 'src/components/html-component-props';
import { PageLanguageContext } from 'src/contexts';
import Html from '../../Html';
import { matchesLanguageOrDefault } from '../../wrappers/language-utilities';

const ApiReferenceSpan = ({ data, attribs }: HtmlComponentProps<'span'>) => {
  console.log(attribs?.forceDisplay);
  const pageLanguage = useContext(PageLanguageContext);
  const shouldShowBlock = attribs?.forceDisplay || matchesLanguageOrDefault(pageLanguage, attribs?.lang);

  return shouldShowBlock ? (
    <span {...attribs}>
      <Html data={data} />
    </span>
  ) : null;
};

export default ApiReferenceSpan;
