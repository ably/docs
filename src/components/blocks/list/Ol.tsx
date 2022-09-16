import styled from 'styled-components';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';
import { resetStyles } from './reset-styles';

const StyledOl = styled.ol`
  list-style: decimal;
  ${resetStyles}
`;

const Ol = GenericHtmlBlock(StyledOl);

export default Ol;
