import styled from 'styled-components';
import { fonts, spacing } from '../../../styles';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';

const StyledH4 = styled.h4`
  ${fonts.h4};
  margin: ${spacing.small} 0 ${spacing.small};
`;

const H4 = LinkableHtmlBlock(StyledH4);

export default H4;
