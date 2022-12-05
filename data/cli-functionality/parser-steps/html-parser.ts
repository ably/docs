import cheerio from 'cheerio';
import { addAPIKeyInfoToCodeBlock } from '../../../data/html-parser/add-info-to-codeblocks/codeblock-api-key-info';
import { addRandomChannelInfoToCodeBlock } from '../../../data/html-parser/add-info-to-codeblocks/codeblock-random-channel-name';
import { removeChildrenFromPreWrappedCodeElements } from '../../../data/html-parser/remove-children-from-pre-wrapped-code-elements';
import { removeParagraphsFromDefinitionListsAndMerge } from '../../../data/html-parser/remove-paragraphs-from-definition-lists';
import { duplicateLangAttributes } from '../../../data/html-parser/duplicate-lang-attributes';
import { liftLangAttributes } from '../../../data/html-parser/lift-lang-attributes';
import { Step } from './pre-parser';

const loadParseAndReturnWith = (fn: (nodes: cheerio.Selector) => cheerio.Cheerio | void) => (content: string) => {
  const loadedDom = cheerio.load(content);
  fn(loadedDom);
  return loadedDom.html();
};

export const htmlParserSteps: Step[] = [
  {
    fn: loadParseAndReturnWith(liftLangAttributes),
    description:
      'Promotes <div lang> elements inside a <dt> element so that it wraps the entire <dt><dd> "row" of a <dl>',
  },
  {
    fn: loadParseAndReturnWith(duplicateLangAttributes),
    description:
      'Captures any multiple language attributes that were previously missed and duplicates them, e.g. lang="javascript,nodejs"',
  },
  {
    fn: loadParseAndReturnWith(addAPIKeyInfoToCodeBlock),
    description:
      'Adds API key info to the code element attributes, so that the React component knows to look for the API key',
  },
  {
    fn: loadParseAndReturnWith(addRandomChannelInfoToCodeBlock),
    description:
      'Adds Random Channel info to code element attributes, so that the React component knows if it should look for the channel info',
  },
  {
    fn: loadParseAndReturnWith(removeParagraphsFromDefinitionListsAndMerge),
    description:
      'Remove empty paragraphs from definition lists, then merge consecutive definition lists together into one list',
  },
  {
    fn: loadParseAndReturnWith(removeChildrenFromPreWrappedCodeElements),
    description: 'Try to get rid of child elements that should not exist in code elements wrapped in <pre> tags',
  },
];
