import styled from 'styled-components';
import { fonts, spacing } from '../../../styles';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';

const StyledH1 = styled.h1`
  ${fonts.h1}
  margin: ${spacing.medium} 0 ${spacing.medium};
`;

const H1 = LinkableHtmlBlock(StyledH1);

export default H1;
