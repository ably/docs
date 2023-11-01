import React, { FC, useMemo } from 'react';
import DOMPurify from 'dompurify';
import { highlightSnippet, registerDefaultLanguages } from '@ably/ui/src/core/utils/syntax-highlighter';
import languagesRegistry from '@ably/ui/src/core/utils/syntax-highlighter-registry';

import '@ably/ui/src/core/utils/syntax-highlighter.css';

registerDefaultLanguages(languagesRegistry);

export const CodeBlock: FC<{ children: React.ReactNode; language: string }> = ({
  children,
  language = 'javascript',
}) => {
  const highlightedContent = useMemo(() => {
    const content = children.props.children; // hack-ish, but we get the content
    return highlightSnippet(language, content);
  }, [language, children]);

  return (
    <pre className="bg-cool-black text-white p-0 rounded-lg relative overflow-hidden">
      <div className="overflow-auto relative p-16">
        <code
          className="ui-text-code"
          style={{ whiteSpace: 'pre-wrap' }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize
              ? DOMPurify.sanitize(highlightedContent, {
                  // The SVG and Math tags have been used in the past as attack vectors for mXSS,
                  // but if we really need them should be safe enough to enable.
                  // This is probably too cautious but we have no need for them at time of writing, so forbidding them is free.
                  FORBID_TAGS: ['svg', 'math'],
                })
              : highlightedContent,
          }}
        />
      </div>
    </pre>
  );
};
