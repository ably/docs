import styled from 'styled-components';
import GenericHtmlBlock from '../../Html/GenericHtmlBlock';

const DefinitionListRowStyles = styled.div`
  display: block;
  min-height: 35px;
  border-bottom: 1px solid #e1e1e1;
  overflow: auto;
  padding: 15px 0;
  @media (min-width: 40em) {
    display: flex;
    padding: 0;
    width: 100%;
  }
`;

const DefinitionListRow = GenericHtmlBlock(DefinitionListRowStyles);

export default DefinitionListRow;
