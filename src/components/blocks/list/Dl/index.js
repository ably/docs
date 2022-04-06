import React from 'react';
import PropTypes from 'prop-types';
import Html from '../../Html';
import styled, { css } from 'styled-components';
import { borders } from '../../../../styles';

const definitionListCell = css`
  border-bottom: ${borders.defaultBorder};
  height: 100%;
  padding: 15px 0;
`;

const StyledDl = styled.dl`
  border-top: ${borders.defaultBorder};
  display: grid;
  grid-auto-rows: minmax(min-content, max-content);
  grid-auto-flow: column;
  margin-bottom: 20px;

  div {
    display: contents;
  }
  dt {
    grid-column: 1;
    ${definitionListCell}
  }
  dd {
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
