import { HtmlComponentProps } from 'src/components/html-component-props';

export type AblyDocumentMeta = {
  title: string;
  meta_description: string;
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
  pathname: string;
  hash: string;
};

export type AblyPageContext = {
  contentOrderedList: HtmlComponentProps[];
  version: string;
  slug: string;
  script: string;
};

export type ProductName = 'channels' | 'spaces' | 'livesync' | 'chat' | 'asset-tracking' | 'api-reference' | 'home';

export type ProductTitle =
  | 'Channels'
  | 'Ably Spaces'
  | 'Ably LiveSync'
  | 'Ably Chat'
  | 'Ably Asset Tracking'
  | 'API References'
  | 'Home'
  | 'Ably Pub/Sub';

export type AblyTemplateData = {
  data: AblyDocumentData;
  location: Location;
  pageContext: AblyPageContext;
  currentProduct?: ProductName;
};
