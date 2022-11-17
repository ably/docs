// Essentially jQuery for parsing the DOM
import cheerio from 'cheerio';
import { defaults, pickAll } from 'lodash/fp';
import DataTypes from '../types';
import HtmlDataTypes from '../types/html';
import { addAPIKeyInfoToCodeBlock } from './add-info-to-codeblocks/codeblock-api-key-info';
import { addRandomChannelInfoToCodeBlock } from './add-info-to-codeblocks/codeblock-random-channel-name';
import { duplicateLangAttributes } from './duplicate-lang-attributes';
import { liftLangAttributes } from './lift-lang-attributes';
import { removeChildrenFromPreWrappedCodeElements } from './remove-children-from-pre-wrapped-code-elements';
import { removeParagraphsFromDefinitionListsAndMerge } from './remove-paragraphs-from-definition-lists';

type Attributes = { [attr: string]: string };

type HtmlDataType = keyof typeof HtmlDataTypes;

/**
 * Data that we need to check from any cheerio element to see what to do with it
 */
type AnyCheerioElement = {
  type?: null | 'text' | 'tag' | 'script' | 'style' | 'comment';
  name: HtmlDataType;
  data: string;
  attribs?: null | Attributes;
  children: cheerio.Element[];
};

type ParsedNode = {
  data: string | ParsedNode[];
  type: typeof HtmlDataTypes.text | typeof HtmlDataTypes.tag;
  name: string;
  attribs?: null | Attributes;
};

export const cheerioNodeParser = (_i: number, node: cheerio.Element): ParsedNode => {
  const { type, name, data, attribs, children }: AnyCheerioElement = defaults(
    {
      type: null,
      name: HtmlDataTypes.text,
      data: '',
      attribs: {},
      children: [],
    },
    pickAll(['type', 'name', 'data', 'attribs', 'children'], node),
  );
  if (!type || type === HtmlDataTypes.text) {
    return {
      data,
      type: HtmlDataTypes.text,
      name: HtmlDataTypes.text,
    };
  }
  const nextItems: ParsedNode[] = children.map((data, i) => cheerioNodeParser(i, data));
  return {
    data: nextItems,
    type: HtmlDataTypes.tag,
    name: HtmlDataTypes[name] ?? DataTypes.Html,
    attribs,
  };
};

export const cheerioParser = (cheerioNodes: cheerio.Cheerio) => {
  const data = cheerioNodes.map(cheerioNodeParser);
  return data.toArray();
};

export const loadAndAlterHtml = (content: string) => {
  const loadedDom = cheerio.load(content);
  liftLangAttributes(loadedDom);
  duplicateLangAttributes(loadedDom);
  addAPIKeyInfoToCodeBlock(loadedDom);
  addRandomChannelInfoToCodeBlock(loadedDom);
  removeParagraphsFromDefinitionListsAndMerge(loadedDom);
  removeChildrenFromPreWrappedCodeElements(loadedDom);
  return loadedDom('body').children('*');
};

export const htmlParser = (content: string) => {
  const loadedDomBodyNodes = loadAndAlterHtml(content);
  const parsedNodes = cheerioParser(loadedDomBodyNodes);
  return [
    {
      data: parsedNodes,
      type: DataTypes.Html,
    },
  ];
};
