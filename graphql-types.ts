export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  /** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
  ID: string;
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string;
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: boolean;
  /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  Int: number;
  /** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  GatsbyImageData: any;
};

export type File = Node & {
  sourceInstanceName: Scalars['String'];
  absolutePath: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  size: Scalars['Int'];
  prettySize: Scalars['String'];
  modifiedTime: Scalars['Date'];
  accessTime: Scalars['Date'];
  changeTime: Scalars['Date'];
  birthTime: Scalars['Date'];
  root: Scalars['String'];
  dir: Scalars['String'];
  base: Scalars['String'];
  ext: Scalars['String'];
  name: Scalars['String'];
  relativeDirectory: Scalars['String'];
  dev: Scalars['Int'];
  mode: Scalars['Int'];
  nlink: Scalars['Int'];
  uid: Scalars['Int'];
  gid: Scalars['Int'];
  rdev: Scalars['Int'];
  ino: Scalars['Float'];
  atimeMs: Scalars['Float'];
  mtimeMs: Scalars['Float'];
  ctimeMs: Scalars['Float'];
  atime: Scalars['Date'];
  mtime: Scalars['Date'];
  ctime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  birthtime?: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  birthtimeMs?: Maybe<Scalars['Float']>;
  blksize?: Maybe<Scalars['Int']>;
  blocks?: Maybe<Scalars['Int']>;
  /** Copy file to static directory and return public url to it */
  publicURL?: Maybe<Scalars['String']>;
  /** Returns all children nodes filtered by type ImageSharp */
  childrenImageSharp?: Maybe<Array<Maybe<ImageSharp>>>;
  /** Returns the first child node of type ImageSharp or null if there are no children of given type on this node */
  childImageSharp?: Maybe<ImageSharp>;
  /** Returns all children nodes filtered by type PageFurnitureYaml */
  childrenPageFurnitureYaml?: Maybe<Array<Maybe<PageFurnitureYaml>>>;
  /** Returns the first child node of type PageFurnitureYaml or null if there are no children of given type on this node */
  childPageFurnitureYaml?: Maybe<PageFurnitureYaml>;
  /** Returns all children nodes filtered by type FileHtml */
  childrenFileHtml?: Maybe<Array<Maybe<FileHtml>>>;
  /** Returns the first child node of type FileHtml or null if there are no children of given type on this node */
  childFileHtml?: Maybe<FileHtml>;
  /** Returns all children nodes filtered by type PageContentYaml */
  childrenPageContentYaml?: Maybe<Array<Maybe<PageContentYaml>>>;
  /** Returns the first child node of type PageContentYaml or null if there are no children of given type on this node */
  childPageContentYaml?: Maybe<PageContentYaml>;
  /** Returns all children nodes filtered by type FileInlineToc */
  childrenFileInlineToc?: Maybe<Array<Maybe<FileInlineToc>>>;
  /** Returns the first child node of type FileInlineToc or null if there are no children of given type on this node */
  childFileInlineToc?: Maybe<FileInlineToc>;
  /** Returns all children nodes filtered by type FileHtmlPartial */
  childrenFileHtmlPartial?: Maybe<Array<Maybe<FileHtmlPartial>>>;
  /** Returns the first child node of type FileHtmlPartial or null if there are no children of given type on this node */
  childFileHtmlPartial?: Maybe<FileHtmlPartial>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type FileModifiedTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileAccessTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileChangeTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileBirthTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileAtimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileMtimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileCtimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

/** Node Interface */
export type Node = {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type Internal = {
  content?: Maybe<Scalars['String']>;
  contentDigest: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  fieldOwners?: Maybe<Array<Maybe<Scalars['String']>>>;
  ignoreType?: Maybe<Scalars['Boolean']>;
  mediaType?: Maybe<Scalars['String']>;
  owner: Scalars['String'];
  type: Scalars['String'];
};

export type Directory = Node & {
  sourceInstanceName: Scalars['String'];
  absolutePath: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  size: Scalars['Int'];
  prettySize: Scalars['String'];
  modifiedTime: Scalars['Date'];
  accessTime: Scalars['Date'];
  changeTime: Scalars['Date'];
  birthTime: Scalars['Date'];
  root: Scalars['String'];
  dir: Scalars['String'];
  base: Scalars['String'];
  ext: Scalars['String'];
  name: Scalars['String'];
  relativeDirectory: Scalars['String'];
  dev: Scalars['Int'];
  mode: Scalars['Int'];
  nlink: Scalars['Int'];
  uid: Scalars['Int'];
  gid: Scalars['Int'];
  rdev: Scalars['Int'];
  ino: Scalars['Float'];
  atimeMs: Scalars['Float'];
  mtimeMs: Scalars['Float'];
  ctimeMs: Scalars['Float'];
  atime: Scalars['Date'];
  mtime: Scalars['Date'];
  ctime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  birthtime?: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  birthtimeMs?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type DirectoryModifiedTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryAccessTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryChangeTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryBirthTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryAtimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryMtimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryCtimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type Site = Node & {
  buildTime?: Maybe<Scalars['Date']>;
  siteMetadata?: Maybe<SiteSiteMetadata>;
  port?: Maybe<Scalars['Int']>;
  host?: Maybe<Scalars['String']>;
  assetPrefix?: Maybe<Scalars['String']>;
  polyfill?: Maybe<Scalars['Boolean']>;
  pathPrefix?: Maybe<Scalars['String']>;
  jsxRuntime?: Maybe<Scalars['String']>;
  trailingSlash?: Maybe<Scalars['String']>;
  graphqlTypegen?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type SiteBuildTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type SiteSiteMetadata = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  siteUrl?: Maybe<Scalars['String']>;
};

export type SiteFunction = Node & {
  functionRoute: Scalars['String'];
  pluginName: Scalars['String'];
  originalAbsoluteFilePath: Scalars['String'];
  originalRelativeFilePath: Scalars['String'];
  relativeCompiledFilePath: Scalars['String'];
  absoluteCompiledFilePath: Scalars['String'];
  matchPath?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type SitePage = Node & {
  path: Scalars['String'];
  component: Scalars['String'];
  internalComponentName: Scalars['String'];
  componentChunkName: Scalars['String'];
  matchPath?: Maybe<Scalars['String']>;
  pageContext?: Maybe<Scalars['JSON']>;
  pluginCreator?: Maybe<SitePlugin>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type SitePlugin = Node & {
  resolve?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  nodeAPIs?: Maybe<Array<Maybe<Scalars['String']>>>;
  browserAPIs?: Maybe<Array<Maybe<Scalars['String']>>>;
  ssrAPIs?: Maybe<Array<Maybe<Scalars['String']>>>;
  pluginFilepath?: Maybe<Scalars['String']>;
  pluginOptions?: Maybe<Scalars['JSON']>;
  packageJson?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type SiteBuildMetadata = Node & {
  buildTime?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type SiteBuildMetadataBuildTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type GatsbyImageFormat =
  | 'NO_CHANGE'
  | 'AUTO'
  | 'JPG'
  | 'PNG'
  | 'WEBP'
  | 'AVIF';

export type GatsbyImageLayout =
  | 'FIXED'
  | 'FULL_WIDTH'
  | 'CONSTRAINED';

export type GatsbyImagePlaceholder =
  | 'DOMINANT_COLOR'
  | 'TRACED_SVG'
  | 'BLURRED'
  | 'NONE';

export type ImageFormat =
  | 'NO_CHANGE'
  | 'AUTO'
  | 'JPG'
  | 'PNG'
  | 'WEBP'
  | 'AVIF';

export type ImageFit =
  | 'COVER'
  | 'CONTAIN'
  | 'FILL'
  | 'INSIDE'
  | 'OUTSIDE';

export type ImageLayout =
  | 'FIXED'
  | 'FULL_WIDTH'
  | 'CONSTRAINED';

export type ImageCropFocus =
  | 'CENTER'
  | 'NORTH'
  | 'NORTHEAST'
  | 'EAST'
  | 'SOUTHEAST'
  | 'SOUTH'
  | 'SOUTHWEST'
  | 'WEST'
  | 'NORTHWEST'
  | 'ENTROPY'
  | 'ATTENTION';

export type DuotoneGradient = {
  highlight: Scalars['String'];
  shadow: Scalars['String'];
  opacity?: InputMaybe<Scalars['Int']>;
};

export type PotraceTurnPolicy =
  | 'TURNPOLICY_BLACK'
  | 'TURNPOLICY_WHITE'
  | 'TURNPOLICY_LEFT'
  | 'TURNPOLICY_RIGHT'
  | 'TURNPOLICY_MINORITY'
  | 'TURNPOLICY_MAJORITY';

export type Potrace = {
  turnPolicy?: InputMaybe<PotraceTurnPolicy>;
  turdSize?: InputMaybe<Scalars['Float']>;
  alphaMax?: InputMaybe<Scalars['Float']>;
  optCurve?: InputMaybe<Scalars['Boolean']>;
  optTolerance?: InputMaybe<Scalars['Float']>;
  threshold?: InputMaybe<Scalars['Int']>;
  blackOnWhite?: InputMaybe<Scalars['Boolean']>;
  color?: InputMaybe<Scalars['String']>;
  background?: InputMaybe<Scalars['String']>;
};

export type ImageSharp = Node & {
  fixed?: Maybe<ImageSharpFixed>;
  fluid?: Maybe<ImageSharpFluid>;
  gatsbyImageData: Scalars['GatsbyImageData'];
  original?: Maybe<ImageSharpOriginal>;
  resize?: Maybe<ImageSharpResize>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type ImageSharpFixedArgs = {
  width?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
  base64Width?: InputMaybe<Scalars['Int']>;
  jpegProgressive?: InputMaybe<Scalars['Boolean']>;
  pngCompressionSpeed?: InputMaybe<Scalars['Int']>;
  grayscale?: InputMaybe<Scalars['Boolean']>;
  duotone?: InputMaybe<DuotoneGradient>;
  traceSVG?: InputMaybe<Potrace>;
  quality?: InputMaybe<Scalars['Int']>;
  jpegQuality?: InputMaybe<Scalars['Int']>;
  pngQuality?: InputMaybe<Scalars['Int']>;
  webpQuality?: InputMaybe<Scalars['Int']>;
  toFormat?: InputMaybe<ImageFormat>;
  toFormatBase64?: InputMaybe<ImageFormat>;
  cropFocus?: InputMaybe<ImageCropFocus>;
  fit?: InputMaybe<ImageFit>;
  background?: InputMaybe<Scalars['String']>;
  rotate?: InputMaybe<Scalars['Int']>;
  trim?: InputMaybe<Scalars['Float']>;
};


export type ImageSharpFluidArgs = {
  maxWidth?: InputMaybe<Scalars['Int']>;
  maxHeight?: InputMaybe<Scalars['Int']>;
  base64Width?: InputMaybe<Scalars['Int']>;
  grayscale?: InputMaybe<Scalars['Boolean']>;
  jpegProgressive?: InputMaybe<Scalars['Boolean']>;
  pngCompressionSpeed?: InputMaybe<Scalars['Int']>;
  duotone?: InputMaybe<DuotoneGradient>;
  traceSVG?: InputMaybe<Potrace>;
  quality?: InputMaybe<Scalars['Int']>;
  jpegQuality?: InputMaybe<Scalars['Int']>;
  pngQuality?: InputMaybe<Scalars['Int']>;
  webpQuality?: InputMaybe<Scalars['Int']>;
  toFormat?: InputMaybe<ImageFormat>;
  toFormatBase64?: InputMaybe<ImageFormat>;
  cropFocus?: InputMaybe<ImageCropFocus>;
  fit?: InputMaybe<ImageFit>;
  background?: InputMaybe<Scalars['String']>;
  rotate?: InputMaybe<Scalars['Int']>;
  trim?: InputMaybe<Scalars['Float']>;
  sizes?: InputMaybe<Scalars['String']>;
  srcSetBreakpoints?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};


export type ImageSharpGatsbyImageDataArgs = {
  layout?: InputMaybe<ImageLayout>;
  width?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
  aspectRatio?: InputMaybe<Scalars['Float']>;
  placeholder?: InputMaybe<ImagePlaceholder>;
  blurredOptions?: InputMaybe<BlurredOptions>;
  tracedSVGOptions?: InputMaybe<Potrace>;
  formats?: InputMaybe<Array<InputMaybe<ImageFormat>>>;
  outputPixelDensities?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  breakpoints?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sizes?: InputMaybe<Scalars['String']>;
  quality?: InputMaybe<Scalars['Int']>;
  jpgOptions?: InputMaybe<JpgOptions>;
  pngOptions?: InputMaybe<PngOptions>;
  webpOptions?: InputMaybe<WebPOptions>;
  avifOptions?: InputMaybe<AvifOptions>;
  transformOptions?: InputMaybe<TransformOptions>;
  backgroundColor?: InputMaybe<Scalars['String']>;
};


export type ImageSharpResizeArgs = {
  width?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
  quality?: InputMaybe<Scalars['Int']>;
  jpegQuality?: InputMaybe<Scalars['Int']>;
  pngQuality?: InputMaybe<Scalars['Int']>;
  webpQuality?: InputMaybe<Scalars['Int']>;
  jpegProgressive?: InputMaybe<Scalars['Boolean']>;
  pngCompressionLevel?: InputMaybe<Scalars['Int']>;
  pngCompressionSpeed?: InputMaybe<Scalars['Int']>;
  grayscale?: InputMaybe<Scalars['Boolean']>;
  duotone?: InputMaybe<DuotoneGradient>;
  base64?: InputMaybe<Scalars['Boolean']>;
  traceSVG?: InputMaybe<Potrace>;
  toFormat?: InputMaybe<ImageFormat>;
  cropFocus?: InputMaybe<ImageCropFocus>;
  fit?: InputMaybe<ImageFit>;
  background?: InputMaybe<Scalars['String']>;
  rotate?: InputMaybe<Scalars['Int']>;
  trim?: InputMaybe<Scalars['Float']>;
};

export type ImageSharpFixed = {
  base64?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  aspectRatio?: Maybe<Scalars['Float']>;
  width: Scalars['Float'];
  height: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp?: Maybe<Scalars['String']>;
  srcSetWebp?: Maybe<Scalars['String']>;
  originalName?: Maybe<Scalars['String']>;
};

export type ImageSharpFluid = {
  base64?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  aspectRatio: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp?: Maybe<Scalars['String']>;
  srcSetWebp?: Maybe<Scalars['String']>;
  sizes: Scalars['String'];
  originalImg?: Maybe<Scalars['String']>;
  originalName?: Maybe<Scalars['String']>;
  presentationWidth: Scalars['Int'];
  presentationHeight: Scalars['Int'];
};

export type ImagePlaceholder =
  | 'DOMINANT_COLOR'
  | 'TRACED_SVG'
  | 'BLURRED'
  | 'NONE';

export type BlurredOptions = {
  /** Width of the generated low-res preview. Default is 20px */
  width?: InputMaybe<Scalars['Int']>;
  /** Force the output format for the low-res preview. Default is to use the same format as the input. You should rarely need to change this */
  toFormat?: InputMaybe<ImageFormat>;
};

export type JpgOptions = {
  quality?: InputMaybe<Scalars['Int']>;
  progressive?: InputMaybe<Scalars['Boolean']>;
};

export type PngOptions = {
  quality?: InputMaybe<Scalars['Int']>;
  compressionSpeed?: InputMaybe<Scalars['Int']>;
};

export type WebPOptions = {
  quality?: InputMaybe<Scalars['Int']>;
};

export type AvifOptions = {
  quality?: InputMaybe<Scalars['Int']>;
  lossless?: InputMaybe<Scalars['Boolean']>;
  speed?: InputMaybe<Scalars['Int']>;
};

export type TransformOptions = {
  grayscale?: InputMaybe<Scalars['Boolean']>;
  duotone?: InputMaybe<DuotoneGradient>;
  rotate?: InputMaybe<Scalars['Int']>;
  trim?: InputMaybe<Scalars['Float']>;
  cropFocus?: InputMaybe<ImageCropFocus>;
  fit?: InputMaybe<ImageFit>;
};

export type ImageSharpOriginal = {
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  src?: Maybe<Scalars['String']>;
};

export type ImageSharpResize = {
  src?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  aspectRatio?: Maybe<Scalars['Float']>;
  originalName?: Maybe<Scalars['String']>;
};

export type PageFurnitureYaml = Node & {
  label: Scalars['String'];
  link: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  items?: Maybe<Array<PageFurnitureYaml>>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type FileHtmlContentOrderedListItem = {
  data: Scalars['String'];
  type: Scalars['String'];
};

export type FileHtmlMetaData = {
  languages?: Maybe<Array<Maybe<Scalars['String']>>>;
  meta_description?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  redirect_from?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type FileHtml = Node & {
  contentOrderedList?: Maybe<Array<Maybe<FileHtmlContentOrderedListItem>>>;
  meta?: Maybe<FileHtmlMetaData>;
  articleType?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  parentSlug?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  /** Returns all children nodes filtered by type FileHtmlVersion */
  childrenFileHtmlVersion?: Maybe<Array<Maybe<FileHtmlVersion>>>;
  /** Returns the first child node of type FileHtmlVersion or null if there are no children of given type on this node */
  childFileHtmlVersion?: Maybe<FileHtmlVersion>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type Error = Node & {
  message?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type PageContentYaml = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  name?: Maybe<Scalars['String']>;
  meta?: Maybe<PageContentYamlMeta>;
  sections?: Maybe<Array<Maybe<PageContentYamlSections>>>;
};

export type PageContentYamlMeta = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
};

export type PageContentYamlSections = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  defaultCallToAction?: Maybe<Scalars['String']>;
  cards?: Maybe<Array<Maybe<PageContentYamlSectionsCards>>>;
};

export type PageContentYamlSectionsCards = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  callToAction?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  flag?: Maybe<Scalars['String']>;
};

export type FileInlineToc = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  tableOfContents?: Maybe<FileInlineTocTableOfContents>;
  slug?: Maybe<Scalars['String']>;
};

export type FileInlineTocTableOfContents = {
  content?: Maybe<Array<Maybe<FileInlineTocTableOfContentsContent>>>;
};

export type FileInlineTocTableOfContentsContent = {
  key?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<FileInlineTocTableOfContentsContentValues>>>;
};

export type FileInlineTocTableOfContentsContentValues = {
  linkTitle?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  content?: Maybe<Array<Maybe<FileInlineTocTableOfContentsContentValuesContent>>>;
};

export type FileInlineTocTableOfContentsContentValuesContent = {
  key?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<FileInlineTocTableOfContentsContentValuesContentValues>>>;
};

export type FileInlineTocTableOfContentsContentValuesContentValues = {
  linkTitle?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
};

export type FileHtmlVersion = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  parentSlug?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type FileHtmlPartial = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  articleType?: Maybe<Scalars['String']>;
  contentOrderedList?: Maybe<Array<Maybe<FileHtmlPartialContentOrderedList>>>;
  relativePath?: Maybe<Scalars['String']>;
};

export type FileHtmlPartialContentOrderedList = {
  data?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type DocumentPath = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  link?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Int']>;
};

export type Query = {
  file?: Maybe<File>;
  allFile: FileConnection;
  directory?: Maybe<Directory>;
  allDirectory: DirectoryConnection;
  site?: Maybe<Site>;
  allSite: SiteConnection;
  siteFunction?: Maybe<SiteFunction>;
  allSiteFunction: SiteFunctionConnection;
  sitePage?: Maybe<SitePage>;
  allSitePage: SitePageConnection;
  sitePlugin?: Maybe<SitePlugin>;
  allSitePlugin: SitePluginConnection;
  siteBuildMetadata?: Maybe<SiteBuildMetadata>;
  allSiteBuildMetadata: SiteBuildMetadataConnection;
  imageSharp?: Maybe<ImageSharp>;
  allImageSharp: ImageSharpConnection;
  pageFurnitureYaml?: Maybe<PageFurnitureYaml>;
  allPageFurnitureYaml: PageFurnitureYamlConnection;
  fileHtml?: Maybe<FileHtml>;
  allFileHtml: FileHtmlConnection;
  error?: Maybe<Error>;
  allError: ErrorConnection;
  pageContentYaml?: Maybe<PageContentYaml>;
  allPageContentYaml: PageContentYamlConnection;
  fileInlineToc?: Maybe<FileInlineToc>;
  allFileInlineToc: FileInlineTocConnection;
  fileHtmlVersion?: Maybe<FileHtmlVersion>;
  allFileHtmlVersion: FileHtmlVersionConnection;
  fileHtmlPartial?: Maybe<FileHtmlPartial>;
  allFileHtmlPartial: FileHtmlPartialConnection;
  documentPath?: Maybe<DocumentPath>;
  allDocumentPath: DocumentPathConnection;
};


export type QueryFileArgs = {
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>;
  absolutePath?: InputMaybe<StringQueryOperatorInput>;
  relativePath?: InputMaybe<StringQueryOperatorInput>;
  extension?: InputMaybe<StringQueryOperatorInput>;
  size?: InputMaybe<IntQueryOperatorInput>;
  prettySize?: InputMaybe<StringQueryOperatorInput>;
  modifiedTime?: InputMaybe<DateQueryOperatorInput>;
  accessTime?: InputMaybe<DateQueryOperatorInput>;
  changeTime?: InputMaybe<DateQueryOperatorInput>;
  birthTime?: InputMaybe<DateQueryOperatorInput>;
  root?: InputMaybe<StringQueryOperatorInput>;
  dir?: InputMaybe<StringQueryOperatorInput>;
  base?: InputMaybe<StringQueryOperatorInput>;
  ext?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>;
  dev?: InputMaybe<IntQueryOperatorInput>;
  mode?: InputMaybe<IntQueryOperatorInput>;
  nlink?: InputMaybe<IntQueryOperatorInput>;
  uid?: InputMaybe<IntQueryOperatorInput>;
  gid?: InputMaybe<IntQueryOperatorInput>;
  rdev?: InputMaybe<IntQueryOperatorInput>;
  ino?: InputMaybe<FloatQueryOperatorInput>;
  atimeMs?: InputMaybe<FloatQueryOperatorInput>;
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>;
  atime?: InputMaybe<DateQueryOperatorInput>;
  mtime?: InputMaybe<DateQueryOperatorInput>;
  ctime?: InputMaybe<DateQueryOperatorInput>;
  birthtime?: InputMaybe<DateQueryOperatorInput>;
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  blksize?: InputMaybe<IntQueryOperatorInput>;
  blocks?: InputMaybe<IntQueryOperatorInput>;
  publicURL?: InputMaybe<StringQueryOperatorInput>;
  childrenImageSharp?: InputMaybe<ImageSharpFilterListInput>;
  childImageSharp?: InputMaybe<ImageSharpFilterInput>;
  childrenPageFurnitureYaml?: InputMaybe<PageFurnitureYamlFilterListInput>;
  childPageFurnitureYaml?: InputMaybe<PageFurnitureYamlFilterInput>;
  childrenFileHtml?: InputMaybe<FileHtmlFilterListInput>;
  childFileHtml?: InputMaybe<FileHtmlFilterInput>;
  childrenPageContentYaml?: InputMaybe<PageContentYamlFilterListInput>;
  childPageContentYaml?: InputMaybe<PageContentYamlFilterInput>;
  childrenFileInlineToc?: InputMaybe<FileInlineTocFilterListInput>;
  childFileInlineToc?: InputMaybe<FileInlineTocFilterInput>;
  childrenFileHtmlPartial?: InputMaybe<FileHtmlPartialFilterListInput>;
  childFileHtmlPartial?: InputMaybe<FileHtmlPartialFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllFileArgs = {
  filter?: InputMaybe<FileFilterInput>;
  sort?: InputMaybe<FileSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryDirectoryArgs = {
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>;
  absolutePath?: InputMaybe<StringQueryOperatorInput>;
  relativePath?: InputMaybe<StringQueryOperatorInput>;
  extension?: InputMaybe<StringQueryOperatorInput>;
  size?: InputMaybe<IntQueryOperatorInput>;
  prettySize?: InputMaybe<StringQueryOperatorInput>;
  modifiedTime?: InputMaybe<DateQueryOperatorInput>;
  accessTime?: InputMaybe<DateQueryOperatorInput>;
  changeTime?: InputMaybe<DateQueryOperatorInput>;
  birthTime?: InputMaybe<DateQueryOperatorInput>;
  root?: InputMaybe<StringQueryOperatorInput>;
  dir?: InputMaybe<StringQueryOperatorInput>;
  base?: InputMaybe<StringQueryOperatorInput>;
  ext?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>;
  dev?: InputMaybe<IntQueryOperatorInput>;
  mode?: InputMaybe<IntQueryOperatorInput>;
  nlink?: InputMaybe<IntQueryOperatorInput>;
  uid?: InputMaybe<IntQueryOperatorInput>;
  gid?: InputMaybe<IntQueryOperatorInput>;
  rdev?: InputMaybe<IntQueryOperatorInput>;
  ino?: InputMaybe<FloatQueryOperatorInput>;
  atimeMs?: InputMaybe<FloatQueryOperatorInput>;
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>;
  atime?: InputMaybe<DateQueryOperatorInput>;
  mtime?: InputMaybe<DateQueryOperatorInput>;
  ctime?: InputMaybe<DateQueryOperatorInput>;
  birthtime?: InputMaybe<DateQueryOperatorInput>;
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllDirectoryArgs = {
  filter?: InputMaybe<DirectoryFilterInput>;
  sort?: InputMaybe<DirectorySortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerySiteArgs = {
  buildTime?: InputMaybe<DateQueryOperatorInput>;
  siteMetadata?: InputMaybe<SiteSiteMetadataFilterInput>;
  port?: InputMaybe<IntQueryOperatorInput>;
  host?: InputMaybe<StringQueryOperatorInput>;
  assetPrefix?: InputMaybe<StringQueryOperatorInput>;
  polyfill?: InputMaybe<BooleanQueryOperatorInput>;
  pathPrefix?: InputMaybe<StringQueryOperatorInput>;
  jsxRuntime?: InputMaybe<StringQueryOperatorInput>;
  trailingSlash?: InputMaybe<StringQueryOperatorInput>;
  graphqlTypegen?: InputMaybe<BooleanQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllSiteArgs = {
  filter?: InputMaybe<SiteFilterInput>;
  sort?: InputMaybe<SiteSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerySiteFunctionArgs = {
  functionRoute?: InputMaybe<StringQueryOperatorInput>;
  pluginName?: InputMaybe<StringQueryOperatorInput>;
  originalAbsoluteFilePath?: InputMaybe<StringQueryOperatorInput>;
  originalRelativeFilePath?: InputMaybe<StringQueryOperatorInput>;
  relativeCompiledFilePath?: InputMaybe<StringQueryOperatorInput>;
  absoluteCompiledFilePath?: InputMaybe<StringQueryOperatorInput>;
  matchPath?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllSiteFunctionArgs = {
  filter?: InputMaybe<SiteFunctionFilterInput>;
  sort?: InputMaybe<SiteFunctionSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerySitePageArgs = {
  path?: InputMaybe<StringQueryOperatorInput>;
  component?: InputMaybe<StringQueryOperatorInput>;
  internalComponentName?: InputMaybe<StringQueryOperatorInput>;
  componentChunkName?: InputMaybe<StringQueryOperatorInput>;
  matchPath?: InputMaybe<StringQueryOperatorInput>;
  pageContext?: InputMaybe<JsonQueryOperatorInput>;
  pluginCreator?: InputMaybe<SitePluginFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllSitePageArgs = {
  filter?: InputMaybe<SitePageFilterInput>;
  sort?: InputMaybe<SitePageSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerySitePluginArgs = {
  resolve?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  version?: InputMaybe<StringQueryOperatorInput>;
  nodeAPIs?: InputMaybe<StringQueryOperatorInput>;
  browserAPIs?: InputMaybe<StringQueryOperatorInput>;
  ssrAPIs?: InputMaybe<StringQueryOperatorInput>;
  pluginFilepath?: InputMaybe<StringQueryOperatorInput>;
  pluginOptions?: InputMaybe<JsonQueryOperatorInput>;
  packageJson?: InputMaybe<JsonQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllSitePluginArgs = {
  filter?: InputMaybe<SitePluginFilterInput>;
  sort?: InputMaybe<SitePluginSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerySiteBuildMetadataArgs = {
  buildTime?: InputMaybe<DateQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllSiteBuildMetadataArgs = {
  filter?: InputMaybe<SiteBuildMetadataFilterInput>;
  sort?: InputMaybe<SiteBuildMetadataSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryImageSharpArgs = {
  fixed?: InputMaybe<ImageSharpFixedFilterInput>;
  fluid?: InputMaybe<ImageSharpFluidFilterInput>;
  gatsbyImageData?: InputMaybe<GatsbyImageDataQueryOperatorInput>;
  original?: InputMaybe<ImageSharpOriginalFilterInput>;
  resize?: InputMaybe<ImageSharpResizeFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllImageSharpArgs = {
  filter?: InputMaybe<ImageSharpFilterInput>;
  sort?: InputMaybe<ImageSharpSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryPageFurnitureYamlArgs = {
  label?: InputMaybe<StringQueryOperatorInput>;
  link?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  level?: InputMaybe<IntQueryOperatorInput>;
  text?: InputMaybe<StringQueryOperatorInput>;
  items?: InputMaybe<PageFurnitureYamlFilterListInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllPageFurnitureYamlArgs = {
  filter?: InputMaybe<PageFurnitureYamlFilterInput>;
  sort?: InputMaybe<PageFurnitureYamlSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryFileHtmlArgs = {
  contentOrderedList?: InputMaybe<FileHtmlContentOrderedListItemFilterListInput>;
  meta?: InputMaybe<FileHtmlMetaDataFilterInput>;
  articleType?: InputMaybe<StringQueryOperatorInput>;
  slug?: InputMaybe<StringQueryOperatorInput>;
  parentSlug?: InputMaybe<StringQueryOperatorInput>;
  version?: InputMaybe<StringQueryOperatorInput>;
  childrenFileHtmlVersion?: InputMaybe<FileHtmlVersionFilterListInput>;
  childFileHtmlVersion?: InputMaybe<FileHtmlVersionFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllFileHtmlArgs = {
  filter?: InputMaybe<FileHtmlFilterInput>;
  sort?: InputMaybe<FileHtmlSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryErrorArgs = {
  message?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllErrorArgs = {
  filter?: InputMaybe<ErrorFilterInput>;
  sort?: InputMaybe<ErrorSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryPageContentYamlArgs = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  meta?: InputMaybe<PageContentYamlMetaFilterInput>;
  sections?: InputMaybe<PageContentYamlSectionsFilterListInput>;
};


export type QueryAllPageContentYamlArgs = {
  filter?: InputMaybe<PageContentYamlFilterInput>;
  sort?: InputMaybe<PageContentYamlSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryFileInlineTocArgs = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  tableOfContents?: InputMaybe<FileInlineTocTableOfContentsFilterInput>;
  slug?: InputMaybe<StringQueryOperatorInput>;
};


export type QueryAllFileInlineTocArgs = {
  filter?: InputMaybe<FileInlineTocFilterInput>;
  sort?: InputMaybe<FileInlineTocSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryFileHtmlVersionArgs = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  parentSlug?: InputMaybe<StringQueryOperatorInput>;
  slug?: InputMaybe<StringQueryOperatorInput>;
  version?: InputMaybe<StringQueryOperatorInput>;
};


export type QueryAllFileHtmlVersionArgs = {
  filter?: InputMaybe<FileHtmlVersionFilterInput>;
  sort?: InputMaybe<FileHtmlVersionSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryFileHtmlPartialArgs = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  articleType?: InputMaybe<StringQueryOperatorInput>;
  contentOrderedList?: InputMaybe<FileHtmlPartialContentOrderedListFilterListInput>;
  relativePath?: InputMaybe<StringQueryOperatorInput>;
};


export type QueryAllFileHtmlPartialArgs = {
  filter?: InputMaybe<FileHtmlPartialFilterInput>;
  sort?: InputMaybe<FileHtmlPartialSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryDocumentPathArgs = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  link?: InputMaybe<StringQueryOperatorInput>;
  label?: InputMaybe<StringQueryOperatorInput>;
  level?: InputMaybe<IntQueryOperatorInput>;
};


export type QueryAllDocumentPathArgs = {
  filter?: InputMaybe<DocumentPathFilterInput>;
  sort?: InputMaybe<DocumentPathSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type StringQueryOperatorInput = {
  eq?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  regex?: InputMaybe<Scalars['String']>;
  glob?: InputMaybe<Scalars['String']>;
};

export type IntQueryOperatorInput = {
  eq?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type DateQueryOperatorInput = {
  eq?: InputMaybe<Scalars['Date']>;
  ne?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
};

export type FloatQueryOperatorInput = {
  eq?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

export type ImageSharpFilterListInput = {
  elemMatch?: InputMaybe<ImageSharpFilterInput>;
};

export type ImageSharpFilterInput = {
  fixed?: InputMaybe<ImageSharpFixedFilterInput>;
  fluid?: InputMaybe<ImageSharpFluidFilterInput>;
  gatsbyImageData?: InputMaybe<GatsbyImageDataQueryOperatorInput>;
  original?: InputMaybe<ImageSharpOriginalFilterInput>;
  resize?: InputMaybe<ImageSharpResizeFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type ImageSharpFixedFilterInput = {
  base64?: InputMaybe<StringQueryOperatorInput>;
  tracedSVG?: InputMaybe<StringQueryOperatorInput>;
  aspectRatio?: InputMaybe<FloatQueryOperatorInput>;
  width?: InputMaybe<FloatQueryOperatorInput>;
  height?: InputMaybe<FloatQueryOperatorInput>;
  src?: InputMaybe<StringQueryOperatorInput>;
  srcSet?: InputMaybe<StringQueryOperatorInput>;
  srcWebp?: InputMaybe<StringQueryOperatorInput>;
  srcSetWebp?: InputMaybe<StringQueryOperatorInput>;
  originalName?: InputMaybe<StringQueryOperatorInput>;
};

export type ImageSharpFluidFilterInput = {
  base64?: InputMaybe<StringQueryOperatorInput>;
  tracedSVG?: InputMaybe<StringQueryOperatorInput>;
  aspectRatio?: InputMaybe<FloatQueryOperatorInput>;
  src?: InputMaybe<StringQueryOperatorInput>;
  srcSet?: InputMaybe<StringQueryOperatorInput>;
  srcWebp?: InputMaybe<StringQueryOperatorInput>;
  srcSetWebp?: InputMaybe<StringQueryOperatorInput>;
  sizes?: InputMaybe<StringQueryOperatorInput>;
  originalImg?: InputMaybe<StringQueryOperatorInput>;
  originalName?: InputMaybe<StringQueryOperatorInput>;
  presentationWidth?: InputMaybe<IntQueryOperatorInput>;
  presentationHeight?: InputMaybe<IntQueryOperatorInput>;
};

export type GatsbyImageDataQueryOperatorInput = {
  eq?: InputMaybe<Scalars['GatsbyImageData']>;
  ne?: InputMaybe<Scalars['GatsbyImageData']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['GatsbyImageData']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['GatsbyImageData']>>>;
};

export type ImageSharpOriginalFilterInput = {
  width?: InputMaybe<FloatQueryOperatorInput>;
  height?: InputMaybe<FloatQueryOperatorInput>;
  src?: InputMaybe<StringQueryOperatorInput>;
};

export type ImageSharpResizeFilterInput = {
  src?: InputMaybe<StringQueryOperatorInput>;
  tracedSVG?: InputMaybe<StringQueryOperatorInput>;
  width?: InputMaybe<IntQueryOperatorInput>;
  height?: InputMaybe<IntQueryOperatorInput>;
  aspectRatio?: InputMaybe<FloatQueryOperatorInput>;
  originalName?: InputMaybe<StringQueryOperatorInput>;
};

export type NodeFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type NodeFilterListInput = {
  elemMatch?: InputMaybe<NodeFilterInput>;
};

export type InternalFilterInput = {
  content?: InputMaybe<StringQueryOperatorInput>;
  contentDigest?: InputMaybe<StringQueryOperatorInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  fieldOwners?: InputMaybe<StringQueryOperatorInput>;
  ignoreType?: InputMaybe<BooleanQueryOperatorInput>;
  mediaType?: InputMaybe<StringQueryOperatorInput>;
  owner?: InputMaybe<StringQueryOperatorInput>;
  type?: InputMaybe<StringQueryOperatorInput>;
};

export type BooleanQueryOperatorInput = {
  eq?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
};

export type PageFurnitureYamlFilterListInput = {
  elemMatch?: InputMaybe<PageFurnitureYamlFilterInput>;
};

export type PageFurnitureYamlFilterInput = {
  label?: InputMaybe<StringQueryOperatorInput>;
  link?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  level?: InputMaybe<IntQueryOperatorInput>;
  text?: InputMaybe<StringQueryOperatorInput>;
  items?: InputMaybe<PageFurnitureYamlFilterListInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type FileHtmlFilterListInput = {
  elemMatch?: InputMaybe<FileHtmlFilterInput>;
};

export type FileHtmlFilterInput = {
  contentOrderedList?: InputMaybe<FileHtmlContentOrderedListItemFilterListInput>;
  meta?: InputMaybe<FileHtmlMetaDataFilterInput>;
  articleType?: InputMaybe<StringQueryOperatorInput>;
  slug?: InputMaybe<StringQueryOperatorInput>;
  parentSlug?: InputMaybe<StringQueryOperatorInput>;
  version?: InputMaybe<StringQueryOperatorInput>;
  childrenFileHtmlVersion?: InputMaybe<FileHtmlVersionFilterListInput>;
  childFileHtmlVersion?: InputMaybe<FileHtmlVersionFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type FileHtmlContentOrderedListItemFilterListInput = {
  elemMatch?: InputMaybe<FileHtmlContentOrderedListItemFilterInput>;
};

export type FileHtmlContentOrderedListItemFilterInput = {
  data?: InputMaybe<StringQueryOperatorInput>;
  type?: InputMaybe<StringQueryOperatorInput>;
};

export type FileHtmlMetaDataFilterInput = {
  languages?: InputMaybe<StringQueryOperatorInput>;
  meta_description?: InputMaybe<StringQueryOperatorInput>;
  title?: InputMaybe<StringQueryOperatorInput>;
  redirect_from?: InputMaybe<StringQueryOperatorInput>;
};

export type FileHtmlVersionFilterListInput = {
  elemMatch?: InputMaybe<FileHtmlVersionFilterInput>;
};

export type FileHtmlVersionFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  parentSlug?: InputMaybe<StringQueryOperatorInput>;
  slug?: InputMaybe<StringQueryOperatorInput>;
  version?: InputMaybe<StringQueryOperatorInput>;
};

export type PageContentYamlFilterListInput = {
  elemMatch?: InputMaybe<PageContentYamlFilterInput>;
};

export type PageContentYamlFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  meta?: InputMaybe<PageContentYamlMetaFilterInput>;
  sections?: InputMaybe<PageContentYamlSectionsFilterListInput>;
};

export type PageContentYamlMetaFilterInput = {
  title?: InputMaybe<StringQueryOperatorInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  image?: InputMaybe<StringQueryOperatorInput>;
  twitter?: InputMaybe<StringQueryOperatorInput>;
};

export type PageContentYamlSectionsFilterListInput = {
  elemMatch?: InputMaybe<PageContentYamlSectionsFilterInput>;
};

export type PageContentYamlSectionsFilterInput = {
  title?: InputMaybe<StringQueryOperatorInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  level?: InputMaybe<StringQueryOperatorInput>;
  defaultCallToAction?: InputMaybe<StringQueryOperatorInput>;
  cards?: InputMaybe<PageContentYamlSectionsCardsFilterListInput>;
};

export type PageContentYamlSectionsCardsFilterListInput = {
  elemMatch?: InputMaybe<PageContentYamlSectionsCardsFilterInput>;
};

export type PageContentYamlSectionsCardsFilterInput = {
  title?: InputMaybe<StringQueryOperatorInput>;
  content?: InputMaybe<StringQueryOperatorInput>;
  callToAction?: InputMaybe<StringQueryOperatorInput>;
  link?: InputMaybe<StringQueryOperatorInput>;
  flag?: InputMaybe<StringQueryOperatorInput>;
};

export type FileInlineTocFilterListInput = {
  elemMatch?: InputMaybe<FileInlineTocFilterInput>;
};

export type FileInlineTocFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  tableOfContents?: InputMaybe<FileInlineTocTableOfContentsFilterInput>;
  slug?: InputMaybe<StringQueryOperatorInput>;
};

export type FileInlineTocTableOfContentsFilterInput = {
  content?: InputMaybe<FileInlineTocTableOfContentsContentFilterListInput>;
};

export type FileInlineTocTableOfContentsContentFilterListInput = {
  elemMatch?: InputMaybe<FileInlineTocTableOfContentsContentFilterInput>;
};

export type FileInlineTocTableOfContentsContentFilterInput = {
  key?: InputMaybe<StringQueryOperatorInput>;
  values?: InputMaybe<FileInlineTocTableOfContentsContentValuesFilterListInput>;
};

export type FileInlineTocTableOfContentsContentValuesFilterListInput = {
  elemMatch?: InputMaybe<FileInlineTocTableOfContentsContentValuesFilterInput>;
};

export type FileInlineTocTableOfContentsContentValuesFilterInput = {
  linkTitle?: InputMaybe<StringQueryOperatorInput>;
  link?: InputMaybe<StringQueryOperatorInput>;
  content?: InputMaybe<FileInlineTocTableOfContentsContentValuesContentFilterListInput>;
};

export type FileInlineTocTableOfContentsContentValuesContentFilterListInput = {
  elemMatch?: InputMaybe<FileInlineTocTableOfContentsContentValuesContentFilterInput>;
};

export type FileInlineTocTableOfContentsContentValuesContentFilterInput = {
  key?: InputMaybe<StringQueryOperatorInput>;
  values?: InputMaybe<FileInlineTocTableOfContentsContentValuesContentValuesFilterListInput>;
};

export type FileInlineTocTableOfContentsContentValuesContentValuesFilterListInput = {
  elemMatch?: InputMaybe<FileInlineTocTableOfContentsContentValuesContentValuesFilterInput>;
};

export type FileInlineTocTableOfContentsContentValuesContentValuesFilterInput = {
  linkTitle?: InputMaybe<StringQueryOperatorInput>;
  link?: InputMaybe<StringQueryOperatorInput>;
};

export type FileHtmlPartialFilterListInput = {
  elemMatch?: InputMaybe<FileHtmlPartialFilterInput>;
};

export type FileHtmlPartialFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  articleType?: InputMaybe<StringQueryOperatorInput>;
  contentOrderedList?: InputMaybe<FileHtmlPartialContentOrderedListFilterListInput>;
  relativePath?: InputMaybe<StringQueryOperatorInput>;
};

export type FileHtmlPartialContentOrderedListFilterListInput = {
  elemMatch?: InputMaybe<FileHtmlPartialContentOrderedListFilterInput>;
};

export type FileHtmlPartialContentOrderedListFilterInput = {
  data?: InputMaybe<StringQueryOperatorInput>;
  type?: InputMaybe<StringQueryOperatorInput>;
};

export type FileConnection = {
  totalCount: Scalars['Int'];
  edges: Array<FileEdge>;
  nodes: Array<File>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<FileGroupConnection>;
};


export type FileConnectionDistinctArgs = {
  field: FileFieldsEnum;
};


export type FileConnectionMaxArgs = {
  field: FileFieldsEnum;
};


export type FileConnectionMinArgs = {
  field: FileFieldsEnum;
};


export type FileConnectionSumArgs = {
  field: FileFieldsEnum;
};


export type FileConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: FileFieldsEnum;
};

export type FileEdge = {
  next?: Maybe<File>;
  node: File;
  previous?: Maybe<File>;
};

export type PageInfo = {
  currentPage: Scalars['Int'];
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  itemCount: Scalars['Int'];
  pageCount: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type FileFieldsEnum =
  | 'sourceInstanceName'
  | 'absolutePath'
  | 'relativePath'
  | 'extension'
  | 'size'
  | 'prettySize'
  | 'modifiedTime'
  | 'accessTime'
  | 'changeTime'
  | 'birthTime'
  | 'root'
  | 'dir'
  | 'base'
  | 'ext'
  | 'name'
  | 'relativeDirectory'
  | 'dev'
  | 'mode'
  | 'nlink'
  | 'uid'
  | 'gid'
  | 'rdev'
  | 'ino'
  | 'atimeMs'
  | 'mtimeMs'
  | 'ctimeMs'
  | 'atime'
  | 'mtime'
  | 'ctime'
  | 'birthtime'
  | 'birthtimeMs'
  | 'blksize'
  | 'blocks'
  | 'publicURL'
  | 'childrenImageSharp'
  | 'childrenImageSharp___fixed___base64'
  | 'childrenImageSharp___fixed___tracedSVG'
  | 'childrenImageSharp___fixed___aspectRatio'
  | 'childrenImageSharp___fixed___width'
  | 'childrenImageSharp___fixed___height'
  | 'childrenImageSharp___fixed___src'
  | 'childrenImageSharp___fixed___srcSet'
  | 'childrenImageSharp___fixed___srcWebp'
  | 'childrenImageSharp___fixed___srcSetWebp'
  | 'childrenImageSharp___fixed___originalName'
  | 'childrenImageSharp___fluid___base64'
  | 'childrenImageSharp___fluid___tracedSVG'
  | 'childrenImageSharp___fluid___aspectRatio'
  | 'childrenImageSharp___fluid___src'
  | 'childrenImageSharp___fluid___srcSet'
  | 'childrenImageSharp___fluid___srcWebp'
  | 'childrenImageSharp___fluid___srcSetWebp'
  | 'childrenImageSharp___fluid___sizes'
  | 'childrenImageSharp___fluid___originalImg'
  | 'childrenImageSharp___fluid___originalName'
  | 'childrenImageSharp___fluid___presentationWidth'
  | 'childrenImageSharp___fluid___presentationHeight'
  | 'childrenImageSharp___gatsbyImageData'
  | 'childrenImageSharp___original___width'
  | 'childrenImageSharp___original___height'
  | 'childrenImageSharp___original___src'
  | 'childrenImageSharp___resize___src'
  | 'childrenImageSharp___resize___tracedSVG'
  | 'childrenImageSharp___resize___width'
  | 'childrenImageSharp___resize___height'
  | 'childrenImageSharp___resize___aspectRatio'
  | 'childrenImageSharp___resize___originalName'
  | 'childrenImageSharp___id'
  | 'childrenImageSharp___parent___id'
  | 'childrenImageSharp___parent___parent___id'
  | 'childrenImageSharp___parent___parent___children'
  | 'childrenImageSharp___parent___children'
  | 'childrenImageSharp___parent___children___id'
  | 'childrenImageSharp___parent___children___children'
  | 'childrenImageSharp___parent___internal___content'
  | 'childrenImageSharp___parent___internal___contentDigest'
  | 'childrenImageSharp___parent___internal___description'
  | 'childrenImageSharp___parent___internal___fieldOwners'
  | 'childrenImageSharp___parent___internal___ignoreType'
  | 'childrenImageSharp___parent___internal___mediaType'
  | 'childrenImageSharp___parent___internal___owner'
  | 'childrenImageSharp___parent___internal___type'
  | 'childrenImageSharp___children'
  | 'childrenImageSharp___children___id'
  | 'childrenImageSharp___children___parent___id'
  | 'childrenImageSharp___children___parent___children'
  | 'childrenImageSharp___children___children'
  | 'childrenImageSharp___children___children___id'
  | 'childrenImageSharp___children___children___children'
  | 'childrenImageSharp___children___internal___content'
  | 'childrenImageSharp___children___internal___contentDigest'
  | 'childrenImageSharp___children___internal___description'
  | 'childrenImageSharp___children___internal___fieldOwners'
  | 'childrenImageSharp___children___internal___ignoreType'
  | 'childrenImageSharp___children___internal___mediaType'
  | 'childrenImageSharp___children___internal___owner'
  | 'childrenImageSharp___children___internal___type'
  | 'childrenImageSharp___internal___content'
  | 'childrenImageSharp___internal___contentDigest'
  | 'childrenImageSharp___internal___description'
  | 'childrenImageSharp___internal___fieldOwners'
  | 'childrenImageSharp___internal___ignoreType'
  | 'childrenImageSharp___internal___mediaType'
  | 'childrenImageSharp___internal___owner'
  | 'childrenImageSharp___internal___type'
  | 'childImageSharp___fixed___base64'
  | 'childImageSharp___fixed___tracedSVG'
  | 'childImageSharp___fixed___aspectRatio'
  | 'childImageSharp___fixed___width'
  | 'childImageSharp___fixed___height'
  | 'childImageSharp___fixed___src'
  | 'childImageSharp___fixed___srcSet'
  | 'childImageSharp___fixed___srcWebp'
  | 'childImageSharp___fixed___srcSetWebp'
  | 'childImageSharp___fixed___originalName'
  | 'childImageSharp___fluid___base64'
  | 'childImageSharp___fluid___tracedSVG'
  | 'childImageSharp___fluid___aspectRatio'
  | 'childImageSharp___fluid___src'
  | 'childImageSharp___fluid___srcSet'
  | 'childImageSharp___fluid___srcWebp'
  | 'childImageSharp___fluid___srcSetWebp'
  | 'childImageSharp___fluid___sizes'
  | 'childImageSharp___fluid___originalImg'
  | 'childImageSharp___fluid___originalName'
  | 'childImageSharp___fluid___presentationWidth'
  | 'childImageSharp___fluid___presentationHeight'
  | 'childImageSharp___gatsbyImageData'
  | 'childImageSharp___original___width'
  | 'childImageSharp___original___height'
  | 'childImageSharp___original___src'
  | 'childImageSharp___resize___src'
  | 'childImageSharp___resize___tracedSVG'
  | 'childImageSharp___resize___width'
  | 'childImageSharp___resize___height'
  | 'childImageSharp___resize___aspectRatio'
  | 'childImageSharp___resize___originalName'
  | 'childImageSharp___id'
  | 'childImageSharp___parent___id'
  | 'childImageSharp___parent___parent___id'
  | 'childImageSharp___parent___parent___children'
  | 'childImageSharp___parent___children'
  | 'childImageSharp___parent___children___id'
  | 'childImageSharp___parent___children___children'
  | 'childImageSharp___parent___internal___content'
  | 'childImageSharp___parent___internal___contentDigest'
  | 'childImageSharp___parent___internal___description'
  | 'childImageSharp___parent___internal___fieldOwners'
  | 'childImageSharp___parent___internal___ignoreType'
  | 'childImageSharp___parent___internal___mediaType'
  | 'childImageSharp___parent___internal___owner'
  | 'childImageSharp___parent___internal___type'
  | 'childImageSharp___children'
  | 'childImageSharp___children___id'
  | 'childImageSharp___children___parent___id'
  | 'childImageSharp___children___parent___children'
  | 'childImageSharp___children___children'
  | 'childImageSharp___children___children___id'
  | 'childImageSharp___children___children___children'
  | 'childImageSharp___children___internal___content'
  | 'childImageSharp___children___internal___contentDigest'
  | 'childImageSharp___children___internal___description'
  | 'childImageSharp___children___internal___fieldOwners'
  | 'childImageSharp___children___internal___ignoreType'
  | 'childImageSharp___children___internal___mediaType'
  | 'childImageSharp___children___internal___owner'
  | 'childImageSharp___children___internal___type'
  | 'childImageSharp___internal___content'
  | 'childImageSharp___internal___contentDigest'
  | 'childImageSharp___internal___description'
  | 'childImageSharp___internal___fieldOwners'
  | 'childImageSharp___internal___ignoreType'
  | 'childImageSharp___internal___mediaType'
  | 'childImageSharp___internal___owner'
  | 'childImageSharp___internal___type'
  | 'childrenPageFurnitureYaml'
  | 'childrenPageFurnitureYaml___label'
  | 'childrenPageFurnitureYaml___link'
  | 'childrenPageFurnitureYaml___name'
  | 'childrenPageFurnitureYaml___level'
  | 'childrenPageFurnitureYaml___text'
  | 'childrenPageFurnitureYaml___items'
  | 'childrenPageFurnitureYaml___items___label'
  | 'childrenPageFurnitureYaml___items___link'
  | 'childrenPageFurnitureYaml___items___name'
  | 'childrenPageFurnitureYaml___items___level'
  | 'childrenPageFurnitureYaml___items___text'
  | 'childrenPageFurnitureYaml___items___items'
  | 'childrenPageFurnitureYaml___items___items___label'
  | 'childrenPageFurnitureYaml___items___items___link'
  | 'childrenPageFurnitureYaml___items___items___name'
  | 'childrenPageFurnitureYaml___items___items___level'
  | 'childrenPageFurnitureYaml___items___items___text'
  | 'childrenPageFurnitureYaml___items___items___items'
  | 'childrenPageFurnitureYaml___items___items___id'
  | 'childrenPageFurnitureYaml___items___items___children'
  | 'childrenPageFurnitureYaml___items___id'
  | 'childrenPageFurnitureYaml___items___parent___id'
  | 'childrenPageFurnitureYaml___items___parent___children'
  | 'childrenPageFurnitureYaml___items___children'
  | 'childrenPageFurnitureYaml___items___children___id'
  | 'childrenPageFurnitureYaml___items___children___children'
  | 'childrenPageFurnitureYaml___items___internal___content'
  | 'childrenPageFurnitureYaml___items___internal___contentDigest'
  | 'childrenPageFurnitureYaml___items___internal___description'
  | 'childrenPageFurnitureYaml___items___internal___fieldOwners'
  | 'childrenPageFurnitureYaml___items___internal___ignoreType'
  | 'childrenPageFurnitureYaml___items___internal___mediaType'
  | 'childrenPageFurnitureYaml___items___internal___owner'
  | 'childrenPageFurnitureYaml___items___internal___type'
  | 'childrenPageFurnitureYaml___id'
  | 'childrenPageFurnitureYaml___parent___id'
  | 'childrenPageFurnitureYaml___parent___parent___id'
  | 'childrenPageFurnitureYaml___parent___parent___children'
  | 'childrenPageFurnitureYaml___parent___children'
  | 'childrenPageFurnitureYaml___parent___children___id'
  | 'childrenPageFurnitureYaml___parent___children___children'
  | 'childrenPageFurnitureYaml___parent___internal___content'
  | 'childrenPageFurnitureYaml___parent___internal___contentDigest'
  | 'childrenPageFurnitureYaml___parent___internal___description'
  | 'childrenPageFurnitureYaml___parent___internal___fieldOwners'
  | 'childrenPageFurnitureYaml___parent___internal___ignoreType'
  | 'childrenPageFurnitureYaml___parent___internal___mediaType'
  | 'childrenPageFurnitureYaml___parent___internal___owner'
  | 'childrenPageFurnitureYaml___parent___internal___type'
  | 'childrenPageFurnitureYaml___children'
  | 'childrenPageFurnitureYaml___children___id'
  | 'childrenPageFurnitureYaml___children___parent___id'
  | 'childrenPageFurnitureYaml___children___parent___children'
  | 'childrenPageFurnitureYaml___children___children'
  | 'childrenPageFurnitureYaml___children___children___id'
  | 'childrenPageFurnitureYaml___children___children___children'
  | 'childrenPageFurnitureYaml___children___internal___content'
  | 'childrenPageFurnitureYaml___children___internal___contentDigest'
  | 'childrenPageFurnitureYaml___children___internal___description'
  | 'childrenPageFurnitureYaml___children___internal___fieldOwners'
  | 'childrenPageFurnitureYaml___children___internal___ignoreType'
  | 'childrenPageFurnitureYaml___children___internal___mediaType'
  | 'childrenPageFurnitureYaml___children___internal___owner'
  | 'childrenPageFurnitureYaml___children___internal___type'
  | 'childrenPageFurnitureYaml___internal___content'
  | 'childrenPageFurnitureYaml___internal___contentDigest'
  | 'childrenPageFurnitureYaml___internal___description'
  | 'childrenPageFurnitureYaml___internal___fieldOwners'
  | 'childrenPageFurnitureYaml___internal___ignoreType'
  | 'childrenPageFurnitureYaml___internal___mediaType'
  | 'childrenPageFurnitureYaml___internal___owner'
  | 'childrenPageFurnitureYaml___internal___type'
  | 'childPageFurnitureYaml___label'
  | 'childPageFurnitureYaml___link'
  | 'childPageFurnitureYaml___name'
  | 'childPageFurnitureYaml___level'
  | 'childPageFurnitureYaml___text'
  | 'childPageFurnitureYaml___items'
  | 'childPageFurnitureYaml___items___label'
  | 'childPageFurnitureYaml___items___link'
  | 'childPageFurnitureYaml___items___name'
  | 'childPageFurnitureYaml___items___level'
  | 'childPageFurnitureYaml___items___text'
  | 'childPageFurnitureYaml___items___items'
  | 'childPageFurnitureYaml___items___items___label'
  | 'childPageFurnitureYaml___items___items___link'
  | 'childPageFurnitureYaml___items___items___name'
  | 'childPageFurnitureYaml___items___items___level'
  | 'childPageFurnitureYaml___items___items___text'
  | 'childPageFurnitureYaml___items___items___items'
  | 'childPageFurnitureYaml___items___items___id'
  | 'childPageFurnitureYaml___items___items___children'
  | 'childPageFurnitureYaml___items___id'
  | 'childPageFurnitureYaml___items___parent___id'
  | 'childPageFurnitureYaml___items___parent___children'
  | 'childPageFurnitureYaml___items___children'
  | 'childPageFurnitureYaml___items___children___id'
  | 'childPageFurnitureYaml___items___children___children'
  | 'childPageFurnitureYaml___items___internal___content'
  | 'childPageFurnitureYaml___items___internal___contentDigest'
  | 'childPageFurnitureYaml___items___internal___description'
  | 'childPageFurnitureYaml___items___internal___fieldOwners'
  | 'childPageFurnitureYaml___items___internal___ignoreType'
  | 'childPageFurnitureYaml___items___internal___mediaType'
  | 'childPageFurnitureYaml___items___internal___owner'
  | 'childPageFurnitureYaml___items___internal___type'
  | 'childPageFurnitureYaml___id'
  | 'childPageFurnitureYaml___parent___id'
  | 'childPageFurnitureYaml___parent___parent___id'
  | 'childPageFurnitureYaml___parent___parent___children'
  | 'childPageFurnitureYaml___parent___children'
  | 'childPageFurnitureYaml___parent___children___id'
  | 'childPageFurnitureYaml___parent___children___children'
  | 'childPageFurnitureYaml___parent___internal___content'
  | 'childPageFurnitureYaml___parent___internal___contentDigest'
  | 'childPageFurnitureYaml___parent___internal___description'
  | 'childPageFurnitureYaml___parent___internal___fieldOwners'
  | 'childPageFurnitureYaml___parent___internal___ignoreType'
  | 'childPageFurnitureYaml___parent___internal___mediaType'
  | 'childPageFurnitureYaml___parent___internal___owner'
  | 'childPageFurnitureYaml___parent___internal___type'
  | 'childPageFurnitureYaml___children'
  | 'childPageFurnitureYaml___children___id'
  | 'childPageFurnitureYaml___children___parent___id'
  | 'childPageFurnitureYaml___children___parent___children'
  | 'childPageFurnitureYaml___children___children'
  | 'childPageFurnitureYaml___children___children___id'
  | 'childPageFurnitureYaml___children___children___children'
  | 'childPageFurnitureYaml___children___internal___content'
  | 'childPageFurnitureYaml___children___internal___contentDigest'
  | 'childPageFurnitureYaml___children___internal___description'
  | 'childPageFurnitureYaml___children___internal___fieldOwners'
  | 'childPageFurnitureYaml___children___internal___ignoreType'
  | 'childPageFurnitureYaml___children___internal___mediaType'
  | 'childPageFurnitureYaml___children___internal___owner'
  | 'childPageFurnitureYaml___children___internal___type'
  | 'childPageFurnitureYaml___internal___content'
  | 'childPageFurnitureYaml___internal___contentDigest'
  | 'childPageFurnitureYaml___internal___description'
  | 'childPageFurnitureYaml___internal___fieldOwners'
  | 'childPageFurnitureYaml___internal___ignoreType'
  | 'childPageFurnitureYaml___internal___mediaType'
  | 'childPageFurnitureYaml___internal___owner'
  | 'childPageFurnitureYaml___internal___type'
  | 'childPageFurnitureYaml___internal___contentFilePath'
  | 'childrenFileHtml'
  | 'childrenFileHtml___contentOrderedList'
  | 'childrenFileHtml___contentOrderedList___data'
  | 'childrenFileHtml___contentOrderedList___type'
  | 'childrenFileHtml___meta___languages'
  | 'childrenFileHtml___meta___meta_description'
  | 'childrenFileHtml___meta___title'
  | 'childrenFileHtml___meta___redirect_from'
  | 'childrenFileHtml___articleType'
  | 'childrenFileHtml___slug'
  | 'childrenFileHtml___parentSlug'
  | 'childrenFileHtml___version'
  | 'childrenFileHtml___childrenFileHtmlVersion'
  | 'childrenFileHtml___childrenFileHtmlVersion___id'
  | 'childrenFileHtml___childrenFileHtmlVersion___parent___id'
  | 'childrenFileHtml___childrenFileHtmlVersion___parent___children'
  | 'childrenFileHtml___childrenFileHtmlVersion___children'
  | 'childrenFileHtml___childrenFileHtmlVersion___children___id'
  | 'childrenFileHtml___childrenFileHtmlVersion___children___children'
  | 'childrenFileHtml___childrenFileHtmlVersion___internal___content'
  | 'childrenFileHtml___childrenFileHtmlVersion___internal___contentDigest'
  | 'childrenFileHtml___childrenFileHtmlVersion___internal___description'
  | 'childrenFileHtml___childrenFileHtmlVersion___internal___fieldOwners'
  | 'childrenFileHtml___childrenFileHtmlVersion___internal___ignoreType'
  | 'childrenFileHtml___childrenFileHtmlVersion___internal___mediaType'
  | 'childrenFileHtml___childrenFileHtmlVersion___internal___owner'
  | 'childrenFileHtml___childrenFileHtmlVersion___internal___type'
  | 'childrenFileHtml___childrenFileHtmlVersion___internal___contentFilePath'
  | 'childrenFileHtml___childrenFileHtmlVersion___parentSlug'
  | 'childrenFileHtml___childrenFileHtmlVersion___slug'
  | 'childrenFileHtml___childrenFileHtmlVersion___version'
  | 'childrenFileHtml___childFileHtmlVersion___id'
  | 'childrenFileHtml___childFileHtmlVersion___parent___id'
  | 'childrenFileHtml___childFileHtmlVersion___parent___children'
  | 'childrenFileHtml___childFileHtmlVersion___children'
  | 'childrenFileHtml___childFileHtmlVersion___children___id'
  | 'childrenFileHtml___childFileHtmlVersion___children___children'
  | 'childrenFileHtml___childFileHtmlVersion___internal___content'
  | 'childrenFileHtml___childFileHtmlVersion___internal___contentDigest'
  | 'childrenFileHtml___childFileHtmlVersion___internal___description'
  | 'childrenFileHtml___childFileHtmlVersion___internal___fieldOwners'
  | 'childrenFileHtml___childFileHtmlVersion___internal___ignoreType'
  | 'childrenFileHtml___childFileHtmlVersion___internal___mediaType'
  | 'childrenFileHtml___childFileHtmlVersion___internal___owner'
  | 'childrenFileHtml___childFileHtmlVersion___internal___type'
  | 'childrenFileHtml___childFileHtmlVersion___internal___contentFilePath'
  | 'childrenFileHtml___childFileHtmlVersion___parentSlug'
  | 'childrenFileHtml___childFileHtmlVersion___slug'
  | 'childrenFileHtml___childFileHtmlVersion___version'
  | 'childrenFileHtml___id'
  | 'childrenFileHtml___parent___id'
  | 'childrenFileHtml___parent___parent___id'
  | 'childrenFileHtml___parent___parent___children'
  | 'childrenFileHtml___parent___children'
  | 'childrenFileHtml___parent___children___id'
  | 'childrenFileHtml___parent___children___children'
  | 'childrenFileHtml___parent___internal___content'
  | 'childrenFileHtml___parent___internal___contentDigest'
  | 'childrenFileHtml___parent___internal___description'
  | 'childrenFileHtml___parent___internal___fieldOwners'
  | 'childrenFileHtml___parent___internal___ignoreType'
  | 'childrenFileHtml___parent___internal___mediaType'
  | 'childrenFileHtml___parent___internal___owner'
  | 'childrenFileHtml___parent___internal___type'
  | 'childrenFileHtml___parent___internal___contentFilePath'
  | 'childrenFileHtml___children'
  | 'childrenFileHtml___children___id'
  | 'childrenFileHtml___children___parent___id'
  | 'childrenFileHtml___children___parent___children'
  | 'childrenFileHtml___children___children'
  | 'childrenFileHtml___children___children___id'
  | 'childrenFileHtml___children___children___children'
  | 'childrenFileHtml___children___internal___content'
  | 'childrenFileHtml___children___internal___contentDigest'
  | 'childrenFileHtml___children___internal___description'
  | 'childrenFileHtml___children___internal___fieldOwners'
  | 'childrenFileHtml___children___internal___ignoreType'
  | 'childrenFileHtml___children___internal___mediaType'
  | 'childrenFileHtml___children___internal___owner'
  | 'childrenFileHtml___children___internal___type'
  | 'childrenFileHtml___children___internal___contentFilePath'
  | 'childrenFileHtml___internal___content'
  | 'childrenFileHtml___internal___contentDigest'
  | 'childrenFileHtml___internal___description'
  | 'childrenFileHtml___internal___fieldOwners'
  | 'childrenFileHtml___internal___ignoreType'
  | 'childrenFileHtml___internal___mediaType'
  | 'childrenFileHtml___internal___owner'
  | 'childrenFileHtml___internal___type'
  | 'childrenFileHtml___internal___contentFilePath'
  | 'childFileHtml___contentOrderedList'
  | 'childFileHtml___contentOrderedList___data'
  | 'childFileHtml___contentOrderedList___type'
  | 'childFileHtml___meta___languages'
  | 'childFileHtml___meta___meta_description'
  | 'childFileHtml___meta___title'
  | 'childFileHtml___meta___redirect_from'
  | 'childFileHtml___articleType'
  | 'childFileHtml___slug'
  | 'childFileHtml___parentSlug'
  | 'childFileHtml___version'
  | 'childFileHtml___childrenFileHtmlVersion'
  | 'childFileHtml___childrenFileHtmlVersion___id'
  | 'childFileHtml___childrenFileHtmlVersion___parent___id'
  | 'childFileHtml___childrenFileHtmlVersion___parent___children'
  | 'childFileHtml___childrenFileHtmlVersion___children'
  | 'childFileHtml___childrenFileHtmlVersion___children___id'
  | 'childFileHtml___childrenFileHtmlVersion___children___children'
  | 'childFileHtml___childrenFileHtmlVersion___internal___content'
  | 'childFileHtml___childrenFileHtmlVersion___internal___contentDigest'
  | 'childFileHtml___childrenFileHtmlVersion___internal___description'
  | 'childFileHtml___childrenFileHtmlVersion___internal___fieldOwners'
  | 'childFileHtml___childrenFileHtmlVersion___internal___ignoreType'
  | 'childFileHtml___childrenFileHtmlVersion___internal___mediaType'
  | 'childFileHtml___childrenFileHtmlVersion___internal___owner'
  | 'childFileHtml___childrenFileHtmlVersion___internal___type'
  | 'childFileHtml___childrenFileHtmlVersion___internal___contentFilePath'
  | 'childFileHtml___childrenFileHtmlVersion___parentSlug'
  | 'childFileHtml___childrenFileHtmlVersion___slug'
  | 'childFileHtml___childrenFileHtmlVersion___version'
  | 'childFileHtml___childFileHtmlVersion___id'
  | 'childFileHtml___childFileHtmlVersion___parent___id'
  | 'childFileHtml___childFileHtmlVersion___parent___children'
  | 'childFileHtml___childFileHtmlVersion___children'
  | 'childFileHtml___childFileHtmlVersion___children___id'
  | 'childFileHtml___childFileHtmlVersion___children___children'
  | 'childFileHtml___childFileHtmlVersion___internal___content'
  | 'childFileHtml___childFileHtmlVersion___internal___contentDigest'
  | 'childFileHtml___childFileHtmlVersion___internal___description'
  | 'childFileHtml___childFileHtmlVersion___internal___fieldOwners'
  | 'childFileHtml___childFileHtmlVersion___internal___ignoreType'
  | 'childFileHtml___childFileHtmlVersion___internal___mediaType'
  | 'childFileHtml___childFileHtmlVersion___internal___owner'
  | 'childFileHtml___childFileHtmlVersion___internal___type'
  | 'childFileHtml___childFileHtmlVersion___internal___contentFilePath'
  | 'childFileHtml___childFileHtmlVersion___parentSlug'
  | 'childFileHtml___childFileHtmlVersion___slug'
  | 'childFileHtml___childFileHtmlVersion___version'
  | 'childFileHtml___id'
  | 'childFileHtml___parent___id'
  | 'childFileHtml___parent___parent___id'
  | 'childFileHtml___parent___parent___children'
  | 'childFileHtml___parent___children'
  | 'childFileHtml___parent___children___id'
  | 'childFileHtml___parent___children___children'
  | 'childFileHtml___parent___internal___content'
  | 'childFileHtml___parent___internal___contentDigest'
  | 'childFileHtml___parent___internal___description'
  | 'childFileHtml___parent___internal___fieldOwners'
  | 'childFileHtml___parent___internal___ignoreType'
  | 'childFileHtml___parent___internal___mediaType'
  | 'childFileHtml___parent___internal___owner'
  | 'childFileHtml___parent___internal___type'
  | 'childFileHtml___parent___internal___contentFilePath'
  | 'childFileHtml___children'
  | 'childFileHtml___children___id'
  | 'childFileHtml___children___parent___id'
  | 'childFileHtml___children___parent___children'
  | 'childFileHtml___children___children'
  | 'childFileHtml___children___children___id'
  | 'childFileHtml___children___children___children'
  | 'childFileHtml___children___internal___content'
  | 'childFileHtml___children___internal___contentDigest'
  | 'childFileHtml___children___internal___description'
  | 'childFileHtml___children___internal___fieldOwners'
  | 'childFileHtml___children___internal___ignoreType'
  | 'childFileHtml___children___internal___mediaType'
  | 'childFileHtml___children___internal___owner'
  | 'childFileHtml___children___internal___type'
  | 'childFileHtml___children___internal___contentFilePath'
  | 'childFileHtml___internal___content'
  | 'childFileHtml___internal___contentDigest'
  | 'childFileHtml___internal___description'
  | 'childFileHtml___internal___fieldOwners'
  | 'childFileHtml___internal___ignoreType'
  | 'childFileHtml___internal___mediaType'
  | 'childFileHtml___internal___owner'
  | 'childFileHtml___internal___type'
  | 'childFileHtml___internal___contentFilePath'
  | 'childrenPageContentYaml'
  | 'childrenPageContentYaml___id'
  | 'childrenPageContentYaml___parent___id'
  | 'childrenPageContentYaml___parent___parent___id'
  | 'childrenPageContentYaml___parent___parent___children'
  | 'childrenPageContentYaml___parent___children'
  | 'childrenPageContentYaml___parent___children___id'
  | 'childrenPageContentYaml___parent___children___children'
  | 'childrenPageContentYaml___parent___internal___content'
  | 'childrenPageContentYaml___parent___internal___contentDigest'
  | 'childrenPageContentYaml___parent___internal___description'
  | 'childrenPageContentYaml___parent___internal___fieldOwners'
  | 'childrenPageContentYaml___parent___internal___ignoreType'
  | 'childrenPageContentYaml___parent___internal___mediaType'
  | 'childrenPageContentYaml___parent___internal___owner'
  | 'childrenPageContentYaml___parent___internal___type'
  | 'childrenPageContentYaml___parent___internal___contentFilePath'
  | 'childrenPageContentYaml___children'
  | 'childrenPageContentYaml___children___id'
  | 'childrenPageContentYaml___children___parent___id'
  | 'childrenPageContentYaml___children___parent___children'
  | 'childrenPageContentYaml___children___children'
  | 'childrenPageContentYaml___children___children___id'
  | 'childrenPageContentYaml___children___children___children'
  | 'childrenPageContentYaml___children___internal___content'
  | 'childrenPageContentYaml___children___internal___contentDigest'
  | 'childrenPageContentYaml___children___internal___description'
  | 'childrenPageContentYaml___children___internal___fieldOwners'
  | 'childrenPageContentYaml___children___internal___ignoreType'
  | 'childrenPageContentYaml___children___internal___mediaType'
  | 'childrenPageContentYaml___children___internal___owner'
  | 'childrenPageContentYaml___children___internal___type'
  | 'childrenPageContentYaml___children___internal___contentFilePath'
  | 'childrenPageContentYaml___internal___content'
  | 'childrenPageContentYaml___internal___contentDigest'
  | 'childrenPageContentYaml___internal___description'
  | 'childrenPageContentYaml___internal___fieldOwners'
  | 'childrenPageContentYaml___internal___ignoreType'
  | 'childrenPageContentYaml___internal___mediaType'
  | 'childrenPageContentYaml___internal___owner'
  | 'childrenPageContentYaml___internal___type'
  | 'childrenPageContentYaml___internal___contentFilePath'
  | 'childrenPageContentYaml___name'
  | 'childrenPageContentYaml___meta___title'
  | 'childrenPageContentYaml___meta___description'
  | 'childrenPageContentYaml___meta___image'
  | 'childrenPageContentYaml___meta___twitter'
  | 'childrenPageContentYaml___sections'
  | 'childrenPageContentYaml___sections___title'
  | 'childrenPageContentYaml___sections___description'
  | 'childrenPageContentYaml___sections___level'
  | 'childrenPageContentYaml___sections___defaultCallToAction'
  | 'childrenPageContentYaml___sections___cards'
  | 'childrenPageContentYaml___sections___cards___title'
  | 'childrenPageContentYaml___sections___cards___content'
  | 'childrenPageContentYaml___sections___cards___callToAction'
  | 'childrenPageContentYaml___sections___cards___link'
  | 'childrenPageContentYaml___sections___cards___flag'
  | 'childPageContentYaml___id'
  | 'childPageContentYaml___parent___id'
  | 'childPageContentYaml___parent___parent___id'
  | 'childPageContentYaml___parent___parent___children'
  | 'childPageContentYaml___parent___children'
  | 'childPageContentYaml___parent___children___id'
  | 'childPageContentYaml___parent___children___children'
  | 'childPageContentYaml___parent___internal___content'
  | 'childPageContentYaml___parent___internal___contentDigest'
  | 'childPageContentYaml___parent___internal___description'
  | 'childPageContentYaml___parent___internal___fieldOwners'
  | 'childPageContentYaml___parent___internal___ignoreType'
  | 'childPageContentYaml___parent___internal___mediaType'
  | 'childPageContentYaml___parent___internal___owner'
  | 'childPageContentYaml___parent___internal___type'
  | 'childPageContentYaml___parent___internal___contentFilePath'
  | 'childPageContentYaml___children'
  | 'childPageContentYaml___children___id'
  | 'childPageContentYaml___children___parent___id'
  | 'childPageContentYaml___children___parent___children'
  | 'childPageContentYaml___children___children'
  | 'childPageContentYaml___children___children___id'
  | 'childPageContentYaml___children___children___children'
  | 'childPageContentYaml___children___internal___content'
  | 'childPageContentYaml___children___internal___contentDigest'
  | 'childPageContentYaml___children___internal___description'
  | 'childPageContentYaml___children___internal___fieldOwners'
  | 'childPageContentYaml___children___internal___ignoreType'
  | 'childPageContentYaml___children___internal___mediaType'
  | 'childPageContentYaml___children___internal___owner'
  | 'childPageContentYaml___children___internal___type'
  | 'childPageContentYaml___internal___content'
  | 'childPageContentYaml___internal___contentDigest'
  | 'childPageContentYaml___internal___description'
  | 'childPageContentYaml___internal___fieldOwners'
  | 'childPageContentYaml___internal___ignoreType'
  | 'childPageContentYaml___internal___mediaType'
  | 'childPageContentYaml___internal___owner'
  | 'childPageContentYaml___internal___type'
  | 'childPageContentYaml___name'
  | 'childPageContentYaml___meta___title'
  | 'childPageContentYaml___meta___description'
  | 'childPageContentYaml___meta___image'
  | 'childPageContentYaml___meta___twitter'
  | 'childPageContentYaml___sections'
  | 'childPageContentYaml___sections___title'
  | 'childPageContentYaml___sections___description'
  | 'childPageContentYaml___sections___level'
  | 'childPageContentYaml___sections___defaultCallToAction'
  | 'childPageContentYaml___sections___cards'
  | 'childPageContentYaml___sections___cards___title'
  | 'childPageContentYaml___sections___cards___content'
  | 'childPageContentYaml___sections___cards___callToAction'
  | 'childPageContentYaml___sections___cards___link'
  | 'childPageContentYaml___sections___cards___flag'
  | 'childrenFileInlineToc'
  | 'childrenFileInlineToc___id'
  | 'childrenFileInlineToc___parent___id'
  | 'childrenFileInlineToc___parent___parent___id'
  | 'childrenFileInlineToc___parent___parent___children'
  | 'childrenFileInlineToc___parent___children'
  | 'childrenFileInlineToc___parent___children___id'
  | 'childrenFileInlineToc___parent___children___children'
  | 'childrenFileInlineToc___parent___internal___content'
  | 'childrenFileInlineToc___parent___internal___contentDigest'
  | 'childrenFileInlineToc___parent___internal___description'
  | 'childrenFileInlineToc___parent___internal___fieldOwners'
  | 'childrenFileInlineToc___parent___internal___ignoreType'
  | 'childrenFileInlineToc___parent___internal___mediaType'
  | 'childrenFileInlineToc___parent___internal___owner'
  | 'childrenFileInlineToc___parent___internal___type'
  | 'childrenFileInlineToc___children'
  | 'childrenFileInlineToc___children___id'
  | 'childrenFileInlineToc___children___parent___id'
  | 'childrenFileInlineToc___children___parent___children'
  | 'childrenFileInlineToc___children___children'
  | 'childrenFileInlineToc___children___children___id'
  | 'childrenFileInlineToc___children___children___children'
  | 'childrenFileInlineToc___children___internal___content'
  | 'childrenFileInlineToc___children___internal___contentDigest'
  | 'childrenFileInlineToc___children___internal___description'
  | 'childrenFileInlineToc___children___internal___fieldOwners'
  | 'childrenFileInlineToc___children___internal___ignoreType'
  | 'childrenFileInlineToc___children___internal___mediaType'
  | 'childrenFileInlineToc___children___internal___owner'
  | 'childrenFileInlineToc___children___internal___type'
  | 'childrenFileInlineToc___internal___content'
  | 'childrenFileInlineToc___internal___contentDigest'
  | 'childrenFileInlineToc___internal___description'
  | 'childrenFileInlineToc___internal___fieldOwners'
  | 'childrenFileInlineToc___internal___ignoreType'
  | 'childrenFileInlineToc___internal___mediaType'
  | 'childrenFileInlineToc___internal___owner'
  | 'childrenFileInlineToc___internal___type'
  | 'childrenFileInlineToc___tableOfContents___content'
  | 'childrenFileInlineToc___tableOfContents___content___key'
  | 'childrenFileInlineToc___tableOfContents___content___values'
  | 'childrenFileInlineToc___slug'
  | 'childFileInlineToc___id'
  | 'childFileInlineToc___parent___id'
  | 'childFileInlineToc___parent___parent___id'
  | 'childFileInlineToc___parent___parent___children'
  | 'childFileInlineToc___parent___children'
  | 'childFileInlineToc___parent___children___id'
  | 'childFileInlineToc___parent___children___children'
  | 'childFileInlineToc___parent___internal___content'
  | 'childFileInlineToc___parent___internal___contentDigest'
  | 'childFileInlineToc___parent___internal___description'
  | 'childFileInlineToc___parent___internal___fieldOwners'
  | 'childFileInlineToc___parent___internal___ignoreType'
  | 'childFileInlineToc___parent___internal___mediaType'
  | 'childFileInlineToc___parent___internal___owner'
  | 'childFileInlineToc___parent___internal___type'
  | 'childFileInlineToc___children'
  | 'childFileInlineToc___children___id'
  | 'childFileInlineToc___children___parent___id'
  | 'childFileInlineToc___children___parent___children'
  | 'childFileInlineToc___children___children'
  | 'childFileInlineToc___children___children___id'
  | 'childFileInlineToc___children___children___children'
  | 'childFileInlineToc___children___internal___content'
  | 'childFileInlineToc___children___internal___contentDigest'
  | 'childFileInlineToc___children___internal___description'
  | 'childFileInlineToc___children___internal___fieldOwners'
  | 'childFileInlineToc___children___internal___ignoreType'
  | 'childFileInlineToc___children___internal___mediaType'
  | 'childFileInlineToc___children___internal___owner'
  | 'childFileInlineToc___children___internal___type'
  | 'childFileInlineToc___internal___content'
  | 'childFileInlineToc___internal___contentDigest'
  | 'childFileInlineToc___internal___description'
  | 'childFileInlineToc___internal___fieldOwners'
  | 'childFileInlineToc___internal___ignoreType'
  | 'childFileInlineToc___internal___mediaType'
  | 'childFileInlineToc___internal___owner'
  | 'childFileInlineToc___internal___type'
  | 'childFileInlineToc___tableOfContents___content'
  | 'childFileInlineToc___tableOfContents___content___key'
  | 'childFileInlineToc___tableOfContents___content___values'
  | 'childFileInlineToc___slug'
  | 'childrenFileHtmlPartial'
  | 'childrenFileHtmlPartial___id'
  | 'childrenFileHtmlPartial___parent___id'
  | 'childrenFileHtmlPartial___parent___parent___id'
  | 'childrenFileHtmlPartial___parent___parent___children'
  | 'childrenFileHtmlPartial___parent___children'
  | 'childrenFileHtmlPartial___parent___children___id'
  | 'childrenFileHtmlPartial___parent___children___children'
  | 'childrenFileHtmlPartial___parent___internal___content'
  | 'childrenFileHtmlPartial___parent___internal___contentDigest'
  | 'childrenFileHtmlPartial___parent___internal___description'
  | 'childrenFileHtmlPartial___parent___internal___fieldOwners'
  | 'childrenFileHtmlPartial___parent___internal___ignoreType'
  | 'childrenFileHtmlPartial___parent___internal___mediaType'
  | 'childrenFileHtmlPartial___parent___internal___owner'
  | 'childrenFileHtmlPartial___parent___internal___type'
  | 'childrenFileHtmlPartial___children'
  | 'childrenFileHtmlPartial___children___id'
  | 'childrenFileHtmlPartial___children___parent___id'
  | 'childrenFileHtmlPartial___children___parent___children'
  | 'childrenFileHtmlPartial___children___children'
  | 'childrenFileHtmlPartial___children___children___id'
  | 'childrenFileHtmlPartial___children___children___children'
  | 'childrenFileHtmlPartial___children___internal___content'
  | 'childrenFileHtmlPartial___children___internal___contentDigest'
  | 'childrenFileHtmlPartial___children___internal___description'
  | 'childrenFileHtmlPartial___children___internal___fieldOwners'
  | 'childrenFileHtmlPartial___children___internal___ignoreType'
  | 'childrenFileHtmlPartial___children___internal___mediaType'
  | 'childrenFileHtmlPartial___children___internal___owner'
  | 'childrenFileHtmlPartial___children___internal___type'
  | 'childrenFileHtmlPartial___internal___content'
  | 'childrenFileHtmlPartial___internal___contentDigest'
  | 'childrenFileHtmlPartial___internal___description'
  | 'childrenFileHtmlPartial___internal___fieldOwners'
  | 'childrenFileHtmlPartial___internal___ignoreType'
  | 'childrenFileHtmlPartial___internal___mediaType'
  | 'childrenFileHtmlPartial___internal___owner'
  | 'childrenFileHtmlPartial___internal___type'
  | 'childrenFileHtmlPartial___internal___contentFilePath'
  | 'childrenFileHtmlPartial___articleType'
  | 'childrenFileHtmlPartial___contentOrderedList'
  | 'childrenFileHtmlPartial___contentOrderedList___data'
  | 'childrenFileHtmlPartial___contentOrderedList___type'
  | 'childrenFileHtmlPartial___relativePath'
  | 'childFileHtmlPartial___id'
  | 'childFileHtmlPartial___parent___id'
  | 'childFileHtmlPartial___parent___parent___id'
  | 'childFileHtmlPartial___parent___parent___children'
  | 'childFileHtmlPartial___parent___children'
  | 'childFileHtmlPartial___parent___children___id'
  | 'childFileHtmlPartial___parent___children___children'
  | 'childFileHtmlPartial___parent___internal___content'
  | 'childFileHtmlPartial___parent___internal___contentDigest'
  | 'childFileHtmlPartial___parent___internal___description'
  | 'childFileHtmlPartial___parent___internal___fieldOwners'
  | 'childFileHtmlPartial___parent___internal___ignoreType'
  | 'childFileHtmlPartial___parent___internal___mediaType'
  | 'childFileHtmlPartial___parent___internal___owner'
  | 'childFileHtmlPartial___parent___internal___type'
  | 'childFileHtmlPartial___children'
  | 'childFileHtmlPartial___children___id'
  | 'childFileHtmlPartial___children___parent___id'
  | 'childFileHtmlPartial___children___parent___children'
  | 'childFileHtmlPartial___children___children'
  | 'childFileHtmlPartial___children___children___id'
  | 'childFileHtmlPartial___children___children___children'
  | 'childFileHtmlPartial___children___internal___content'
  | 'childFileHtmlPartial___children___internal___contentDigest'
  | 'childFileHtmlPartial___children___internal___description'
  | 'childFileHtmlPartial___children___internal___fieldOwners'
  | 'childFileHtmlPartial___children___internal___ignoreType'
  | 'childFileHtmlPartial___children___internal___mediaType'
  | 'childFileHtmlPartial___children___internal___owner'
  | 'childFileHtmlPartial___children___internal___type'
  | 'childFileHtmlPartial___children___internal___contentFilePath'
  | 'childFileHtmlPartial___internal___content'
  | 'childFileHtmlPartial___internal___contentDigest'
  | 'childFileHtmlPartial___internal___description'
  | 'childFileHtmlPartial___internal___fieldOwners'
  | 'childFileHtmlPartial___internal___ignoreType'
  | 'childFileHtmlPartial___internal___mediaType'
  | 'childFileHtmlPartial___internal___owner'
  | 'childFileHtmlPartial___internal___type'
  | 'childFileHtmlPartial___internal___contentFilePath'
  | 'childFileHtmlPartial___articleType'
  | 'childFileHtmlPartial___contentOrderedList'
  | 'childFileHtmlPartial___contentOrderedList___data'
  | 'childFileHtmlPartial___contentOrderedList___type'
  | 'childFileHtmlPartial___relativePath'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type FileGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<FileEdge>;
  nodes: Array<File>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<FileGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type FileGroupConnectionDistinctArgs = {
  field: FileFieldsEnum;
};


export type FileGroupConnectionMaxArgs = {
  field: FileFieldsEnum;
};


export type FileGroupConnectionMinArgs = {
  field: FileFieldsEnum;
};


export type FileGroupConnectionSumArgs = {
  field: FileFieldsEnum;
};


export type FileGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: FileFieldsEnum;
};

export type FileFilterInput = {
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>;
  absolutePath?: InputMaybe<StringQueryOperatorInput>;
  relativePath?: InputMaybe<StringQueryOperatorInput>;
  extension?: InputMaybe<StringQueryOperatorInput>;
  size?: InputMaybe<IntQueryOperatorInput>;
  prettySize?: InputMaybe<StringQueryOperatorInput>;
  modifiedTime?: InputMaybe<DateQueryOperatorInput>;
  accessTime?: InputMaybe<DateQueryOperatorInput>;
  changeTime?: InputMaybe<DateQueryOperatorInput>;
  birthTime?: InputMaybe<DateQueryOperatorInput>;
  root?: InputMaybe<StringQueryOperatorInput>;
  dir?: InputMaybe<StringQueryOperatorInput>;
  base?: InputMaybe<StringQueryOperatorInput>;
  ext?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>;
  dev?: InputMaybe<IntQueryOperatorInput>;
  mode?: InputMaybe<IntQueryOperatorInput>;
  nlink?: InputMaybe<IntQueryOperatorInput>;
  uid?: InputMaybe<IntQueryOperatorInput>;
  gid?: InputMaybe<IntQueryOperatorInput>;
  rdev?: InputMaybe<IntQueryOperatorInput>;
  ino?: InputMaybe<FloatQueryOperatorInput>;
  atimeMs?: InputMaybe<FloatQueryOperatorInput>;
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>;
  atime?: InputMaybe<DateQueryOperatorInput>;
  mtime?: InputMaybe<DateQueryOperatorInput>;
  ctime?: InputMaybe<DateQueryOperatorInput>;
  birthtime?: InputMaybe<DateQueryOperatorInput>;
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  blksize?: InputMaybe<IntQueryOperatorInput>;
  blocks?: InputMaybe<IntQueryOperatorInput>;
  publicURL?: InputMaybe<StringQueryOperatorInput>;
  childrenImageSharp?: InputMaybe<ImageSharpFilterListInput>;
  childImageSharp?: InputMaybe<ImageSharpFilterInput>;
  childrenPageFurnitureYaml?: InputMaybe<PageFurnitureYamlFilterListInput>;
  childPageFurnitureYaml?: InputMaybe<PageFurnitureYamlFilterInput>;
  childrenFileHtml?: InputMaybe<FileHtmlFilterListInput>;
  childFileHtml?: InputMaybe<FileHtmlFilterInput>;
  childrenPageContentYaml?: InputMaybe<PageContentYamlFilterListInput>;
  childPageContentYaml?: InputMaybe<PageContentYamlFilterInput>;
  childrenFileInlineToc?: InputMaybe<FileInlineTocFilterListInput>;
  childFileInlineToc?: InputMaybe<FileInlineTocFilterInput>;
  childrenFileHtmlPartial?: InputMaybe<FileHtmlPartialFilterListInput>;
  childFileHtmlPartial?: InputMaybe<FileHtmlPartialFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type FileSortInput = {
  fields?: InputMaybe<Array<InputMaybe<FileFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type SortOrderEnum =
  | 'ASC'
  | 'DESC';

export type DirectoryConnection = {
  totalCount: Scalars['Int'];
  edges: Array<DirectoryEdge>;
  nodes: Array<Directory>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<DirectoryGroupConnection>;
};


export type DirectoryConnectionDistinctArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryConnectionMaxArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryConnectionMinArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryConnectionSumArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: DirectoryFieldsEnum;
};

export type DirectoryEdge = {
  next?: Maybe<Directory>;
  node: Directory;
  previous?: Maybe<Directory>;
};

export type DirectoryFieldsEnum =
  | 'sourceInstanceName'
  | 'absolutePath'
  | 'relativePath'
  | 'extension'
  | 'size'
  | 'prettySize'
  | 'modifiedTime'
  | 'accessTime'
  | 'changeTime'
  | 'birthTime'
  | 'root'
  | 'dir'
  | 'base'
  | 'ext'
  | 'name'
  | 'relativeDirectory'
  | 'dev'
  | 'mode'
  | 'nlink'
  | 'uid'
  | 'gid'
  | 'rdev'
  | 'ino'
  | 'atimeMs'
  | 'mtimeMs'
  | 'ctimeMs'
  | 'atime'
  | 'mtime'
  | 'ctime'
  | 'birthtime'
  | 'birthtimeMs'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type DirectoryGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<DirectoryEdge>;
  nodes: Array<Directory>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<DirectoryGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type DirectoryGroupConnectionDistinctArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryGroupConnectionMaxArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryGroupConnectionMinArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryGroupConnectionSumArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: DirectoryFieldsEnum;
};

export type DirectoryFilterInput = {
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>;
  absolutePath?: InputMaybe<StringQueryOperatorInput>;
  relativePath?: InputMaybe<StringQueryOperatorInput>;
  extension?: InputMaybe<StringQueryOperatorInput>;
  size?: InputMaybe<IntQueryOperatorInput>;
  prettySize?: InputMaybe<StringQueryOperatorInput>;
  modifiedTime?: InputMaybe<DateQueryOperatorInput>;
  accessTime?: InputMaybe<DateQueryOperatorInput>;
  changeTime?: InputMaybe<DateQueryOperatorInput>;
  birthTime?: InputMaybe<DateQueryOperatorInput>;
  root?: InputMaybe<StringQueryOperatorInput>;
  dir?: InputMaybe<StringQueryOperatorInput>;
  base?: InputMaybe<StringQueryOperatorInput>;
  ext?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>;
  dev?: InputMaybe<IntQueryOperatorInput>;
  mode?: InputMaybe<IntQueryOperatorInput>;
  nlink?: InputMaybe<IntQueryOperatorInput>;
  uid?: InputMaybe<IntQueryOperatorInput>;
  gid?: InputMaybe<IntQueryOperatorInput>;
  rdev?: InputMaybe<IntQueryOperatorInput>;
  ino?: InputMaybe<FloatQueryOperatorInput>;
  atimeMs?: InputMaybe<FloatQueryOperatorInput>;
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>;
  atime?: InputMaybe<DateQueryOperatorInput>;
  mtime?: InputMaybe<DateQueryOperatorInput>;
  ctime?: InputMaybe<DateQueryOperatorInput>;
  birthtime?: InputMaybe<DateQueryOperatorInput>;
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type DirectorySortInput = {
  fields?: InputMaybe<Array<InputMaybe<DirectoryFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type SiteSiteMetadataFilterInput = {
  title?: InputMaybe<StringQueryOperatorInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  siteUrl?: InputMaybe<StringQueryOperatorInput>;
};

export type SiteConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteEdge>;
  nodes: Array<Site>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SiteGroupConnection>;
};


export type SiteConnectionDistinctArgs = {
  field: SiteFieldsEnum;
};


export type SiteConnectionMaxArgs = {
  field: SiteFieldsEnum;
};


export type SiteConnectionMinArgs = {
  field: SiteFieldsEnum;
};


export type SiteConnectionSumArgs = {
  field: SiteFieldsEnum;
};


export type SiteConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SiteFieldsEnum;
};

export type SiteEdge = {
  next?: Maybe<Site>;
  node: Site;
  previous?: Maybe<Site>;
};

export type SiteFieldsEnum =
  | 'buildTime'
  | 'siteMetadata___title'
  | 'siteMetadata___description'
  | 'siteMetadata___siteUrl'
  | 'port'
  | 'host'
  | 'assetPrefix'
  | 'polyfill'
  | 'pathPrefix'
  | 'jsxRuntime'
  | 'trailingSlash'
  | 'graphqlTypegen'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type SiteGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteEdge>;
  nodes: Array<Site>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SiteGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type SiteGroupConnectionDistinctArgs = {
  field: SiteFieldsEnum;
};


export type SiteGroupConnectionMaxArgs = {
  field: SiteFieldsEnum;
};


export type SiteGroupConnectionMinArgs = {
  field: SiteFieldsEnum;
};


export type SiteGroupConnectionSumArgs = {
  field: SiteFieldsEnum;
};


export type SiteGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SiteFieldsEnum;
};

export type SiteFilterInput = {
  buildTime?: InputMaybe<DateQueryOperatorInput>;
  siteMetadata?: InputMaybe<SiteSiteMetadataFilterInput>;
  port?: InputMaybe<IntQueryOperatorInput>;
  host?: InputMaybe<StringQueryOperatorInput>;
  assetPrefix?: InputMaybe<StringQueryOperatorInput>;
  polyfill?: InputMaybe<BooleanQueryOperatorInput>;
  pathPrefix?: InputMaybe<StringQueryOperatorInput>;
  jsxRuntime?: InputMaybe<StringQueryOperatorInput>;
  trailingSlash?: InputMaybe<StringQueryOperatorInput>;
  graphqlTypegen?: InputMaybe<BooleanQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type SiteSortInput = {
  fields?: InputMaybe<Array<InputMaybe<SiteFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type SiteFunctionConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteFunctionEdge>;
  nodes: Array<SiteFunction>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SiteFunctionGroupConnection>;
};


export type SiteFunctionConnectionDistinctArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionConnectionMaxArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionConnectionMinArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionConnectionSumArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SiteFunctionFieldsEnum;
};

export type SiteFunctionEdge = {
  next?: Maybe<SiteFunction>;
  node: SiteFunction;
  previous?: Maybe<SiteFunction>;
};

export type SiteFunctionFieldsEnum =
  | 'functionRoute'
  | 'pluginName'
  | 'originalAbsoluteFilePath'
  | 'originalRelativeFilePath'
  | 'relativeCompiledFilePath'
  | 'absoluteCompiledFilePath'
  | 'matchPath'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type SiteFunctionGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteFunctionEdge>;
  nodes: Array<SiteFunction>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SiteFunctionGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type SiteFunctionGroupConnectionDistinctArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionGroupConnectionMaxArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionGroupConnectionMinArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionGroupConnectionSumArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SiteFunctionFieldsEnum;
};

export type SiteFunctionFilterInput = {
  functionRoute?: InputMaybe<StringQueryOperatorInput>;
  pluginName?: InputMaybe<StringQueryOperatorInput>;
  originalAbsoluteFilePath?: InputMaybe<StringQueryOperatorInput>;
  originalRelativeFilePath?: InputMaybe<StringQueryOperatorInput>;
  relativeCompiledFilePath?: InputMaybe<StringQueryOperatorInput>;
  absoluteCompiledFilePath?: InputMaybe<StringQueryOperatorInput>;
  matchPath?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type SiteFunctionSortInput = {
  fields?: InputMaybe<Array<InputMaybe<SiteFunctionFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type JsonQueryOperatorInput = {
  eq?: InputMaybe<Scalars['JSON']>;
  ne?: InputMaybe<Scalars['JSON']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  regex?: InputMaybe<Scalars['JSON']>;
  glob?: InputMaybe<Scalars['JSON']>;
};

export type SitePluginFilterInput = {
  resolve?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  version?: InputMaybe<StringQueryOperatorInput>;
  nodeAPIs?: InputMaybe<StringQueryOperatorInput>;
  browserAPIs?: InputMaybe<StringQueryOperatorInput>;
  ssrAPIs?: InputMaybe<StringQueryOperatorInput>;
  pluginFilepath?: InputMaybe<StringQueryOperatorInput>;
  pluginOptions?: InputMaybe<JsonQueryOperatorInput>;
  packageJson?: InputMaybe<JsonQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type SitePageConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePageEdge>;
  nodes: Array<SitePage>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SitePageGroupConnection>;
};


export type SitePageConnectionDistinctArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageConnectionMaxArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageConnectionMinArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageConnectionSumArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SitePageFieldsEnum;
};

export type SitePageEdge = {
  next?: Maybe<SitePage>;
  node: SitePage;
  previous?: Maybe<SitePage>;
};

export type SitePageFieldsEnum =
  | 'path'
  | 'component'
  | 'internalComponentName'
  | 'componentChunkName'
  | 'matchPath'
  | 'pageContext'
  | 'pluginCreator___resolve'
  | 'pluginCreator___name'
  | 'pluginCreator___version'
  | 'pluginCreator___nodeAPIs'
  | 'pluginCreator___browserAPIs'
  | 'pluginCreator___ssrAPIs'
  | 'pluginCreator___pluginFilepath'
  | 'pluginCreator___pluginOptions'
  | 'pluginCreator___packageJson'
  | 'pluginCreator___id'
  | 'pluginCreator___parent___id'
  | 'pluginCreator___parent___parent___id'
  | 'pluginCreator___parent___parent___children'
  | 'pluginCreator___parent___children'
  | 'pluginCreator___parent___children___id'
  | 'pluginCreator___parent___children___children'
  | 'pluginCreator___parent___internal___content'
  | 'pluginCreator___parent___internal___contentDigest'
  | 'pluginCreator___parent___internal___description'
  | 'pluginCreator___parent___internal___fieldOwners'
  | 'pluginCreator___parent___internal___ignoreType'
  | 'pluginCreator___parent___internal___mediaType'
  | 'pluginCreator___parent___internal___owner'
  | 'pluginCreator___parent___internal___type'
  | 'pluginCreator___children'
  | 'pluginCreator___children___id'
  | 'pluginCreator___children___parent___id'
  | 'pluginCreator___children___parent___children'
  | 'pluginCreator___children___children'
  | 'pluginCreator___children___children___id'
  | 'pluginCreator___children___children___children'
  | 'pluginCreator___children___internal___content'
  | 'pluginCreator___children___internal___contentDigest'
  | 'pluginCreator___children___internal___description'
  | 'pluginCreator___children___internal___fieldOwners'
  | 'pluginCreator___children___internal___ignoreType'
  | 'pluginCreator___children___internal___mediaType'
  | 'pluginCreator___children___internal___owner'
  | 'pluginCreator___children___internal___type'
  | 'pluginCreator___internal___content'
  | 'pluginCreator___internal___contentDigest'
  | 'pluginCreator___internal___description'
  | 'pluginCreator___internal___fieldOwners'
  | 'pluginCreator___internal___ignoreType'
  | 'pluginCreator___internal___mediaType'
  | 'pluginCreator___internal___owner'
  | 'pluginCreator___internal___type'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type SitePageGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePageEdge>;
  nodes: Array<SitePage>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SitePageGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type SitePageGroupConnectionDistinctArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageGroupConnectionMaxArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageGroupConnectionMinArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageGroupConnectionSumArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SitePageFieldsEnum;
};

export type SitePageFilterInput = {
  path?: InputMaybe<StringQueryOperatorInput>;
  component?: InputMaybe<StringQueryOperatorInput>;
  internalComponentName?: InputMaybe<StringQueryOperatorInput>;
  componentChunkName?: InputMaybe<StringQueryOperatorInput>;
  matchPath?: InputMaybe<StringQueryOperatorInput>;
  pageContext?: InputMaybe<JsonQueryOperatorInput>;
  pluginCreator?: InputMaybe<SitePluginFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type SitePageSortInput = {
  fields?: InputMaybe<Array<InputMaybe<SitePageFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type SitePluginConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePluginEdge>;
  nodes: Array<SitePlugin>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SitePluginGroupConnection>;
};


export type SitePluginConnectionDistinctArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginConnectionMaxArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginConnectionMinArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginConnectionSumArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SitePluginFieldsEnum;
};

export type SitePluginEdge = {
  next?: Maybe<SitePlugin>;
  node: SitePlugin;
  previous?: Maybe<SitePlugin>;
};

export type SitePluginFieldsEnum =
  | 'resolve'
  | 'name'
  | 'version'
  | 'nodeAPIs'
  | 'browserAPIs'
  | 'ssrAPIs'
  | 'pluginFilepath'
  | 'pluginOptions'
  | 'packageJson'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type SitePluginGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePluginEdge>;
  nodes: Array<SitePlugin>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SitePluginGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type SitePluginGroupConnectionDistinctArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginGroupConnectionMaxArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginGroupConnectionMinArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginGroupConnectionSumArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SitePluginFieldsEnum;
};

export type SitePluginSortInput = {
  fields?: InputMaybe<Array<InputMaybe<SitePluginFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type SiteBuildMetadataConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteBuildMetadataEdge>;
  nodes: Array<SiteBuildMetadata>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SiteBuildMetadataGroupConnection>;
};


export type SiteBuildMetadataConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataConnectionMaxArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataConnectionMinArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataConnectionSumArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataEdge = {
  next?: Maybe<SiteBuildMetadata>;
  node: SiteBuildMetadata;
  previous?: Maybe<SiteBuildMetadata>;
};

export type SiteBuildMetadataFieldsEnum =
  | 'buildTime'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type SiteBuildMetadataGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteBuildMetadataEdge>;
  nodes: Array<SiteBuildMetadata>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SiteBuildMetadataGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type SiteBuildMetadataGroupConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataGroupConnectionMaxArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataGroupConnectionMinArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataGroupConnectionSumArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataFilterInput = {
  buildTime?: InputMaybe<DateQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type SiteBuildMetadataSortInput = {
  fields?: InputMaybe<Array<InputMaybe<SiteBuildMetadataFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type ImageSharpConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ImageSharpEdge>;
  nodes: Array<ImageSharp>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<ImageSharpGroupConnection>;
};


export type ImageSharpConnectionDistinctArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpConnectionMaxArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpConnectionMinArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpConnectionSumArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: ImageSharpFieldsEnum;
};

export type ImageSharpEdge = {
  next?: Maybe<ImageSharp>;
  node: ImageSharp;
  previous?: Maybe<ImageSharp>;
};

export type ImageSharpFieldsEnum =
  | 'fixed___base64'
  | 'fixed___tracedSVG'
  | 'fixed___aspectRatio'
  | 'fixed___width'
  | 'fixed___height'
  | 'fixed___src'
  | 'fixed___srcSet'
  | 'fixed___srcWebp'
  | 'fixed___srcSetWebp'
  | 'fixed___originalName'
  | 'fluid___base64'
  | 'fluid___tracedSVG'
  | 'fluid___aspectRatio'
  | 'fluid___src'
  | 'fluid___srcSet'
  | 'fluid___srcWebp'
  | 'fluid___srcSetWebp'
  | 'fluid___sizes'
  | 'fluid___originalImg'
  | 'fluid___originalName'
  | 'fluid___presentationWidth'
  | 'fluid___presentationHeight'
  | 'gatsbyImageData'
  | 'original___width'
  | 'original___height'
  | 'original___src'
  | 'resize___src'
  | 'resize___tracedSVG'
  | 'resize___width'
  | 'resize___height'
  | 'resize___aspectRatio'
  | 'resize___originalName'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type ImageSharpGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ImageSharpEdge>;
  nodes: Array<ImageSharp>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<ImageSharpGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type ImageSharpGroupConnectionDistinctArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpGroupConnectionMaxArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpGroupConnectionMinArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpGroupConnectionSumArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: ImageSharpFieldsEnum;
};

export type ImageSharpSortInput = {
  fields?: InputMaybe<Array<InputMaybe<ImageSharpFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type PageFurnitureYamlConnection = {
  totalCount: Scalars['Int'];
  edges: Array<PageFurnitureYamlEdge>;
  nodes: Array<PageFurnitureYaml>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<PageFurnitureYamlGroupConnection>;
};


export type PageFurnitureYamlConnectionDistinctArgs = {
  field: PageFurnitureYamlFieldsEnum;
};


export type PageFurnitureYamlConnectionMaxArgs = {
  field: PageFurnitureYamlFieldsEnum;
};


export type PageFurnitureYamlConnectionMinArgs = {
  field: PageFurnitureYamlFieldsEnum;
};


export type PageFurnitureYamlConnectionSumArgs = {
  field: PageFurnitureYamlFieldsEnum;
};


export type PageFurnitureYamlConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: PageFurnitureYamlFieldsEnum;
};

export type PageFurnitureYamlEdge = {
  next?: Maybe<PageFurnitureYaml>;
  node: PageFurnitureYaml;
  previous?: Maybe<PageFurnitureYaml>;
};

export type PageFurnitureYamlFieldsEnum =
  | 'label'
  | 'link'
  | 'name'
  | 'level'
  | 'text'
  | 'items'
  | 'items___label'
  | 'items___link'
  | 'items___name'
  | 'items___level'
  | 'items___text'
  | 'items___items'
  | 'items___items___label'
  | 'items___items___link'
  | 'items___items___name'
  | 'items___items___level'
  | 'items___items___text'
  | 'items___items___items'
  | 'items___items___items___label'
  | 'items___items___items___link'
  | 'items___items___items___name'
  | 'items___items___items___level'
  | 'items___items___items___text'
  | 'items___items___items___items'
  | 'items___items___items___id'
  | 'items___items___items___children'
  | 'items___items___id'
  | 'items___items___parent___id'
  | 'items___items___parent___children'
  | 'items___items___children'
  | 'items___items___children___id'
  | 'items___items___children___children'
  | 'items___items___internal___content'
  | 'items___items___internal___contentDigest'
  | 'items___items___internal___description'
  | 'items___items___internal___fieldOwners'
  | 'items___items___internal___ignoreType'
  | 'items___items___internal___mediaType'
  | 'items___items___internal___owner'
  | 'items___items___internal___type'
  | 'items___id'
  | 'items___parent___id'
  | 'items___parent___parent___id'
  | 'items___parent___parent___children'
  | 'items___parent___children'
  | 'items___parent___children___id'
  | 'items___parent___children___children'
  | 'items___parent___internal___content'
  | 'items___parent___internal___contentDigest'
  | 'items___parent___internal___description'
  | 'items___parent___internal___fieldOwners'
  | 'items___parent___internal___ignoreType'
  | 'items___parent___internal___mediaType'
  | 'items___parent___internal___owner'
  | 'items___parent___internal___type'
  | 'items___children'
  | 'items___children___id'
  | 'items___children___parent___id'
  | 'items___children___parent___children'
  | 'items___children___children'
  | 'items___children___children___id'
  | 'items___children___children___children'
  | 'items___children___internal___content'
  | 'items___children___internal___contentDigest'
  | 'items___children___internal___description'
  | 'items___children___internal___fieldOwners'
  | 'items___children___internal___ignoreType'
  | 'items___children___internal___mediaType'
  | 'items___children___internal___owner'
  | 'items___children___internal___type'
  | 'items___internal___content'
  | 'items___internal___contentDigest'
  | 'items___internal___description'
  | 'items___internal___fieldOwners'
  | 'items___internal___ignoreType'
  | 'items___internal___mediaType'
  | 'items___internal___owner'
  | 'items___internal___type'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type PageFurnitureYamlGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<PageFurnitureYamlEdge>;
  nodes: Array<PageFurnitureYaml>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<PageFurnitureYamlGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type PageFurnitureYamlGroupConnectionDistinctArgs = {
  field: PageFurnitureYamlFieldsEnum;
};


export type PageFurnitureYamlGroupConnectionMaxArgs = {
  field: PageFurnitureYamlFieldsEnum;
};


export type PageFurnitureYamlGroupConnectionMinArgs = {
  field: PageFurnitureYamlFieldsEnum;
};


export type PageFurnitureYamlGroupConnectionSumArgs = {
  field: PageFurnitureYamlFieldsEnum;
};


export type PageFurnitureYamlGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: PageFurnitureYamlFieldsEnum;
};

export type PageFurnitureYamlSortInput = {
  fields?: InputMaybe<Array<InputMaybe<PageFurnitureYamlFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type FileHtmlConnection = {
  totalCount: Scalars['Int'];
  edges: Array<FileHtmlEdge>;
  nodes: Array<FileHtml>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<FileHtmlGroupConnection>;
};


export type FileHtmlConnectionDistinctArgs = {
  field: FileHtmlFieldsEnum;
};


export type FileHtmlConnectionMaxArgs = {
  field: FileHtmlFieldsEnum;
};


export type FileHtmlConnectionMinArgs = {
  field: FileHtmlFieldsEnum;
};


export type FileHtmlConnectionSumArgs = {
  field: FileHtmlFieldsEnum;
};


export type FileHtmlConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: FileHtmlFieldsEnum;
};

export type FileHtmlEdge = {
  next?: Maybe<FileHtml>;
  node: FileHtml;
  previous?: Maybe<FileHtml>;
};

export type FileHtmlFieldsEnum =
  | 'contentOrderedList'
  | 'contentOrderedList___data'
  | 'contentOrderedList___type'
  | 'meta___languages'
  | 'meta___meta_description'
  | 'meta___title'
  | 'meta___redirect_from'
  | 'articleType'
  | 'slug'
  | 'parentSlug'
  | 'version'
  | 'childrenFileHtmlVersion'
  | 'childrenFileHtmlVersion___id'
  | 'childrenFileHtmlVersion___parent___id'
  | 'childrenFileHtmlVersion___parent___parent___id'
  | 'childrenFileHtmlVersion___parent___parent___children'
  | 'childrenFileHtmlVersion___parent___children'
  | 'childrenFileHtmlVersion___parent___children___id'
  | 'childrenFileHtmlVersion___parent___children___children'
  | 'childrenFileHtmlVersion___parent___internal___content'
  | 'childrenFileHtmlVersion___parent___internal___contentDigest'
  | 'childrenFileHtmlVersion___parent___internal___description'
  | 'childrenFileHtmlVersion___parent___internal___fieldOwners'
  | 'childrenFileHtmlVersion___parent___internal___ignoreType'
  | 'childrenFileHtmlVersion___parent___internal___mediaType'
  | 'childrenFileHtmlVersion___parent___internal___owner'
  | 'childrenFileHtmlVersion___parent___internal___type'
  | 'childrenFileHtmlVersion___parent___internal___contentFilePath'
  | 'childrenFileHtmlVersion___children'
  | 'childrenFileHtmlVersion___children___id'
  | 'childrenFileHtmlVersion___children___parent___id'
  | 'childrenFileHtmlVersion___children___parent___children'
  | 'childrenFileHtmlVersion___children___children'
  | 'childrenFileHtmlVersion___children___children___id'
  | 'childrenFileHtmlVersion___children___children___children'
  | 'childrenFileHtmlVersion___children___internal___content'
  | 'childrenFileHtmlVersion___children___internal___contentDigest'
  | 'childrenFileHtmlVersion___children___internal___description'
  | 'childrenFileHtmlVersion___children___internal___fieldOwners'
  | 'childrenFileHtmlVersion___children___internal___ignoreType'
  | 'childrenFileHtmlVersion___children___internal___mediaType'
  | 'childrenFileHtmlVersion___children___internal___owner'
  | 'childrenFileHtmlVersion___children___internal___type'
  | 'childrenFileHtmlVersion___children___internal___contentFilePath'
  | 'childrenFileHtmlVersion___internal___content'
  | 'childrenFileHtmlVersion___internal___contentDigest'
  | 'childrenFileHtmlVersion___internal___description'
  | 'childrenFileHtmlVersion___internal___fieldOwners'
  | 'childrenFileHtmlVersion___internal___ignoreType'
  | 'childrenFileHtmlVersion___internal___mediaType'
  | 'childrenFileHtmlVersion___internal___owner'
  | 'childrenFileHtmlVersion___internal___type'
  | 'childrenFileHtmlVersion___internal___contentFilePath'
  | 'childrenFileHtmlVersion___parentSlug'
  | 'childrenFileHtmlVersion___slug'
  | 'childrenFileHtmlVersion___version'
  | 'childFileHtmlVersion___id'
  | 'childFileHtmlVersion___parent___id'
  | 'childFileHtmlVersion___parent___parent___id'
  | 'childFileHtmlVersion___parent___parent___children'
  | 'childFileHtmlVersion___parent___children'
  | 'childFileHtmlVersion___parent___children___id'
  | 'childFileHtmlVersion___parent___children___children'
  | 'childFileHtmlVersion___parent___internal___content'
  | 'childFileHtmlVersion___parent___internal___contentDigest'
  | 'childFileHtmlVersion___parent___internal___description'
  | 'childFileHtmlVersion___parent___internal___fieldOwners'
  | 'childFileHtmlVersion___parent___internal___ignoreType'
  | 'childFileHtmlVersion___parent___internal___mediaType'
  | 'childFileHtmlVersion___parent___internal___owner'
  | 'childFileHtmlVersion___parent___internal___type'
  | 'childFileHtmlVersion___parent___internal___contentFilePath'
  | 'childFileHtmlVersion___children'
  | 'childFileHtmlVersion___children___id'
  | 'childFileHtmlVersion___children___parent___id'
  | 'childFileHtmlVersion___children___parent___children'
  | 'childFileHtmlVersion___children___children'
  | 'childFileHtmlVersion___children___children___id'
  | 'childFileHtmlVersion___children___children___children'
  | 'childFileHtmlVersion___children___internal___content'
  | 'childFileHtmlVersion___children___internal___contentDigest'
  | 'childFileHtmlVersion___children___internal___description'
  | 'childFileHtmlVersion___children___internal___fieldOwners'
  | 'childFileHtmlVersion___children___internal___ignoreType'
  | 'childFileHtmlVersion___children___internal___mediaType'
  | 'childFileHtmlVersion___children___internal___owner'
  | 'childFileHtmlVersion___children___internal___type'
  | 'childFileHtmlVersion___children___internal___contentFilePath'
  | 'childFileHtmlVersion___internal___content'
  | 'childFileHtmlVersion___internal___contentDigest'
  | 'childFileHtmlVersion___internal___description'
  | 'childFileHtmlVersion___internal___fieldOwners'
  | 'childFileHtmlVersion___internal___ignoreType'
  | 'childFileHtmlVersion___internal___mediaType'
  | 'childFileHtmlVersion___internal___owner'
  | 'childFileHtmlVersion___internal___type'
  | 'childFileHtmlVersion___internal___contentFilePath'
  | 'childFileHtmlVersion___parentSlug'
  | 'childFileHtmlVersion___slug'
  | 'childFileHtmlVersion___version'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___parent___internal___contentFilePath'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___children___internal___contentFilePath'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'parent___internal___contentFilePath'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___parent___internal___contentFilePath'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___children___internal___contentFilePath'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'children___internal___contentFilePath'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'internal___contentFilePath';

export type FileHtmlGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<FileHtmlEdge>;
  nodes: Array<FileHtml>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<FileHtmlGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type FileHtmlGroupConnectionDistinctArgs = {
  field: FileHtmlFieldsEnum;
};


export type FileHtmlGroupConnectionMaxArgs = {
  field: FileHtmlFieldsEnum;
};


export type FileHtmlGroupConnectionMinArgs = {
  field: FileHtmlFieldsEnum;
};


export type FileHtmlGroupConnectionSumArgs = {
  field: FileHtmlFieldsEnum;
};


export type FileHtmlGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: FileHtmlFieldsEnum;
};

export type FileHtmlSortInput = {
  fields?: InputMaybe<Array<InputMaybe<FileHtmlFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type ErrorConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ErrorEdge>;
  nodes: Array<Error>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<ErrorGroupConnection>;
};


export type ErrorConnectionDistinctArgs = {
  field: ErrorFieldsEnum;
};


export type ErrorConnectionMaxArgs = {
  field: ErrorFieldsEnum;
};


export type ErrorConnectionMinArgs = {
  field: ErrorFieldsEnum;
};


export type ErrorConnectionSumArgs = {
  field: ErrorFieldsEnum;
};


export type ErrorConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: ErrorFieldsEnum;
};

export type ErrorEdge = {
  next?: Maybe<Error>;
  node: Error;
  previous?: Maybe<Error>;
};

export type ErrorFieldsEnum =
  | 'message'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type ErrorGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ErrorEdge>;
  nodes: Array<Error>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<ErrorGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type ErrorGroupConnectionDistinctArgs = {
  field: ErrorFieldsEnum;
};


export type ErrorGroupConnectionMaxArgs = {
  field: ErrorFieldsEnum;
};


export type ErrorGroupConnectionMinArgs = {
  field: ErrorFieldsEnum;
};


export type ErrorGroupConnectionSumArgs = {
  field: ErrorFieldsEnum;
};


export type ErrorGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: ErrorFieldsEnum;
};

export type ErrorFilterInput = {
  message?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type ErrorSortInput = {
  fields?: InputMaybe<Array<InputMaybe<ErrorFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type PageContentYamlConnection = {
  totalCount: Scalars['Int'];
  edges: Array<PageContentYamlEdge>;
  nodes: Array<PageContentYaml>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<PageContentYamlGroupConnection>;
};


export type PageContentYamlConnectionDistinctArgs = {
  field: PageContentYamlFieldsEnum;
};


export type PageContentYamlConnectionMaxArgs = {
  field: PageContentYamlFieldsEnum;
};


export type PageContentYamlConnectionMinArgs = {
  field: PageContentYamlFieldsEnum;
};


export type PageContentYamlConnectionSumArgs = {
  field: PageContentYamlFieldsEnum;
};


export type PageContentYamlConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: PageContentYamlFieldsEnum;
};

export type PageContentYamlEdge = {
  next?: Maybe<PageContentYaml>;
  node: PageContentYaml;
  previous?: Maybe<PageContentYaml>;
};

export type PageContentYamlFieldsEnum =
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'name'
  | 'meta___title'
  | 'meta___description'
  | 'meta___image'
  | 'meta___twitter'
  | 'sections'
  | 'sections___title'
  | 'sections___description'
  | 'sections___level'
  | 'sections___defaultCallToAction'
  | 'sections___cards'
  | 'sections___cards___title'
  | 'sections___cards___content'
  | 'sections___cards___callToAction'
  | 'sections___cards___link'
  | 'sections___cards___flag';

export type PageContentYamlGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<PageContentYamlEdge>;
  nodes: Array<PageContentYaml>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<PageContentYamlGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type PageContentYamlGroupConnectionDistinctArgs = {
  field: PageContentYamlFieldsEnum;
};


export type PageContentYamlGroupConnectionMaxArgs = {
  field: PageContentYamlFieldsEnum;
};


export type PageContentYamlGroupConnectionMinArgs = {
  field: PageContentYamlFieldsEnum;
};


export type PageContentYamlGroupConnectionSumArgs = {
  field: PageContentYamlFieldsEnum;
};


export type PageContentYamlGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: PageContentYamlFieldsEnum;
};

export type PageContentYamlSortInput = {
  fields?: InputMaybe<Array<InputMaybe<PageContentYamlFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type FileInlineTocConnection = {
  totalCount: Scalars['Int'];
  edges: Array<FileInlineTocEdge>;
  nodes: Array<FileInlineToc>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<FileInlineTocGroupConnection>;
};


export type FileInlineTocConnectionDistinctArgs = {
  field: FileInlineTocFieldsEnum;
};


export type FileInlineTocConnectionMaxArgs = {
  field: FileInlineTocFieldsEnum;
};


export type FileInlineTocConnectionMinArgs = {
  field: FileInlineTocFieldsEnum;
};


export type FileInlineTocConnectionSumArgs = {
  field: FileInlineTocFieldsEnum;
};


export type FileInlineTocConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: FileInlineTocFieldsEnum;
};

export type FileInlineTocEdge = {
  next?: Maybe<FileInlineToc>;
  node: FileInlineToc;
  previous?: Maybe<FileInlineToc>;
};

export type FileInlineTocFieldsEnum =
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'tableOfContents___content'
  | 'tableOfContents___content___key'
  | 'tableOfContents___content___values'
  | 'tableOfContents___content___values___linkTitle'
  | 'tableOfContents___content___values___link'
  | 'tableOfContents___content___values___content'
  | 'slug';

export type FileInlineTocGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<FileInlineTocEdge>;
  nodes: Array<FileInlineToc>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<FileInlineTocGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type FileInlineTocGroupConnectionDistinctArgs = {
  field: FileInlineTocFieldsEnum;
};


export type FileInlineTocGroupConnectionMaxArgs = {
  field: FileInlineTocFieldsEnum;
};


export type FileInlineTocGroupConnectionMinArgs = {
  field: FileInlineTocFieldsEnum;
};


export type FileInlineTocGroupConnectionSumArgs = {
  field: FileInlineTocFieldsEnum;
};


export type FileInlineTocGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: FileInlineTocFieldsEnum;
};

export type FileInlineTocSortInput = {
  fields?: InputMaybe<Array<InputMaybe<FileInlineTocFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type FileHtmlVersionConnection = {
  totalCount: Scalars['Int'];
  edges: Array<FileHtmlVersionEdge>;
  nodes: Array<FileHtmlVersion>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<FileHtmlVersionGroupConnection>;
};


export type FileHtmlVersionConnectionDistinctArgs = {
  field: FileHtmlVersionFieldsEnum;
};


export type FileHtmlVersionConnectionMaxArgs = {
  field: FileHtmlVersionFieldsEnum;
};


export type FileHtmlVersionConnectionMinArgs = {
  field: FileHtmlVersionFieldsEnum;
};


export type FileHtmlVersionConnectionSumArgs = {
  field: FileHtmlVersionFieldsEnum;
};


export type FileHtmlVersionConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: FileHtmlVersionFieldsEnum;
};

export type FileHtmlVersionEdge = {
  next?: Maybe<FileHtmlVersion>;
  node: FileHtmlVersion;
  previous?: Maybe<FileHtmlVersion>;
};

export type FileHtmlVersionFieldsEnum =
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'internal___contentFilePath'
  | 'parentSlug'
  | 'slug'
  | 'version';

export type FileHtmlVersionGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<FileHtmlVersionEdge>;
  nodes: Array<FileHtmlVersion>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<FileHtmlVersionGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type FileHtmlVersionGroupConnectionDistinctArgs = {
  field: FileHtmlVersionFieldsEnum;
};


export type FileHtmlVersionGroupConnectionMaxArgs = {
  field: FileHtmlVersionFieldsEnum;
};


export type FileHtmlVersionGroupConnectionMinArgs = {
  field: FileHtmlVersionFieldsEnum;
};


export type FileHtmlVersionGroupConnectionSumArgs = {
  field: FileHtmlVersionFieldsEnum;
};


export type FileHtmlVersionGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: FileHtmlVersionFieldsEnum;
};

export type FileHtmlVersionSortInput = {
  fields?: InputMaybe<Array<InputMaybe<FileHtmlVersionFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type FileHtmlPartialConnection = {
  totalCount: Scalars['Int'];
  edges: Array<FileHtmlPartialEdge>;
  nodes: Array<FileHtmlPartial>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<FileHtmlPartialGroupConnection>;
};


export type FileHtmlPartialConnectionDistinctArgs = {
  field: FileHtmlPartialFieldsEnum;
};


export type FileHtmlPartialConnectionMaxArgs = {
  field: FileHtmlPartialFieldsEnum;
};


export type FileHtmlPartialConnectionMinArgs = {
  field: FileHtmlPartialFieldsEnum;
};


export type FileHtmlPartialConnectionSumArgs = {
  field: FileHtmlPartialFieldsEnum;
};


export type FileHtmlPartialConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: FileHtmlPartialFieldsEnum;
};

export type FileHtmlPartialEdge = {
  next?: Maybe<FileHtmlPartial>;
  node: FileHtmlPartial;
  previous?: Maybe<FileHtmlPartial>;
};

export type FileHtmlPartialFieldsEnum =
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'internal___contentFilePath'
  | 'articleType'
  | 'contentOrderedList'
  | 'contentOrderedList___data'
  | 'contentOrderedList___type'
  | 'relativePath';

export type FileHtmlPartialGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<FileHtmlPartialEdge>;
  nodes: Array<FileHtmlPartial>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<FileHtmlPartialGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type FileHtmlPartialGroupConnectionDistinctArgs = {
  field: FileHtmlPartialFieldsEnum;
};


export type FileHtmlPartialGroupConnectionMaxArgs = {
  field: FileHtmlPartialFieldsEnum;
};


export type FileHtmlPartialGroupConnectionMinArgs = {
  field: FileHtmlPartialFieldsEnum;
};


export type FileHtmlPartialGroupConnectionSumArgs = {
  field: FileHtmlPartialFieldsEnum;
};


export type FileHtmlPartialGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: FileHtmlPartialFieldsEnum;
};

export type FileHtmlPartialSortInput = {
  fields?: InputMaybe<Array<InputMaybe<FileHtmlPartialFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type DocumentPathConnection = {
  totalCount: Scalars['Int'];
  edges: Array<DocumentPathEdge>;
  nodes: Array<DocumentPath>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<DocumentPathGroupConnection>;
};


export type DocumentPathConnectionDistinctArgs = {
  field: DocumentPathFieldsEnum;
};


export type DocumentPathConnectionMaxArgs = {
  field: DocumentPathFieldsEnum;
};


export type DocumentPathConnectionMinArgs = {
  field: DocumentPathFieldsEnum;
};


export type DocumentPathConnectionSumArgs = {
  field: DocumentPathFieldsEnum;
};


export type DocumentPathConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: DocumentPathFieldsEnum;
};

export type DocumentPathEdge = {
  next?: Maybe<DocumentPath>;
  node: DocumentPath;
  previous?: Maybe<DocumentPath>;
};

export type DocumentPathFieldsEnum =
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'link'
  | 'label'
  | 'level';

export type DocumentPathGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<DocumentPathEdge>;
  nodes: Array<DocumentPath>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<DocumentPathGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type DocumentPathGroupConnectionDistinctArgs = {
  field: DocumentPathFieldsEnum;
};


export type DocumentPathGroupConnectionMaxArgs = {
  field: DocumentPathFieldsEnum;
};


export type DocumentPathGroupConnectionMinArgs = {
  field: DocumentPathFieldsEnum;
};


export type DocumentPathGroupConnectionSumArgs = {
  field: DocumentPathFieldsEnum;
};


export type DocumentPathGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: DocumentPathFieldsEnum;
};

export type DocumentPathFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  link?: InputMaybe<StringQueryOperatorInput>;
  label?: InputMaybe<StringQueryOperatorInput>;
  level?: InputMaybe<IntQueryOperatorInput>;
};

export type DocumentPathSortInput = {
  fields?: InputMaybe<Array<InputMaybe<DocumentPathFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type SubMenuFieldsFragment = { label: string, link: string, level?: number | null, text?: string | null };

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = { pageFurnitureYaml?: { items?: Array<{ label: string, link: string, level?: number | null, text?: string | null, items?: Array<{ label: string, link: string, level?: number | null, text?: string | null, items?: Array<{ label: string, link: string, level?: number | null, text?: string | null, items?: Array<{ label: string, link: string, level?: number | null, text?: string | null }> | null }> | null }> | null }> | null } | null, allDocumentPath: { edges: Array<{ node: { id: string, label?: string | null, level?: number | null, link?: string | null, parent?: { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | null } }> } };

export type HomePageQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePageQueryQuery = { pageContentYaml?: { sections?: Array<{ title?: string | null, level?: string | null, description?: string | null, defaultCallToAction?: string | null, cards?: Array<{ title?: string | null, content?: string | null, link?: string | null, flag?: string | null, callToAction?: string | null } | null> | null } | null> | null, meta?: { title?: string | null, description?: string | null, image?: string | null, twitter?: string | null } | null } | null };

export type Unnamed_2_QueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type Unnamed_2_Query = { document?: { meta?: { title?: string | null, meta_description?: string | null, languages?: Array<string | null> | null, redirect_from?: Array<string | null> | null } | null } | null, versions: { edges: Array<{ node: { parentSlug?: string | null, slug?: string | null, version?: string | null } }> }, inlineTOC?: { tableOfContents?: { content?: Array<{ key?: string | null, values?: Array<{ linkTitle?: string | null, link?: string | null } | null> | null } | null> | null } | null } | null };

export type Unnamed_3_QueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type Unnamed_3_Query = { document?: { meta?: { title?: string | null, meta_description?: string | null, languages?: Array<string | null> | null, redirect_from?: Array<string | null> | null } | null } | null, versions: { edges: Array<{ node: { parentSlug?: string | null, slug?: string | null, version?: string | null } }> }, inlineTOC?: { tableOfContents?: { content?: Array<{ key?: string | null, values?: Array<{ linkTitle?: string | null, link?: string | null } | null> | null } | null> | null } | null } | null };

export type GatsbyImageSharpFixedFragment = { base64?: string | null, width: number, height: number, src: string, srcSet: string };

export type GatsbyImageSharpFixed_TracedSvgFragment = { tracedSVG?: string | null, width: number, height: number, src: string, srcSet: string };

export type GatsbyImageSharpFixed_WithWebpFragment = { base64?: string | null, width: number, height: number, src: string, srcSet: string, srcWebp?: string | null, srcSetWebp?: string | null };

export type GatsbyImageSharpFixed_WithWebp_TracedSvgFragment = { tracedSVG?: string | null, width: number, height: number, src: string, srcSet: string, srcWebp?: string | null, srcSetWebp?: string | null };

export type GatsbyImageSharpFixed_NoBase64Fragment = { width: number, height: number, src: string, srcSet: string };

export type GatsbyImageSharpFixed_WithWebp_NoBase64Fragment = { width: number, height: number, src: string, srcSet: string, srcWebp?: string | null, srcSetWebp?: string | null };

export type GatsbyImageSharpFluidFragment = { base64?: string | null, aspectRatio: number, src: string, srcSet: string, sizes: string };

export type GatsbyImageSharpFluidLimitPresentationSizeFragment = { maxHeight: number, maxWidth: number };

export type GatsbyImageSharpFluid_TracedSvgFragment = { tracedSVG?: string | null, aspectRatio: number, src: string, srcSet: string, sizes: string };

export type GatsbyImageSharpFluid_WithWebpFragment = { base64?: string | null, aspectRatio: number, src: string, srcSet: string, srcWebp?: string | null, srcSetWebp?: string | null, sizes: string };

export type GatsbyImageSharpFluid_WithWebp_TracedSvgFragment = { tracedSVG?: string | null, aspectRatio: number, src: string, srcSet: string, srcWebp?: string | null, srcSetWebp?: string | null, sizes: string };

export type GatsbyImageSharpFluid_NoBase64Fragment = { aspectRatio: number, src: string, srcSet: string, sizes: string };

export type GatsbyImageSharpFluid_WithWebp_NoBase64Fragment = { aspectRatio: number, src: string, srcSet: string, srcWebp?: string | null, srcSetWebp?: string | null, sizes: string };
