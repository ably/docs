import styled from 'styled-components';
import { fonts, spacing } from '../../../styles';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const StyledH1 = styled.h1`
  ${fonts.h1}
  margin-bottom: ${spacing.medium};
`;

const H1 = GenericHtmlBlock(StyledH1);

export { StyledH1 };
export default H1;
