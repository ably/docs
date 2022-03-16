import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import blocksFromData from '../blocks-from-data';
import { isArray } from 'lodash';
import ConditionalChildrenLanguageDisplay from '../wrappers/ConditionalChildrenLanguageDisplay';

// This is not to be used in production.
const DangerousHtml = ({ data }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(data, {
        // The SVG and Math tags have been used in the past as attack vectors for mXSS,
        // but if we really need them should be safe enough to enable.
        // This is probably too cautious but we have no need for them at time of writing, so forbidding them is free.
        FORBID_TAGS: ['svg', 'math'],
      }),
    }}
  ></div>
);

DangerousHtml.propTypes = {
  data: PropTypes.string,
};

const Html = ({ data }) =>
  isArray(data) ? (
    <ConditionalChildrenLanguageDisplay>{blocksFromData(data)}</ConditionalChildrenLanguageDisplay>
  ) : (
    <>{data}</>
  );

Html.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

export { DangerousHtml };
export default Html;
