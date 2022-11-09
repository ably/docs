import { HtmlComponentProps } from 'src/components/html-component-props';
import { MenuData } from 'src/components/Sidebar/RightSidebar/menu-data';

export type AblyDocumentMeta = {
  title: string;
  meta_description: string;
  languages: string[];
  redirect_from: string[];
};

export type AblyDocument = {
  meta?: AblyDocumentMeta;
};

export type Versions = FileHtmlVersionConnection;

export type AblyDocumentData = {
  document: AblyDocument;
  versions: Versions;
};

export type Location = {
  search: string;
};

export type AblyPageContext = {
  contentOrderedList: HtmlComponentProps[];
  languages: string[];
  version: string;
  contentMenu: MenuData[][];
  slug: string;
  script: string;
};

export type AblyTemplateData = {
  data: AblyDocumentData;
  location: Location;
  pageContext: AblyPageContext;
};
