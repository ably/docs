import styled from 'styled-components';
import { fonts } from '../../../styles';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';

const StyledH3 = styled.h3`
  ${fonts.h3};
  margin: 24px 0 24px;
`;

const H3 = LinkableHtmlBlock(StyledH3);

export default H3;
