import styled from 'styled-components';
import { fonts, spacing } from '../../../styles';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';

const StyledH2 = styled.h2`
  ${fonts.h2};
  margin: ${spacing.medium} 0 ${spacing.medium};
`;

const H2 = LinkableHtmlBlock(StyledH2);

export default H2;
