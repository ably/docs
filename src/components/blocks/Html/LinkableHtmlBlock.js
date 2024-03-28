import PropTypes from 'prop-types';
import { usePageLanguage } from 'src/contexts';
import Html from '.';
import CopyLink from '../wrappers/CopyLink';
import { childOrSelfHasLanguageMatchingPageLanguageOrDefault } from '../wrappers/language-utilities';

const LinkableHtmlBlock = (Type, marginBottom, marginTop) => {
  const InnerBlock = ({ data, attribs }) => {
    const { currentLanguage: pageLanguage } = usePageLanguage();
    const shouldShowBlock = childOrSelfHasLanguageMatchingPageLanguageOrDefault(pageLanguage, data, attribs?.lang);
    if (shouldShowBlock) {
      return (
        <CopyLink attribs={attribs} marginBottom={marginBottom} marginTop={marginTop}>
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
