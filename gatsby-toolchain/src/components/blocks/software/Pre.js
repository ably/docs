import React from 'react';
import Html from '../Html';
import LocalLanguageAlternatives from '../wrappers/LocalLanguageAlternatives';

const Pre = ({ data, language, languages, altData, attribs }) => <pre className={`mt-32 mb-0`} {...attribs}>
    { language ?
        <LocalLanguageAlternatives
            language={language}
            languages={languages}
            data={altData}>
                <Html data={ data } />
        </LocalLanguageAlternatives> :
        <Html data={ data } />
    }
</pre>;

export default Pre;