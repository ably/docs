import styled from 'styled-components';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';
import { resetStyles } from './reset-styles';

// Unset these values inherited from AblyUI/reset.css
const StyledUl = styled.ul`
  list-style: unset;
  ${resetStyles}
`;

const Ul = GenericHtmlBlock(StyledUl);

export default Ul;
