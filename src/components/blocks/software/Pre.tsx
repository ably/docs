import React, { ReactElement } from 'react';
import Html from '../Html';
import LocalLanguageAlternatives from '../wrappers/LocalLanguageAlternatives';
import '@ably/ui/core/styles.css';

import { HtmlComponentProps } from '../../html-component-props';

type PreProps = HtmlComponentProps<'pre'> & {
  language: string;
  languages: string[];
  altData?: Record<string, string | any[] | null | undefined>;
};

const Pre = ({ data, languages, altData, attribs }: PreProps): ReactElement => {
  const withModifiedClassname = {
    ...attribs,
    className: `bg-cool-black text-white p-0 rounded-lg mb-32 relative`,
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
