import React, { ReactElement } from 'react';
import Html from '../Html';
import LocalLanguageAlternatives from '../wrappers/LocalLanguageAlternatives';
import '@ably/ui/core/styles.css';
import { PreProps } from './pre-props';

const Pre = ({ data, language, languages, altData, attribs }: PreProps): ReactElement => {
  const withModifiedClassname = {
    ...attribs,
    className: `bg-cool-black text-white p-0 rounded-lg border border-cool-black mb-32`,
  };
  return (
    <pre {...withModifiedClassname}>
      {languages ? (
        <LocalLanguageAlternatives languages={languages} data={altData}>
          <Html data={data} />
        </LocalLanguageAlternatives>
      ) : (
        <Html data={data} />
      )}
    </pre>
  );
};

export default Pre;
