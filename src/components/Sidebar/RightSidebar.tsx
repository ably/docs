import { useEffect, useMemo, useRef, useState } from 'react';
import cn from '@ably/ui/core/utils/cn';
import Icon from '@ably/ui/core/Icon';
import { LanguageDropdown } from './LanguageDropdown';
import { sidebarAlignmentClasses } from './utils';
import { IconName } from '@ably/ui/core/Icon/types';

type SidebarHeader = {
  id: string;
  type: string;
  label: string;
};

const externalLinks: { label: string; icon: IconName; link: string }[] = [
  { label: 'Edit on GitHub', icon: 'icon-social-github', link: '#' },
  { label: 'Request changes', icon: 'icon-gui-hand', link: '#' },
];

export const RightSidebar = () => {
  const [headers, setHeaders] = useState<SidebarHeader[]>([]);
  const [activeHeader, setActiveHeader] = useState<Pick<SidebarHeader, 'id'>>();
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    const headerElements =
      typeof document !== `undefined` ? document.querySelector('article')?.querySelectorAll('h2, h3') ?? [] : [];
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
      rootMargin: '-50% 0% -50% 0%',
      threshold: 0,
    });

    headerElements.forEach((header) => {
      observer.current?.observe(header);
    });

    return () => {
      observer.current?.disconnect();
    };
  }, []);

  const highlightPosition = useMemo(() => {
    const sidebarElement =
      typeof document !== `undefined` ? document.getElementById(`sidebar-${activeHeader?.id}`) : null;
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
    <div className={sidebarAlignmentClasses}>
      <LanguageDropdown />
      <div className="hidden md:block">
        <div className="my-24">
          <p className="ui-text-overline2 text-neutral-700 mb-12">On this page</p>
          <div className="flex gap-16">
            <div className="bg-neutral-300 dark:bg-neutral-1000 rounded-full">
              <div
                className="h-[21px] w-2 -mt-2 bg-neutral-1300 dark:bg-neutral-000 rounded-full transition-[transform,height,colors]"
                style={{
                  transform: `translateY(${highlightPosition.yOffset}px)`,
                  height: `${highlightPosition.height}px`,
                }}
              ></div>
            </div>
            <div className="flex flex-col gap-8">
              {headers.map((header) => (
                <a
                  href={`#${header.id}`}
                  key={header.id}
                  id={`sidebar-${header.id}`}
                  className={cn(
                    'ui-text-menu4 text-neutral-900 dark:text-neutral-400 transition-colors scroll-smooth',
                    { 'font-bold': header.id === activeHeader?.id },
                    { 'ml-8': header.type === 'H3' },
                  )}
                  onClick={() => setActiveHeader({ id: header.id })}
                >
                  {header.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="p-16 bg-neutral-100 dark:bg-neutral-1200 border border-neutral-300 dark:border-neutral-1000 rounded-lg transition-colors">
          {externalLinks.map(({ label, icon, link }, index) => (
            <div
              key={label}
              className={cn(
                'flex items-center',
                index === 0 ? 'pb-16 border-b border-neutral-300 dark:border-neutral-1000' : 'pt-16',
              )}
            >
              <div className="flex-1 flex items-center gap-12">
                <Icon size="20px" name={icon} color="text-neutral-900" />
                <span className="text-p4 font-semibold text-neutral-900 dark:text-neutral-400">{label}</span>
              </div>
              <a href={link} target="_blank" rel="noopener">
                <Icon name="icon-gui-external-link" color="text-neutral-900" size="16px" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
