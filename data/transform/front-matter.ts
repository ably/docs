import fm from 'front-matter';
import { assign, isArray, isEmpty, pick } from 'lodash';

export const NO_MATCH = false;
const ALLOWED_META_FIELDS = ['title', 'meta_description', 'languages', 'redirect_from'];

const maybeStringToStringSingletonArray = (maybeString?: string | string[]) =>
  isEmpty(maybeString) ? undefined : isArray(maybeString) ? maybeString : [maybeString];

export const tryRetrieveMetaData = (metaDataString: string) => {
  const frontMatter = fm(metaDataString);
  return isEmpty(frontMatter.attributes) ? NO_MATCH : frontMatter;
};

export const filterAllowedMetaFields = (metaObject: Record<string, string | string[]>) =>
  pick(metaObject, ALLOWED_META_FIELDS);

export const prepareAllowedMetaFields = (metaObject: Record<string, string | string[]>) =>
  assign(metaObject, {
    redirect_from: maybeStringToStringSingletonArray(metaObject.redirect_from),
  });
