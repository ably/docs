import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Html from '.';
import CopyLink from '../wrappers/CopyLink';
import { PageLanguageContext } from 'src/contexts';
import { childOrSelfHasLanguageMatchingPageLanguageOrDefault } from '../wrappers/language-utilities';

const LinkableHtmlBlock = (Type, marginBottom) => {
  const InnerBlock = ({ data, attribs }) => {
    const pageLanguage = useContext(PageLanguageContext);
    const shouldShowBlock = childOrSelfHasLanguageMatchingPageLanguageOrDefault(pageLanguage, data, attribs?.lang);
    if (shouldShowBlock) {
      return (
        <CopyLink attribs={attribs} marginBottom={marginBottom}>
          <Type {...attribs}>
            <Html data={data} />
          </Type>
        </CopyLink>
      );
    }
    return null;
  };
  InnerBlock.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    attribs: PropTypes.object,
  };
  return InnerBlock;
};

export default LinkableHtmlBlock;
