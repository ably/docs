import styled from 'styled-components';
import { borders } from '../../../styles';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const StyledTd = styled.td`
  border: ${borders.defaultBorder};
  padding: 5px;
  position: relative;
`;

const Td = GenericHtmlBlock(StyledTd);

export default Td;
