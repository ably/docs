import GenericHtmlBlock from '../Html/GenericHtmlBlock';
import styled from 'styled-components';

const StyledLi = styled.li`
  font-weight: 300;
`;

const Li = GenericHtmlBlock(StyledLi);

export default Li;
