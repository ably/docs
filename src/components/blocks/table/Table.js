import styled from 'styled-components';
import { borders } from '../../../styles';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const StyledTable = styled.table`
  border: ${borders.defaultBorder};
  border-collapse: collapse;
  margin-bottom: 1em;
`;

const Table = GenericHtmlBlock(StyledTable);

export default Table;
