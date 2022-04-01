import styled from 'styled-components';
import { borders } from '../../../styles';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const StyledTh = styled.th`
  border: ${borders.defaultBorder};
  padding: 5px;
  background-color: #fafafa;
`;

const Th = GenericHtmlBlock(StyledTh);

export default Th;
