import React from 'react';
import styled from 'styled-components';
import { fonts, spacing } from '../../../styles';
import Html from '../Html';

const StyledH1 = styled.h1`
  ${fonts.h1}
  margin-bottom: ${spacing.medium};
`;

const H1 = ({ data, attribs }) => <StyledH1 {...attribs}><Html data={ data } /></StyledH1>;

export default H1;