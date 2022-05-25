import styled from 'styled-components';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

// Unset these values inherited from AblyUI/reset.css
const StyledUl = styled.ul`
  list-style: unset;
  margin: unset;
  padding: unset;
  padding-left: 1em;
`;

const Ul = GenericHtmlBlock(StyledUl);

export default Ul;
