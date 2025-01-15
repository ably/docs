import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, WindowLocation } from '@reach/router';
import cn from '@ably/ui/core/utils/cn';
import Icon from '@ably/ui/core/Icon';
import { LanguageSelector } from './LanguageSelector';
import { PageTreeNode, sidebarAlignmentClasses } from './utils';
import { IconName } from '@ably/ui/core/Icon/types';
import { useLayoutContext } from 'src/contexts/layout-context';
import { languageInfo } from 'src/data/languages';

type SidebarHeader = {
  id: string;
  type: string;
  label: string;
};

const githubBasePath = 'https://github.com/ably/docs/blob/main/content';
const requestBasePath = 'https://github.com/ably/docs/issues/new';

const externalLinks = (
  pageTree: PageTreeNode[],
  location: WindowLocation,
): { label: string; icon: IconName; link: string }[] => {
  const currentPage = pageTree[pageTree.length - 1]?.page;

  let githubEditPath = '#';
  let requestPath = '#';

  if (currentPage) {
    const githubPathName = location.pathname.replace('docs/', '');
    githubEditPath =
      githubBasePath + (currentPage.indexPage ? `${githubPathName}/index.textile` : `${githubPathName}.textile`);

    const language = new URLSearchParams(location.search).get('lang');
    const requestTitle = `Change request: ${currentPage.name}`;
    const requestBody = encodeURIComponent(`
  Name: **${currentPage.name}**
  Link: **[${currentPage.link}](https://ably.com/docs/${currentPage.link})**
  ${language && languageInfo[language] ? `Language: **${languageInfo[language].label}**` : ''}
  
  Please describe the changes you would like to make to this page:  
`);

    requestPath = `${requestBasePath}?title=${requestTitle}&body=${requestBody}`;
  }

  return [
    {
      label: 'Edit on GitHub',
      icon: 'icon-social-github',
      link: githubEditPath,
    },
    { label: 'Request changes', icon: 'icon-gui-hand', link: requestPath },
  ];
};

const RightSidebar = () => {
  const { activePage } = useLayoutContext();
  const [headers, setHeaders] = useState<SidebarHeader[]>([]);
  const [activeHeader, setActiveHeader] = useState<Pick<SidebarHeader, 'id'>>();
  const observer = useRef<IntersectionObserver>();
  const location = useLocation();
  const showLanguageSelector = activePage?.languages.length > 0;
  const language = new URLSearchParams(location.search).get('lang');

  useEffect(() => {
    const headerElements =
      typeof document !== 'undefined' ? document.querySelector('article')?.querySelectorAll('h2, h3, h6') ?? [] : [];
    const headerData = Array.from(headerElements)
      .filter((element) => element.id && element.textContent)
      .map((header) => ({
        type: header.tagName,
        label: header.textContent ?? '',
        id: header.id,
        height: header.getBoundingClientRect().height,
      }));

    setHeaders(headerData);

    const handleIntersect = (
      entries: {
        target: Element;
        isIntersecting: boolean;
      }[],
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveHeader({
            id: entry.target.id,
          });
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      threshold: 1,
    });

    headerElements.forEach((header) => {
      observer.current?.observe(header);
    });

    return () => {
      observer.current?.disconnect();
    };
  }, [language]);

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
    <div className={cn(sidebarAlignmentClasses, 'md:pb-[80px] right-32 md:right-0')}>
      {showLanguageSelector ? <LanguageSelector /> : null}
      <div className="hidden md:flex flex-col h-full">
        {headers.length > 0 ? (
          <>
            <p className="ui-text-overline2 text-neutral-700 mb-12">On this page</p>
            <div className="flex gap-16 overflow-y-scroll overflow-x-hidden shadow-[2px_0_var(--color-neutral-300)_inset] pl-16">
              <div
                className="h-[21px] -ml-16 w-2 -mt-2 bg-neutral-1300 dark:bg-neutral-000 rounded-full transition-[transform,height,colors] z-0"
                style={{
                  transform: `translateY(${highlightPosition.yOffset}px)`,
                  height: `${highlightPosition.height}px`,
                }}
              ></div>
              <div className="flex flex-col gap-8 w-full pr-16">
                {headers.map((header) => (
                  <a
                    href={`#${header.id}`}
                    key={header.id}
                    id={`sidebar-${header.id}`}
                    className={cn(
                      'ui-text-menu4 text-neutral-900 dark:text-neutral-400 transition-colors scroll-smooth hover:text-neutral-1300 dark:hover:text-neutral-000',
                      { 'font-bold text-neutral-1300 dark:text-neutral-000': header.id === activeHeader?.id },
                      { 'ml-8': header.type !== 'H2' },
                    )}
                    onClick={() => setActiveHeader({ id: header.id })}
                  >
                    {header.label}
                  </a>
                ))}
              </div>
            </div>
          </>
        ) : null}
        <div className="bg-neutral-100 dark:bg-neutral-1200 border border-neutral-300 dark:border-neutral-1000 rounded-lg transition-colors mt-24">
          {externalLinks(activePage.tree, location).map(({ label, icon, link }, index) => (
            <a key={label} href={link} target="_blank" rel="noopener noreferrer">
              <div
                className={cn(
                  'flex items-center p-16',
                  index === 0 && 'border-b border-neutral-300 dark:border-neutral-1000',
                )}
              >
                <div className="flex-1 flex items-center gap-12">
                  <Icon size="20px" name={icon} color="text-neutral-900" />
                  <span className="text-p4 font-semibold text-neutral-900 dark:text-neutral-400">{label}</span>
                </div>
                <Icon name="icon-gui-external-link" color="text-neutral-900" size="16px" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
