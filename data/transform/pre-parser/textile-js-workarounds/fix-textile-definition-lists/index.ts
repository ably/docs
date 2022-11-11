import { compose } from 'lodash/fp';
import { fixNewlinesInDefinitionLists } from './fix-newlines-in-definition-lists';

export const fixTextileDefinitionLists = compose(fixNewlinesInDefinitionLists);
