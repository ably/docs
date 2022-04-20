import React from 'react';
import PropTypes from 'prop-types';
import Html from '../Html';
import HtmlDataTypes from '../../../../data/types/html';

const Tbody = ({ data, attribs }) => (
  <tbody {...attribs}>
    <Html data={data.filter((item) => item.type === HtmlDataTypes.tag)} />
  </tbody>
);
Tbody.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  attribs: PropTypes.object,
};

export default Tbody;
