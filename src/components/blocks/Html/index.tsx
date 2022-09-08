import React from 'react';
import DOMPurify from 'dompurify';
import blocksFromData from '../blocks-from-data';
import { isArray } from 'lodash';
import ConditionalChildrenLanguageDisplay from '../wrappers/ConditionalChildrenLanguageDisplay';

// This is not to be used in production.
const DangerousHtml = ({ data }: { data: string }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(data, {
        // The SVG and Math tags have been used in the past as attack vectors for mXSS,
        // but if we really need them should be safe enough to enable.
        // This is probably too cautious but we have no need for them at time of writing, so forbidding them is free.
        FORBID_TAGS: ['svg', 'math'],
      }),
    }}
  ></div>
);

interface HtmlProps {
  data: string | any[] | null | undefined;
}

const Html = ({ data }: HtmlProps) => {
  return isArray(data) ? (
    <ConditionalChildrenLanguageDisplay>{blocksFromData(data)}</ConditionalChildrenLanguageDisplay>
  ) : (
    <>{data}</>
  );
};

export { DangerousHtml };
export default Html;
