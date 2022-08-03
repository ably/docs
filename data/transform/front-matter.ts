import fm from 'front-matter';
import { isEmpty, pick } from 'lodash';

export const NO_MATCH = false;
const ALLOWED_META_FIELDS = ['title', 'meta_description', 'languages'];

export const tryRetrieveMetaData = (metaDataString: string) => {
  const frontMatter = fm(metaDataString);
  return isEmpty(frontMatter.attributes) ? NO_MATCH : frontMatter;
};

export const filterAllowedMetaFields = (metaObject: Record<string, string | string[]>) =>
  pick(metaObject, ALLOWED_META_FIELDS);
