import { compose } from 'lodash/fp';
import { fixH1To6AFterDefinitionLists } from './fix-h1-6-after-definition-lists';
import { fixNewlinesInDefinitionLists } from './fix-newlines-in-definition-lists';

export const fixTextileDefinitionLists = compose(fixH1To6AFterDefinitionLists, fixNewlinesInDefinitionLists);
