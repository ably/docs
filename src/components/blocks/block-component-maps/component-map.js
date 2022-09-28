import { curry, propOr } from 'lodash/fp';
import HtmlDataTypes from '../../../../data/types/html';
import ApiReferenceDiv from '../api-reference/dividers/ApiReferenceDiv';
import ApiReferenceSpan from '../api-reference/dividers/ApiReferenceSpan';
import { ApiReferenceBlockquote } from '../api-reference/external-references/ApiReferenceBlockquote';
import { ApiReferenceH6 } from '../api-reference/headings/ApiReferenceH6';
import ApiReferenceDd from '../api-reference/list/ApiReferenceDd';
import ApiReferenceDt from '../api-reference/list/ApiReferenceDt';
import { ApiReferenceCode } from '../api-reference/software/Code/ApiReferenceCode';
import { Button, Input, Meter, Noscript, Progress, Script, Select, Textarea } from '../complex-functionality';
import { Article, Aside, Div, Main, Section, Span } from '../dividers';
import { A, Address, Audio, Blockquote, Iframe, Img, Quote, Video } from '../external-references';
import { H1, H2, H3, H4, H5, H6, Header } from '../headings';
import { Dd, Dt, Dl, Li, Ol, Ul } from '../list';
import Wbr from '../non-semantic/Wbr';
import { Abbr, Details, Dfn, Summary, Time } from '../semantic-enhancements';
import { Code, Kbd, Output, Pre, Samp, Var } from '../software';
import { Em, Small, Strong, Sub, Sup } from '../styles';
import { Caption, Col, Colgroup, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '../table';
import { Paragraph } from '../typography';

export const IS_TEXT = null;

export const HtmlTypeComponentMap = Object.freeze({
  // text
  [HtmlDataTypes.p]: Paragraph,
  // semantic styles
  [HtmlDataTypes.strong]: Strong,
  [HtmlDataTypes.em]: Em,
  [HtmlDataTypes.small]: Small,
  [HtmlDataTypes.sub]: Sub,
  [HtmlDataTypes.sup]: Sup,
  // enhancements
  [HtmlDataTypes.abbr]: Abbr,
  [HtmlDataTypes.details]: Details,
  [HtmlDataTypes.summary]: Summary,
  [HtmlDataTypes.dfn]: Dfn,
  [HtmlDataTypes.time]: Time,
  // software-related
  [HtmlDataTypes.code]: Code,
  [HtmlDataTypes.kbd]: Kbd,
  [HtmlDataTypes.output]: Output,
  [HtmlDataTypes.pre]: Pre,
  [HtmlDataTypes.samp]: Samp,
  [HtmlDataTypes.var]: Var,
  // external references
  [HtmlDataTypes.a]: A,
  [HtmlDataTypes.iframe]: Iframe,
  [HtmlDataTypes.img]: Img,
  [HtmlDataTypes.video]: Video,
  [HtmlDataTypes.audio]: Audio,
  [HtmlDataTypes.address]: Address,
  [HtmlDataTypes.blockquote]: Blockquote,
  [HtmlDataTypes.q]: Quote,
  // headings
  [HtmlDataTypes.header]: Header,
  [HtmlDataTypes.h1]: H1,
  [HtmlDataTypes.h2]: H2,
  [HtmlDataTypes.h3]: H3,
  [HtmlDataTypes.h4]: H4,
  [HtmlDataTypes.h5]: H5,
  [HtmlDataTypes.h6]: H6,
  // tables
  [HtmlDataTypes.caption]: Caption,
  [HtmlDataTypes.colgroup]: Colgroup,
  [HtmlDataTypes.col]: Col,
  [HtmlDataTypes.table]: Table,
  [HtmlDataTypes.tbody]: Tbody,
  [HtmlDataTypes.td]: Td,
  [HtmlDataTypes.tfoot]: Tfoot,
  [HtmlDataTypes.th]: Th,
  [HtmlDataTypes.thead]: Thead,
  [HtmlDataTypes.tr]: Tr,
  // lists
  [HtmlDataTypes.dl]: Dl,
  [HtmlDataTypes.dd]: Dd,
  [HtmlDataTypes.dt]: Dt,
  [HtmlDataTypes.li]: Li,
  [HtmlDataTypes.ol]: Ol,
  [HtmlDataTypes.ul]: Ul,
  // dividers
  [HtmlDataTypes.main]: Main,
  [HtmlDataTypes.article]: Article,
  [HtmlDataTypes.section]: Section,
  [HtmlDataTypes.aside]: Aside,
  [HtmlDataTypes.span]: Span,
  [HtmlDataTypes.div]: Div,
  // complex functionality
  [HtmlDataTypes.input]: Input,
  [HtmlDataTypes.button]: Button,
  [HtmlDataTypes.meter]: Meter,
  [HtmlDataTypes.noscript]: Noscript,
  [HtmlDataTypes.progress]: Progress,
  [HtmlDataTypes.select]: Select,
  [HtmlDataTypes.textarea]: Textarea,
  // other/utility
  [HtmlDataTypes.script]: Script,
  [HtmlDataTypes.br]: null,
  [HtmlDataTypes.wbr]: Wbr,
});

const ApiReferenceHtmlTypeComponentMap = Object.freeze({
  // external references
  [HtmlDataTypes.blockquote]: ApiReferenceBlockquote,
  // headings
  [HtmlDataTypes.h6]: ApiReferenceH6,
  // software-related
  [HtmlDataTypes.code]: ApiReferenceCode,
  // lists
  [HtmlDataTypes.dd]: ApiReferenceDd,
  [HtmlDataTypes.dt]: ApiReferenceDt,
  // dividers
  [HtmlDataTypes.div]: ApiReferenceDiv,
  [HtmlDataTypes.span]: ApiReferenceSpan,
});

export const componentMap = propOr(IS_TEXT, curry.placeholder, HtmlTypeComponentMap);
export const apiReferenceComponentMap = (htmlDataType) =>
  propOr(componentMap(htmlDataType), htmlDataType, ApiReferenceHtmlTypeComponentMap);
