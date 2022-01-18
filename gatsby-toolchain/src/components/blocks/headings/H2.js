import React from 'react';
import styled from 'styled-components';
import { fonts, spacing } from '../../../styles';
import Html from '../Html';

const StyledH2 = styled.h2`
    ${fonts.h2};
    margin: ${spacing.large} 0 ${spacing.medium};
`;

const H2 = ({ data, attribs }) => <StyledH2 {...attribs}><Html data={ data } /></StyledH2>;

export default H2;