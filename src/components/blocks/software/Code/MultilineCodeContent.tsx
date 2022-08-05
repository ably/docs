import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';

const chooseString = (condition: boolean, firstString: string, secondString: string) =>
  condition ? firstString : secondString;

const conditionallyRenderContent = (
  dataContainsKey: boolean,
  signedIn: boolean,
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
  displayLanguage,
}: {
  signedIn: boolean;
  dataContainsKey: boolean;
  contentWithObfuscatedKey: string;
  contentWithKey: string;
  content: string;
  displayLanguage: string;
}) => {
  const renderedContent = conditionallyRenderContent(
    dataContainsKey,
    signedIn,
    content,
    contentWithKey,
    contentWithObfuscatedKey,
  );
  return (
    <SyntaxHighlighter
      className="ui-text-code"
      style={{ hljs: { background: 'inherit', fontSize: `var(--fs-code)`, lineHeight: `var(--lh-loose)` } }}
      language={displayLanguage}
    >
      {renderedContent}
    </SyntaxHighlighter>
  );
};
