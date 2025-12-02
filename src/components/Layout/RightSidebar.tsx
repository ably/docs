import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useLocation, WindowLocation } from '@reach/router';
import cn from '@ably/ui/core/utils/cn';
import Icon from '@ably/ui/core/Icon';
import { IconName } from '@ably/ui/core/Icon/types';
import { componentMaxHeight, HEADER_HEIGHT, HEADER_BOTTOM_MARGIN } from '@ably/ui/core/utils/heights';
import Tooltip from '@ably/ui/core/Tooltip';
import { track } from '@ably/ui/core/insights';

import { LanguageSelector } from './LanguageSelector';
import { useLayoutContext } from 'src/contexts/layout-context';
import { productData } from 'src/data';
import { LanguageKey } from 'src/data/languages/types';
import { languageInfo } from 'src/data/languages';
import { ActivePage, sidebarAlignmentClasses, sidebarAlignmentStyles } from './utils/nav';
import { INKEEP_ASK_BUTTON_HEIGHT } from './utils/heights';

type SidebarHeader = {
  id: string;
  type: string;
  label: string;
};

const githubBasePathTextile = 'https://github.com/ably/docs/blob/main/content';
const githubBasePathMDX = 'https://github.com/ably/docs/blob/main/src/pages/docs';
const requestBasePath = 'https://github.com/ably/docs/issues/new';

const customGithubPaths = {
  '/how-to/pub-sub': 'https://github.com/ably/docs/blob/main/how-tos/pub-sub/how-to.mdx',
} as Record<string, string>;

const externalLinks = (
  activePage: ActivePage,
  location: WindowLocation,
): { label: string; icon: IconName; link: string; type: string }[] => {
  if (!activePage) {
    return [];
  }

  let githubEditPath = '#';
  const githubPathName = location.pathname.replace('docs/', '');

  if (customGithubPaths[githubPathName]) {
    githubEditPath = customGithubPaths[githubPathName];
  } else if (activePage.template === 'mdx') {
    githubEditPath =
      githubBasePathMDX + (activePage.page.index ? `${githubPathName}/index.mdx` : `${githubPathName}.mdx`);
  } else {
    githubEditPath =
      githubBasePathTextile + (activePage.page.index ? `${githubPathName}/index.textile` : `${githubPathName}.textile`);
  }

  const language = activePage.languages.length > 0 ? activePage.language : null;
  const requestTitle = `Change request for: ${activePage.page.link}`;
  const requestBody = encodeURIComponent(`
  **Page name**: ${activePage.page.name}
  **URL**: [${activePage.page.link}](https://ably.com${activePage.page.link})
  ${language && languageInfo[language] ? `Language: **${languageInfo[language].label}**` : ''}

  **Requested change or enhancement**:
`);

  return [
    {
      label: 'Edit on GitHub',
      icon: 'icon-social-github-mono',
      link: githubEditPath,
      type: 'github',
    },
    {
      label: 'Request changes',
      icon: 'icon-gui-hand-raised-outline',
      link: `${requestBasePath}?title=${requestTitle}&body=${requestBody}`,
      type: 'request',
    },
  ];
};

const llmLinks = (
  activePage: ActivePage,
  language: LanguageKey,
): { model: string; label: string; icon: IconName; link: string }[] => {
  const prompt = `Tell me more about ${activePage.product ? productData[activePage.product]?.nav.name : 'Ably'}'s '${activePage.page.name}' feature from https://ably.com${activePage.page.link}${language ? ` for ${languageInfo[language]?.label}` : ''}`;
  const gptPath = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
  const claudePath = `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;

  return [
    { model: 'gpt', label: 'ChatGPT', icon: 'icon-tech-openai', link: gptPath },
    { model: 'claude', label: 'Claude (must be logged in)', icon: 'icon-tech-claude-mono', link: claudePath },
  ];
};

const getHeaderId = (element: Element) => {
  const customId = element.querySelector('a')?.getAttribute('id') ?? element.querySelector('a')?.getAttribute('name');
  return customId ?? element.id;
};

const RightSidebar = () => {
  const location = useLocation();
  const { activePage } = useLayoutContext();
  const [headers, setHeaders] = useState<SidebarHeader[]>([]);
  const [activeHeader, setActiveHeader] = useState<Pick<SidebarHeader, 'id'>>({
    id: location.hash ? location.hash.slice(1) : '#',
  });
  const intersectionObserver = useRef<IntersectionObserver | undefined>(undefined);
  const manualSelection = useRef<boolean>(false);
  const showLanguageSelector = activePage?.languages.length > 0;
  const language = new URLSearchParams(location.search).get('lang') as LanguageKey;

  const handleHeaderClick = useCallback((headerId: string) => {
    // Set manual selection flag to prevent intersection observer updates
    manualSelection.current = true;
    setActiveHeader({ id: headerId });

    // Reset the flag after scroll animation completes
    setTimeout(() => {
      manualSelection.current = false;
    }, 1000);
  }, []);

  useEffect(() => {
    const articleElement = document.querySelector('article');
    if (!articleElement) {
      return;
    }

    const updateHeaders = () => {
      const headerElements = articleElement.querySelectorAll('h2, h3, h6') ?? [];
      const headerData = Array.from(headerElements)
        .filter((element) => element.id && element.textContent)
        .map((header) => {
          const customId =
            header.querySelector('a')?.getAttribute('id') ?? header.querySelector('a')?.getAttribute('name');

          return {
            type: header.tagName,
            label: header.textContent ?? '',
            id: customId ?? header.id,
            height: header.getBoundingClientRect().height,
          };
        });

      setHeaders(headerData);

      // Set the first header as active when page changes
      if (headerData.length > 0) {
        setActiveHeader({ id: headerData[0].id });
      }

      const handleIntersect = (
        entries: {
          target: Element;
          isIntersecting: boolean;
          boundingClientRect: DOMRect;
        }[],
      ) => {
        // Skip updates if manual selection is active
        if (manualSelection.current) {
          return;
        }

        // Get all currently intersecting headers
        const intersectingEntries = entries.filter((entry) => entry.isIntersecting);

        if (intersectingEntries.length > 0) {
          // Find the entry nearest to the top of the viewport
          const topEntry = intersectingEntries.reduce((nearest, current) => {
            return current.boundingClientRect.top < nearest.boundingClientRect.top ? current : nearest;
          }, intersectingEntries[0]);

          if (topEntry.target.id) {
            setActiveHeader({
              id: getHeaderId(topEntry.target),
            });
          }
        }
      };

      // Create a new observer with configuration focused on the top of the viewport
      intersectionObserver.current = new IntersectionObserver(handleIntersect, {
        root: null,
        // Using a small threshold to detect partial visibility
        threshold: 0,
        // Account for 64px header bar at top and focus on top portion of viewport
        rootMargin: '-64px 0px -80% 0px',
      });

      // Observe each header
      headerElements.forEach((header) => {
        intersectionObserver.current?.observe(header);
      });

      return () => {
        intersectionObserver.current?.disconnect();
      };
    };

    updateHeaders();
  }, [location.pathname, location.search]);

  const highlightPosition = useMemo(() => {
    const sidebarElement =
      typeof document !== 'undefined' ? document.getElementById(`sidebar-${activeHeader?.id}`) : null;
    const sidebarParentElement = sidebarElement?.parentElement;
    const sidebarElementDimensions = sidebarElement?.getBoundingClientRect();

    if (!sidebarParentElement || !sidebarElementDimensions) {
      return {
        yOffset: 0,
        height: 21,
      };
    }

    return {
      yOffset: Math.abs(sidebarParentElement.getBoundingClientRect().top - sidebarElementDimensions?.top),
      height: sidebarElementDimensions?.height,
    };
  }, [activeHeader]);

  return (
    <div
      className={cn(sidebarAlignmentClasses, 'md:pb-20 right-8 md:right-0')}
      style={{
        ...sidebarAlignmentStyles,
        height: componentMaxHeight(HEADER_HEIGHT, HEADER_BOTTOM_MARGIN, INKEEP_ASK_BUTTON_HEIGHT),
      }}
    >
      {showLanguageSelector ? <LanguageSelector /> : null}
      <div className="hidden md:flex flex-col h-full">
        {headers.length > 0 ? (
          <>
            <p className="ui-text-overline2 text-neutral-700 mb-3">On this page</p>
            <div className="flex gap-4 overflow-auto shadow-[0.5px_0px_var(--color-neutral-000)_inset,1.5px_0px_var(--color-neutral-300)_inset] py-0.5 pl-4">
              <div
                className="h-[1.125rem] -ml-4 w-0.5 bg-neutral-1300 dark:bg-neutral-000 rounded-full transition-[transform,height,colors] z-0"
                style={{
                  transform: `translateY(${highlightPosition.yOffset}px)`,
                  height: `${highlightPosition.height}px`,
                }}
              ></div>
              {/* 18px derives from the 2px width of the grey tracker bar plus the 16px between it and the menu items */}
              <div className="flex flex-col gap-2 w-[calc(100%-18px)] pr-4">
                {headers.map((header, index) => (
                  <a
                    href={`#${header.id}`}
                    key={[location.pathname, header.id, language, index].join('-')}
                    id={`sidebar-${header.id}`}
                    className={cn(
                      'ui-text-label4 font-medium text-neutral-900 dark:text-neutral-400 transition-colors scroll-smooth hover:text-neutral-1300 dark:hover:text-neutral-000',
                      { 'text-neutral-1300 dark:text-neutral-000': header.id === activeHeader?.id },
                      { 'ml-2': header.type !== 'H2' },
                    )}
                    onClick={() => handleHeaderClick(header.id)}
                  >
                    {header.label}
                  </a>
                ))}
              </div>
            </div>
          </>
        ) : null}
        <div className="bg-neutral-100 dark:bg-neutral-1200 border border-neutral-300 dark:border-neutral-1000 rounded-lg transition-colors mt-6">
          {externalLinks(activePage, location).map(({ label, icon, link, type }) => (
            <a
              key={label}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/external-link"
              data-testid={`external-${type}-link`}
            >
              <div className="flex items-center p-4 border-b border-neutral-300 dark:border-neutral-1000">
                <div className="flex-1 flex items-center gap-3">
                  <Icon
                    size="20px"
                    name={icon}
                    color="text-neutral-900"
                    additionalCSS="group-hover/external-link:text-neutral-1300 dark:group-hover/external-link:text-neutral-000 transition-colors"
                  />
                  <span className="text-p4 font-semibold text-neutral-900 dark:text-neutral-400 group-hover/external-link:text-neutral-1300 dark:group-hover/external-link:text-neutral-000 transition-colors">
                    {label}
                  </span>
                </div>
                <Icon
                  name="icon-gui-arrow-top-right-on-square-outline"
                  color="text-neutral-900"
                  additionalCSS="group-hover/external-link:text-neutral-1300 dark:group-hover/external-link:text-neutral-000 transition-colors"
                  size="16px"
                />
              </div>
            </a>
          ))}
          <div className="flex items-center p-4 gap-2">
            <span className="text-p4 font-semibold text-neutral-900 dark:text-neutral-400">Open in </span>
            {llmLinks(activePage, language).map(({ model, label, icon, link }) => (
              <a
                key={model}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-5 ui-theme-dark group/llm-link cursor-pointer"
                onClick={() => {
                  track('llm_link_clicked', {
                    model,
                    location: location.pathname,
                    link,
                  });
                }}
              >
                <Tooltip
                  content={label}
                  triggerElement={
                    <Icon
                      name={icon}
                      size="20px"
                      additionalCSS="transition-colors text-neutral-900 dark:text-neutral-400 group-hover/llm-link:text-neutral-1300 dark:group-hover/llm-link:text-neutral-000"
                    />
                  }
                >
                  {label}
                </Tooltip>
              </a>
            ))}
            <a
              href={`${location.pathname.replace(/\/$/, '')}/index.md`}
              className="flex h-5 ui-theme-dark group/markdown-link cursor-pointer"
              onClick={(e) => {
                // In development mode, markdown files aren't generated, so show alert immediately
                if (process.env.NODE_ENV === 'development') {
                  e.preventDefault();
                  alert('Markdown files are only available in production builds. Run "yarn build" to generate them.');
                }

                track('markdown_link_clicked', {
                  location: location.pathname,
                });
              }}
            >
              <Tooltip
                content="View in Markdown"
                triggerElement={
                  <img
                    src="/icons/markdown-mark.svg"
                    alt="View in Markdown"
                    className="w-5 h-5 transition-opacity opacity-60 group-hover/markdown-link:opacity-100"
                  />
                }
              >
                View in Markdown
              </Tooltip>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
