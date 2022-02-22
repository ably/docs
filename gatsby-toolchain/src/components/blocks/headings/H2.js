import styled from 'styled-components';
import { fonts, spacing } from '../../../styles';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const StyledH2 = styled.h2`
  ${fonts.h2};
  margin: ${spacing.large} 0 ${spacing.medium};
`;

const H2 = GenericHtmlBlock(StyledH2);

export default H2;
