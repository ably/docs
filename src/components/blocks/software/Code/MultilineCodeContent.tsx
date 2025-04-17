import React, { useMemo, useRef } from 'react';
import DOMPurify from 'dompurify';
import { truncate } from 'lodash/fp';
import { highlightSnippet, registerDefaultLanguages } from '@ably/ui/core/utils/syntax-highlighter';
import languagesRegistry from '@ably/ui/core/utils/syntax-highlighter-registry';

registerDefaultLanguages(languagesRegistry);

const TRUNCATION_CHARACTER_THRESHOLD = 20;
const truncationRegex = new RegExp(`^[A-Za-z0-9_-]{6}.[A-Za-z0-9_-]{6}:[A-Za-z0-9_-]{43}$`, 'gu');

const chooseString = (condition: boolean, firstString: string, secondString: string) =>
  condition ? firstString : secondString;

const conditionallyRenderContent = (
  dataContainsKey: boolean,
  signedIn: boolean | undefined,
  content: string,
  contentWithKey: string,
  contentWithObfuscatedKey: string,
) =>
  chooseString(
    dataContainsKey,
    chooseString(signedIn || !!process.env.GATSBY_DOCS_SIGNED_IN, contentWithObfuscatedKey, contentWithKey),
    content,
  );

export const MultilineCodeContent = ({
  signedIn,
  dataContainsKey,
  contentWithObfuscatedKey,
  contentWithKey,
  content,
  language,
}: {
  signedIn?: boolean;
  dataContainsKey: boolean;
  contentWithObfuscatedKey: string;
  contentWithKey: string;
  content: string;
  language: string;
}) => {
  const preRef = useRef<HTMLPreElement>(null);
  const renderedContent = conditionallyRenderContent(
    dataContainsKey,
    signedIn,
    content,
    contentWithKey,
    contentWithObfuscatedKey,
  );

  const truncatedContent = renderedContent.replaceAll(
    truncationRegex,
    (_, p1) => `'${truncate({ length: TRUNCATION_CHARACTER_THRESHOLD }, p1)}'`,
  );

  const highlightedContent = useMemo(() => highlightSnippet(language, truncatedContent), [language, truncatedContent]);

  return (
    <code
      ref={preRef}
      className="ui-text-code"
      style={{ whiteSpace: 'pre-wrap' }}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize
          ? DOMPurify.sanitize(highlightedContent ?? '', {
              // The SVG and Math tags have been used in the past as attack vectors for mXSS,
              // but if we really need them should be safe enough to enable.
              // This is probably too cautious but we have no need for them at time of writing, so forbidding them is free.
              FORBID_TAGS: ['svg', 'math'],
            }) || ''
          : highlightedContent ?? '',
      }}
    />
  );
};
