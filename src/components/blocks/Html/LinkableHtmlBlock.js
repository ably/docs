import PropTypes from 'prop-types';
import Html from '.';
import CopyLink from '../wrappers/CopyLink';

const LinkableHtmlBlock = (Type, marginBottom, marginTop) => {
  const InnerBlock = ({ data, attribs }) => {
    const shouldShowBlock = true;
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
