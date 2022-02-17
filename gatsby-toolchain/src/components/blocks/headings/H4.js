import styled from 'styled-components';
import { fonts, spacing } from '../../../styles';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const StyledH4 = styled.h4`
    ${fonts.h4};
    margin: 40px 0 ${spacing.small};
`;

const H4 = GenericHtmlBlock(StyledH4);

export default H4;