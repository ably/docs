import React, { useMemo } from 'react';
import { useLocation } from '@reach/router';
import * as Tooltip from '@radix-ui/react-tooltip';
import Icon from '@ably/ui/core/Icon';
import { IconName } from '@ably/ui/core/Icon/types';
import { LanguageSelector } from '../LanguageSelector';
import { track } from '@ably/ui/core/insights';
import { productData } from 'src/data';
import { languageInfo } from 'src/data/languages';
import { useLayoutContext } from 'src/contexts/layout-context';
import { tooltipContentClassName } from '../utils/styles';

type PageHeaderProps = {
  title: string;
  description: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  const { activePage } = useLayoutContext();
  const { language, product, page } = activePage;
  const location = useLocation();

  const llmLinks = useMemo(() => {
    const prompt = `Tell me more about ${product ? productData[product]?.nav.name : 'Ably'}'s '${page.name}' feature from https://ably.com${page.link}${language ? ` for ${languageInfo[language]?.label}` : ''}`;
    const gptPath = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
    const claudePath = `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;

    return [
      { model: 'gpt', label: 'ChatGPT', icon: 'icon-tech-openai', link: gptPath },
      { model: 'claude', label: 'Claude (must be logged in)', icon: 'icon-tech-claude-mono', link: claudePath },
    ];
  }, [product, page.name, page.link, language]);

  return (
    <div className="my-8 border-b border-neutral-300 dark:border-neutral-1000 pb-8">
      <h1 className="ui-text-h1 mb-4">{title}</h1>
      <p className="text-neutral-800 dark:text-neutral-500 mb-8 font-serif italic tracking-tight text-lg leading-normal">
        {description}
      </p>

      <div className="flex items-center gap-5">
        {activePage.languages.length > 0 && (
          <div className="flex-shrink-0 border-r border-neutral-300 dark:border-neutral-1000 pr-5">
            <LanguageSelector />
          </div>
        )}

        <div className="flex items-center gap-0.5">
          <span className="text-p4 font-semibold text-neutral-900 dark:text-neutral-400 mr-1.5">Open in </span>
          <Tooltip.Provider delayDuration={0} disableHoverableContent>
            {llmLinks.map(({ model, label, icon, link }) => (
              <Tooltip.Root key={model}>
                <Tooltip.Trigger asChild>
                  <a
                    key={model}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex text-neutral-900 dark:text-neutral-400 cursor-pointer p-1.5 focus-base rounded-lg"
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
          </Tooltip.Provider>
        </div>
      </div>
    </div>
  );
};
