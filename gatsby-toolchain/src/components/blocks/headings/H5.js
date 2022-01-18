import React from 'react';
import Html from '../Html';
import styled from 'styled-components';
import { fonts, spacing } from '../../../styles';

const StyledH5 = styled.h5`
    ${fonts.h5};
    margin: ${spacing.medium} 0 ${spacing.small};
`;

const H5 = ({ data, attribs }) => <StyledH5 {...attribs}><Html data={ data } /></StyledH5>;

export default H5;