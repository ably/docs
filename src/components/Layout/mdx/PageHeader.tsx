import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from '@reach/router';
import * as Tooltip from '@radix-ui/react-tooltip';
import cn from '@ably/ui/core/utils/cn';
import Icon from '@ably/ui/core/Icon';
import { IconName } from '@ably/ui/core/Icon/types';
import { LanguageSelector } from '../LanguageSelector';
import { track } from '@ably/ui/core/insights';
import { productData } from 'src/data';
import { languageData, languageInfo } from 'src/data/languages';
import { useLayoutContext } from 'src/contexts/layout-context';
import { interactiveButtonClassName, tooltipContentClassName } from '../utils/styles';
import { ProductKey } from 'src/data/types';

type PageHeaderProps = {
  title: string;
  intro: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title, intro }) => {
  const { activePage } = useLayoutContext();
  const { language, product, page } = activePage;
  const location = useLocation();
  const [copyTooltipOpen, setCopyTooltipOpen] = useState(false);
  const [copyTooltipContent, setCopyTooltipContent] = useState('Copy');
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);

  const llmLinks = useMemo(() => {
    const prompt = `Tell me more about ${product ? productData[product]?.nav.name : 'Ably'}'s '${page.name}' feature from https://ably.com${page.link}${language ? ` for ${languageInfo[language]?.label}` : ''}`;
    const gptPath = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
    const claudePath = `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;

    return [
      { model: 'gpt', label: 'ChatGPT', icon: 'icon-tech-openai', link: gptPath },
      { model: 'claude', label: 'Claude', icon: 'icon-tech-claude-mono', link: claudePath },
    ];
  }, [product, page.name, page.link, language]);

  const showLanguageSelector = useMemo(
    () =>
      activePage.languages.length > 0 &&
      !activePage.languages.every(
        (language) => !Object.keys(languageData[product as ProductKey] ?? {}).includes(language),
      ),
    [activePage.languages, product],
  );

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    const fetchMarkdown = async () => {
      try {
        const response = await fetch(`${location.pathname}.md`, {
          signal: abortController.signal,
        });

        if (!isMounted) {
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch markdown: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('text/markdown')) {
          throw new Error(`Invalid content type: expected text/markdown, got ${contentType}`);
        }

        const content = await response.text();

        // Only update state if component is still mounted
        if (isMounted) {
          setMarkdownContent(content);
        }
      } catch (error) {
        // Ignore all errors if component is unmounted or if it's an abort error
        if (!isMounted || (error instanceof Error && error.name === 'AbortError')) {
          return;
        }
        console.error('Failed to fetch markdown:', error);
        setMarkdownContent(null);
      }
    };

    fetchMarkdown();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [location.pathname]);

  const resetCopyTooltip = useCallback(() => {
    setCopyTooltipOpen(true);
    setTimeout(() => {
      setCopyTooltipOpen(false);
      setTimeout(() => setCopyTooltipContent('Copy'), 150);
    }, 2000);
  }, []);

  const handleCopyMarkdown = () => {
    if (!markdownContent) {
      return;
    }

    try {
      navigator.clipboard.writeText(markdownContent);
      setCopyTooltipContent('Copied!');
      resetCopyTooltip();

      track('markdown_copy_link_clicked', {
        location: location.pathname,
      });
    } catch (error) {
      console.error('Failed to copy markdown:', error);
      setCopyTooltipContent('Error!');
      resetCopyTooltip();
    }
  };

  return (
    <div className="my-8 border-b border-neutral-300 dark:border-neutral-1000 pb-8">
      <h1 className={cn('ui-text-h1', intro ? 'mb-4' : 'mb-8')}>{title}</h1>
      {intro && (
        <p className="text-neutral-800 dark:text-neutral-500 font-serif italic tracking-tight text-lg leading-normal mb-8">
          {intro}
        </p>
      )}

      <div className="flex items-center gap-5 flex-wrap">
        {showLanguageSelector && (
          <div className="flex items-center h-8 border-r border-neutral-300 dark:border-neutral-1000 pr-5">
            <LanguageSelector />
          </div>
        )}

        <Tooltip.Provider delayDuration={0} disableHoverableContent>
          {markdownContent && (
            <div className="flex items-center gap-0.5 border-r border-neutral-300 dark:border-neutral-1000 pr-5">
              <span className="text-p4 font-semibold text-neutral-900 dark:text-neutral-400 mr-1.5">Markdown</span>
              <Tooltip.Root open={copyTooltipOpen} onOpenChange={setCopyTooltipOpen}>
                <Tooltip.Trigger asChild>
                  <button
                    className={interactiveButtonClassName}
                    onClick={handleCopyMarkdown}
                    aria-label="Copy Markdown"
                  >
                    <Icon name="icon-gui-square-2-stack-outline" size="20px" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content className={tooltipContentClassName}>{copyTooltipContent}</Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <a
                    href={`${location.pathname}.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={interactiveButtonClassName}
                    onClick={() => {
                      track('markdown_preview_link_clicked', {
                        location: location.pathname,
                      });
                    }}
                  >
                    <Icon name="icon-gui-eye-outline" size="20px" />
                  </a>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content className={tooltipContentClassName}>View</Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </div>
          )}
          <div className="flex items-center gap-0.5">
            <span className="text-p4 font-semibold text-neutral-900 dark:text-neutral-400 mr-1.5">Open in</span>
            {llmLinks.map(({ model, label, icon, link }) => (
              <Tooltip.Root key={model}>
                <Tooltip.Trigger asChild>
                  <a
                    key={model}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={interactiveButtonClassName}
                    onClick={() => {
                      track('llm_link_clicked', {
                        model,
                        location: location.pathname,
                        link,
                      });
                    }}
                  >
                    <Icon name={icon as IconName} size="20px" />
                  </a>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content className={tooltipContentClassName}>{label}</Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            ))}
          </div>
        </Tooltip.Provider>
      </div>
    </div>
  );
};
