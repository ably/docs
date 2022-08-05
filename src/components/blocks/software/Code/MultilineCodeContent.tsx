import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';

export const MultilineCodeContent = ({
  signedIn,
  dataContainsKey,
  contentWithObfuscatedKey,
  contentWithKey,
  content,
  displayLanguage,
}: {
  signedIn: boolean;
  dataContainsKey: boolean;
  contentWithObfuscatedKey: string;
  contentWithKey: string;
  content: string;
  displayLanguage: string;
}) => {
  const contentMaybeWithKey = dataContainsKey
    ? signedIn || !!process.env.GATSBY_DOCS_SIGNED_IN
      ? contentWithObfuscatedKey
      : contentWithKey
    : content;
  return (
    <SyntaxHighlighter
      className="ui-text-code"
      style={{ hljs: { background: 'inherit', fontSize: `var(--fs-code)`, lineHeight: `var(--lh-loose)` } }}
      language={displayLanguage}
    >
      {contentMaybeWithKey}
    </SyntaxHighlighter>
  );
};
