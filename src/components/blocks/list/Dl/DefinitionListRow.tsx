import GenericHtmlBlock from '../../Html/GenericHtmlBlock';
import { definitionListRowStyles } from '../list.module.css';

const DefinitionListRow = GenericHtmlBlock('div')({
  data: null,
  attribs: { className: definitionListRowStyles },
});

export default DefinitionListRow;
