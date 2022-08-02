import React, { ReactElement } from 'react';
import Html from '../Html';
import LocalLanguageAlternatives from '../wrappers/LocalLanguageAlternatives';
import '@ably/ui/core/styles.css';
import { PreProps } from './pre-props';

const Pre = ({ data, language, languages, altData, attribs }: PreProps): ReactElement => {
  const withModifiedClassname = {
    ...attribs,
    className: `docs-pre-container`,
  };
  return (
    <pre {...withModifiedClassname}>
      {languages ? (
        <LocalLanguageAlternatives language={language} languages={languages} data={altData}>
          <Html data={data} />
        </LocalLanguageAlternatives>
      ) : (
        <Html data={data} />
      )}
    </pre>
  );
};

export default Pre;
