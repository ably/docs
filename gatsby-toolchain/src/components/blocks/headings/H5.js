import styled from 'styled-components';
import { fonts, spacing } from '../../../styles';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const StyledH5 = styled.h5`
    ${fonts.h5};
    margin: ${spacing.medium} 0 ${spacing.small};
`;

const H5 = GenericHtmlBlock(StyledH5);

export default H5;