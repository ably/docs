import React from 'react';
import PropTypes from 'prop-types';
import Html from '../Html';
import styled from 'styled-components';
import { borders } from '../../../styles';
import HtmlDataTypes from '../../../../data/types/html';

const StyledTable = styled.table`
  border: ${borders.defaultBorder};
  border-collapse: collapse;
  margin-bottom: 1em;
`;

const Table = ({ data, attribs }) => (
  <StyledTable {...attribs}>
    <Html data={data.filter((item) => item.type === HtmlDataTypes.tag)} />
  </StyledTable>
);
Table.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  attribs: PropTypes.object,
};

export default Table;
