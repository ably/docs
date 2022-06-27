// Essentially jQuery for parsing the DOM
import cheerio from 'cheerio';
import { defaults, pickAll } from 'lodash/fp';
import DataTypes from '../types';
import HtmlDataTypes from '../types/html';
import { duplicateLangAttributes } from './duplicate-lang-attributes';
import { liftLangAttributes } from './lift-lang-attributes';
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

const cheerioParser = (cheerioNodes: cheerio.Cheerio) => {
  const data = cheerioNodes.map(cheerioNodeParser);
  return data.toArray();
};

export const htmlParser = (content: string) => {
  const loadedDom = cheerio.load(content);
  liftLangAttributes(loadedDom);
  duplicateLangAttributes(loadedDom);
  removeParagraphsFromDefinitionListsAndMerge(loadedDom);
  const loadedDomBodyNodes = loadedDom('body').children('*');
  const parsedNodes = cheerioParser(loadedDomBodyNodes);
  return [
    {
      data: parsedNodes,
      type: DataTypes.Html,
    },
  ];
};
