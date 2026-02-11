import React, { FC, useMemo } from 'react';
import DOMPurify from 'dompurify';
import Icon from '@ably/ui/core/Icon';
import { highlightSnippet, registerDefaultLanguages } from '@ably/ui/core/utils/syntax-highlighter';
import languagesRegistry from '@ably/ui/core/utils/syntax-highlighter-registry';
import { getLanguageInfo } from '@ably/ui/core/CodeSnippet/languages';

registerDefaultLanguages(languagesRegistry);

import { ButtonWithTooltip } from 'src/components/ButtonWithTooltip';
import { safeWindow } from 'src/utilities';
import { copyCodeBlockContentTracker } from 'src/external-scripts/google-tag-manager/events';

export const CodeBlock: FC<{ children: React.ReactNode; language: string }> = ({
  children,
  language = 'javascript',
}) => {
  const content = children.props.children; // hack-ish, but we get the content
  const resolvedLanguage = getLanguageInfo(language).syntaxHighlighterKey || language;
  const highlightedContent = useMemo(() => {
    return highlightSnippet(resolvedLanguage, content);
  }, [resolvedLanguage, content]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    const page = safeWindow.location.pathname;
    const contentIdentifier = content.slice(0, 10);
    copyCodeBlockContentTracker({
      copyCodeBlockContent: `docs - ${language} ${page} ${contentIdentifier}`,
    });
  };

  return (
    <pre className="ui-theme-dark bg-cool-black text-white p-0 rounded-lg relative max-w-[calc(100vw-48px)] sm:max-w-full">
      <div className="overflow-auto relative p-4 pr-8">
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
      <div className="absolute top-4 right-2">
        <ButtonWithTooltip tooltip="Copy" notification="Copied!" onClick={handleCopy} className="text-white">
          <Icon name="icon-gui-square-2-stack-micro" size="1rem" color="text-neutral-000" />
        </ButtonWithTooltip>
      </div>
    </pre>
  );
};
