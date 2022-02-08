import React from 'react';
import Html from '../Html';
import styled from 'styled-components';
import { fonts } from '../../../styles';

const StyledH3 = styled.h3`
    ${fonts.h3};
    margin: 48px 0 24px;
`;

const H3 = ({ data, attribs }) => <StyledH3 {...attribs}><Html data={ data } /></StyledH3>;

export default H3;