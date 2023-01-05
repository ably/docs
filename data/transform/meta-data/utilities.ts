import DataTypes from '../../../data/types';
import { FrontMatterResult } from 'front-matter';
import { NO_MATCH, tryRetrieveMetaData } from '../front-matter';
import { processAfterFrontmatterExtracted } from '../parser-enhancements';

const INLINE_TOC_REGEX = /^inline-toc\.[\r\n\s]*^([\s\S]*?)^\s*$/m;

const tryRetrieveInlineTOC = (contentString: string) => contentString.match(INLINE_TOC_REGEX);
const removeInlineTOC = (contentString: string) => contentString.replace(INLINE_TOC_REGEX, '');

export const retrieveAndReplaceInlineTOC = (contentString: string) => ({
  noInlineTOC: removeInlineTOC(contentString),
  // eslint-disable-next-line no-sparse-arrays
  inlineTOCOnly: (tryRetrieveInlineTOC(contentString) ?? [, null])[1],
});

// Just the partial name: /<%=\s+partial\s+partial_version\('([^')]*)'\)[^%>]*%>/
const parseNanocPartials = (contentString: string) =>
  contentString.split(/(<%=\s+partial\s+partial_version\('[^')]*'\)[^%>]*%>)/);

const removeFalsy = (dataArray: string[]) => dataArray.filter((x) => !!x);

const removeFalseFromPartials = (text: string) => {
  const withPartials = parseNanocPartials(text);
  const withoutFalsyValues = removeFalsy(withPartials);
  return withoutFalsyValues;
};

const constructDataObjectsFromStrings = (
  contentStrings: string[],
  frontmatterMeta: FrontMatterResult<Record<string, string>> | false,
) => {
  contentStrings =
    frontmatterMeta !== NO_MATCH && frontmatterMeta.attributes
      ? contentStrings.map((content) => processAfterFrontmatterExtracted(content, frontmatterMeta.attributes))
      : contentStrings;
  const dataObjects = contentStrings.map((data, i) =>
    i % 2 === 0 ? { data: data, type: DataTypes.Html } : { data: data, type: DataTypes.Partial },
  );
  return dataObjects;
};

export const splitDataAndMetaData = (text: string) => {
  const withoutFalsyValues = removeFalseFromPartials(text);
  const frontmatterMeta = tryRetrieveMetaData(withoutFalsyValues[0]);
  if (frontmatterMeta !== NO_MATCH) {
    withoutFalsyValues[0] = frontmatterMeta.body;
  }

  const asDataObjects = constructDataObjectsFromStrings(withoutFalsyValues, frontmatterMeta);
  return {
    data: asDataObjects,
    frontmatterMeta,
  };
};
