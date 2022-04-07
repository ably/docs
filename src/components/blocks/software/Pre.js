import React from 'react';
import PropType from 'prop-types';
import Html from '../Html';
import LocalLanguageAlternatives from '../wrappers/LocalLanguageAlternatives';
import '@ably/ui/core/styles.css';

const Pre = ({ data, language, languages, altData, attribs }) => {
  const withModifiedClassname = {
    ...attribs,
    className: `bg-cool-black text-white p-0 rounded-lg border border-cool-black`,
  };
  return (
    <pre {...withModifiedClassname}>
      {language ? (
        <LocalLanguageAlternatives language={language} languages={languages} data={altData}>
          <Html data={data} />
        </LocalLanguageAlternatives>
      ) : (
        <Html data={data} />
      )}
    </pre>
  );
};

Pre.propTypes = {
  data: PropType.array,
  language: PropType.string,
  languages: PropType.array,
  altData: PropType.object,
  attribs: PropType.object,
};

export default Pre;
