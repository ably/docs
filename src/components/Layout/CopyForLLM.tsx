import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from '@reach/router';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Icon from '@ably/ui/core/Icon';
import { IconName } from '@ably/ui/core/Icon/types';
import { track } from '@ably/ui/core/insights';
import { productData } from 'src/data';
import { languageInfo } from 'src/data/languages';
import { useLayoutContext } from 'src/contexts/layout-context';

const menuItemClassName =
  'flex items-center gap-2 px-3 py-2 text-sm text-neutral-1300 dark:text-neutral-000 hover:bg-neutral-100 dark:hover:bg-neutral-1200 rounded cursor-pointer outline-none';

const CopyForLLM: React.FC = () => {
  const { activePage } = useLayoutContext();
  const { language, product, page } = activePage;
  const location = useLocation();
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const llmLinks = useMemo(() => {
    const docUrl = `https://ably.com${page.link}.md`;
    const prompt = `Fetch the documentation from ${docUrl} and tell me more about ${product ? productData[product]?.nav.name : 'Ably'}'s '${page.name}' feature${language ? ` for ${languageInfo[language]?.label}` : ''}`;
    const gptPath = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
    const claudePath = `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;
    const perplexityPath = `https://www.perplexity.ai/?q=${encodeURIComponent(prompt)}`;

    return [
      { model: 'gpt', label: 'Open in ChatGPT', icon: 'icon-tech-openai', link: gptPath },
      { model: 'claude', label: 'Open in Claude', icon: 'icon-tech-claude-mono', link: claudePath },
      { model: 'perplexity', label: 'Open in Perplexity', icon: 'icon-tech-perplexity', link: perplexityPath },
    ];
  }, [product, page.name, page.link, language]);

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    const fetchMarkdown = async () => {
      try {
        const response = await fetch(`${location.pathname}.md`, {
          signal: abortController.signal,
          headers: { Accept: 'text/markdown' },
        });

        if (!isMounted) return;

        if (!response.ok) {
          if (response.status === 404) {
            setMarkdownContent(null);
            return;
          }
          throw new Error(`Failed to fetch markdown: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('Content-Type')?.toLowerCase() || '';
        const isMarkdownType =
          contentType.includes('text/markdown') ||
          contentType.includes('application/markdown') ||
          contentType.includes('text/plain');

        if (contentType && !isMarkdownType) {
          if (contentType.includes('text/html') || contentType.includes('application/json')) {
            throw new Error(`Received ${contentType} response instead of markdown for ${location.pathname}.md`);
          }
          console.warn(
            `Markdown fetch: unexpected content type "${contentType}" for ${location.pathname}.md, accepting anyway`,
          );
        }

        const content = await response.text();
        if (isMounted) {
          setMarkdownContent(content);
        }
      } catch (error) {
        if (!isMounted || (error instanceof Error && error.name === 'AbortError')) return;
        const errorMessage = error instanceof Error ? error.message : String(error);
        if (!errorMessage.includes('404')) {
          console.error(`Failed to fetch markdown for ${location.pathname}:`, {
            error: errorMessage,
            path: `${location.pathname}.md`,
            errorType: error instanceof Error ? error.name : typeof error,
          });
        }
        setMarkdownContent(null);
      }
    };

    fetchMarkdown();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [location.pathname]);

  const handleCopyMarkdown = useCallback(() => {
    if (!markdownContent) return;

    try {
      navigator.clipboard.writeText(markdownContent);
      setCopyFeedback('Copied!');
      setTimeout(() => setCopyFeedback(null), 2000);

      track('markdown_copy_link_clicked', {
        location: location.pathname,
      });
    } catch (error) {
      console.error('Failed to copy markdown:', error);
      setCopyFeedback('Error!');
      setTimeout(() => setCopyFeedback(null), 2000);
    }
  }, [markdownContent, location.pathname]);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-1.5 ui-text-label4 font-semibold text-neutral-900 dark:text-neutral-400 hover:text-neutral-1300 dark:hover:text-neutral-000 focus-base rounded px-2 py-1 transition-colors cursor-pointer">
          <Icon name="icon-gui-document-text-outline" size="16px" />
          <span>Copy for LLM</span>
          <Icon name="icon-gui-chevron-down-micro" size="16px" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-neutral-000 dark:bg-neutral-1300 border border-neutral-300 dark:border-neutral-1000 rounded-lg ui-shadow-lg-medium p-1 z-50"
          sideOffset={5}
          align="start"
        >
          {markdownContent && (
            <>
              <DropdownMenu.Item className={menuItemClassName} asChild>
                <a
                  href={`${location.pathname}.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    track('markdown_preview_link_clicked', {
                      location: location.pathname,
                    });
                  }}
                >
                  <Icon name="icon-gui-eye-outline" size="20px" />
                  <span>View as markdown</span>
                </a>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className={menuItemClassName}
                onSelect={(e) => {
                  e.preventDefault();
                  handleCopyMarkdown();
                }}
              >
                <Icon name="icon-gui-square-2-stack-outline" size="20px" />
                <span>{copyFeedback ?? 'Copy as markdown'}</span>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="h-px bg-neutral-300 dark:bg-neutral-1000 my-1" />
            </>
          )}
          {llmLinks.map(({ model, label, icon, link }) => (
            <DropdownMenu.Item key={model} className={menuItemClassName} asChild>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="justify-between"
                onClick={() => {
                  track('llm_link_clicked', {
                    model,
                    location: location.pathname,
                    link,
                  });
                }}
              >
                <div className="flex items-center gap-2">
                  <Icon name={icon as IconName} size="20px" />
                  <span>{label}</span>
                </div>
                <Icon name="icon-gui-arrow-top-right-on-square-outline" size="16px" />
              </a>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default CopyForLLM;
