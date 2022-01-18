import React from 'react';
import Html from '../Html';
import styled from 'styled-components';
import { fonts, spacing } from '../../../styles';

const StyledH4 = styled.h4`
    ${fonts.h4};
    margin: 40px 0 ${spacing.small};
`;

const H4 = ({ data, attribs }) => <StyledH4 {...attribs}><Html data={ data } /></StyledH4>;

export default H4;