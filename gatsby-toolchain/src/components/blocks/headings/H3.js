import styled from 'styled-components';
import { fonts } from '../../../styles';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const StyledH3 = styled.h3`
  ${fonts.h3};
  margin: 24px 0 24px;
`;

const H3 = GenericHtmlBlock(StyledH3);

export default H3;
