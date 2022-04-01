import styled from 'styled-components';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const StyledDt = styled.dt`
  font-weight: 700;
  margin: 0 0 10px;
  @media (min-width: 40em) {
    min-width: 120px;
    padding-right: 20px;
  }
`;

const Dt = GenericHtmlBlock(StyledDt);

export default Dt;
