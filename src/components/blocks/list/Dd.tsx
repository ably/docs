import GenericHtmlBlock from '../Html/GenericHtmlBlock';
import styled from 'styled-components';

const StyledDd = styled.dd`
  font-weight: 300;
`;

const Dd = GenericHtmlBlock(StyledDd);

export default Dd;
