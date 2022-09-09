import React, { useLayoutEffect, useRef } from 'react';
import Prism from 'prismjs';
import cn from 'classnames';

import './prismjs-overwrite.css';

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
  displayLanguage,
}: {
  signedIn?: boolean;
  dataContainsKey: boolean;
  contentWithObfuscatedKey: string;
  contentWithKey: string;
  content: string;
  displayLanguage: string;
}) => {
  const preRef = useRef<HTMLPreElement>(null);
  const renderedContent = conditionallyRenderContent(
    dataContainsKey,
    signedIn,
    content,
    contentWithKey,
    contentWithObfuscatedKey,
  );

  useLayoutEffect(() => {
    Prism.hooks.add('before-highlight', function (env) {
      env.code = env.element.innerHTML;
    });

    if (preRef.current) {
      Prism.highlightElement(preRef.current);
    }
  }, [displayLanguage]);

  return (
    <code ref={preRef} className={cn(`language-${displayLanguage} p-32`)} style={{ whiteSpace: 'pre-wrap' }}>
      {renderedContent}
    </code>
  );
};
