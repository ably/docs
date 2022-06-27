import { compose } from 'lodash/fp';
import { fixDivsInDefinitionLists } from './fix-divs-in-definition-lists';
import { fixNewlinesInDefinitionLists } from './fix-newlines-in-definition-lists';

export const fixTextileDefinitionLists = compose(fixNewlinesInDefinitionLists, fixDivsInDefinitionLists);
