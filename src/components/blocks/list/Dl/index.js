import React from 'react';
import PropTypes from 'prop-types';
import Html from '../../Html';
import styled, { css } from 'styled-components';

const definitionListBorder = `1px solid #e1e1e1`;
const definitionListCell = css`
  border-bottom: ${definitionListBorder};
  height: 100%;
  padding: 15px 0;
`;

const StyledDl = styled.dl`
  border-top: ${definitionListBorder};
  display: grid;
  grid-auto-rows: 1fr;
  grid-auto-flow: column;
  margin-bottom: 20px;

  dt {
    grid-column: 1;
    ${definitionListCell}
  }
  dd {
    border-bottom: 1px solid #e1e1e1;
    ${definitionListCell}
  }
`;

const Dl = ({ data, attribs }) => {
  return (
    <StyledDl {...attribs}>
      <Html data={data} />
    </StyledDl>
  );
};

Dl.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  attribs: PropTypes.object,
};

export default Dl;
