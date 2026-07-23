import React from 'react';
import {
  highlightSnippet,
  LINE_HIGHLIGHT_CLASSES,
  registerDefaultLanguages,
  splitHtmlLines,
} from 'src/utilities/syntax-highlighter';
import languagesRegistry from 'src/utilities/syntax-highlighter-registry';
import cn from 'src/utilities/cn';

registerDefaultLanguages(languagesRegistry);

export type LineHighlightType = 'addition' | 'removal' | 'highlight';

type CodeProps = {
  language: string;
  snippet: string;
  textSize?: string;
  padding?: string;
  additionalCSS?: string;
  showLines?: boolean;
  lineCSS?: string;
  wrap?: boolean;
  lineHighlights?: Record<number, LineHighlightType>;
};

const Code = ({
  language,
  snippet,
  textSize = 'ui-text-code',
  padding = 'p-8',
  additionalCSS = '',
  showLines,
  lineCSS,
  wrap = false,
  lineHighlights,
}: CodeProps) => {
  const trimmedSnippet = snippet.trimEnd();
  const HTMLraw = highlightSnippet(language, trimmedSnippet) ?? '';
  const className = `language-${language} ${textSize}`;

  const lines = trimmedSnippet.split(/\r\n|\r|\n/);
  const lineCount = lines.length;

  const hasHighlights = lineHighlights && Object.keys(lineHighlights).length > 0;

  // Per-line rendering when highlights are present
  if (hasHighlights) {
    const htmlLines = splitHtmlLines(HTMLraw);

    return (
      <div className={cn('hljs overflow-y-auto', padding, additionalCSS)} data-id="code">
        <pre
          lang={language}
          className={cn(
            'h-full flex-1 text-p4 leading-normal',
            wrap ? 'whitespace-pre-wrap break-words' : 'overflow-x-auto',
          )}
        >
          <code className={className}>
            {htmlLines.map((lineHtml, i) => {
              const lineNum = i + 1;
              const highlightType = lineHighlights[lineNum];
              const highlightClass = highlightType ? LINE_HIGHLIGHT_CLASSES[highlightType] : undefined;

              return (
                <span key={i} className={cn('flex min-w-full pl-2', highlightClass)}>
                  {showLines && (
                    <span
                      className={cn(
                        'mr-4 font-mono text-right text-neutral-800 select-none shrink-0 inline-block leading-normal',
                        lineCSS,
                      )}
                      style={{ minWidth: `${String(lineCount).length}ch` }}
                    >
                      {lineNum}
                    </span>
                  )}
                  <span
                    className="flex-1 !leading-normal"
                    dangerouslySetInnerHTML={{
                      __html: lineHtml || '&nbsp;',
                    }}
                  />
                </span>
              );
            })}
          </code>
        </pre>
      </div>
    );
  }

  // Default: single-block rendering (no highlights)
  return (
    <div className={cn('hljs overflow-y-auto flex', padding, additionalCSS)} data-id="code">
      {showLines ? (
        <div className="text-p4 leading-normal pt-px">
          {[...Array(lineCount)].map((_, i) => (
            <p className={cn('mr-4 font-mono text-right text-neutral-800', lineCSS)} key={i}>
              {i + 1}
            </p>
          ))}
        </div>
      ) : null}
      <pre
        lang={language}
        className={cn(
          'h-full flex-1 text-p4 leading-normal',
          wrap ? 'whitespace-pre-wrap break-words' : 'overflow-x-auto',
        )}
      >
        <code className={className} dangerouslySetInnerHTML={{ __html: HTMLraw }} />
      </pre>
    </div>
  );
};

export default Code;
