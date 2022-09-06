import { curry, propOr } from 'lodash/fp';
import HtmlDataTypes from '../../../../data/types/html';
import { Blockquote } from '../external-references';
import { H6 } from '../headings';
import { componentMap } from './component-map';

export const IS_TEXT = null;

const ApiReferenceHtmlTypeComponentMap = Object.freeze({
  [HtmlDataTypes.blockquote]: Blockquote,
  // headings
  [HtmlDataTypes.h6]: H6,
});

export const apiReferenceComponentMap = (htmlDataType) =>
  propOr(componentMap(htmlDataType), curry.placeholder, ApiReferenceHtmlTypeComponentMap);
