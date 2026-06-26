import React, { ReactNode, useEffect } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { throttle } from 'es-toolkit/compat';
import cn from 'src/utilities/cn';

type TabTriggerContent = string | { label: string; disabled?: boolean } | ReactNode;

/**
 * Props for the TabMenu component.
 */

export type TabMenuProps = {
  /**
   * An array of tabs, which can be either a string or an object with a label and an optional disabled state.
   */
  tabs: TabTriggerContent[];

  /**
   * An optional array of React nodes representing the content for each tab.
   */
  contents?: ReactNode[];

  /**
   * An optional callback function that is called when a tab is clicked, receiving the index of the clicked tab.
   */
  tabOnClick?: (index: number) => void;

  /**
   * An optional class name to apply to each tab.
   */
  tabClassName?: string;

  /**
   * An optional class name to apply to the Tabs.Root element.
   */
  rootClassName?: string;

  /**
   * An optional class name to apply to the Tabs.Content element.
   */
  contentClassName?: string;

  /**
   * Optional configuration options for the TabMenu.
   */
  options?: {
    /**
     * The index of the tab that should be selected by default.
     */
    defaultTabIndex?: number;

    /**
     * Whether to show an underline below the selected tab.
     */
    underline?: boolean;

    /**
     * Whether to animate the transition between tabs.
     */
    animated?: boolean;

    /**
     * Whether the tab width should be flexible.
     */
    flexibleTabWidth?: boolean;

    /**
     * Whether the tab height should be flexible.
     */
    flexibleTabHeight?: boolean;
  };
};

const DEFAULT_TAILWIND_ANIMATION_DURATION = 150;

const TabMenu: React.FC<TabMenuProps> = ({
  tabs = [],
  contents = [],
  tabOnClick,
  tabClassName,
  rootClassName,
  contentClassName,
  options,
}) => {
  const {
    defaultTabIndex = 0,
    underline = true,
    animated: animatedOption = true,
    flexibleTabWidth = false,
    flexibleTabHeight = false,
  } = options ?? {};

  const listRef = React.useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = React.useState(false);
  const [highlight, setHighlight] = React.useState({ offset: 0, width: 0 });

  useEffect(() => {
    if (animatedOption && highlight.width > 0) {
      setTimeout(() => {
        setAnimated(true);
      }, DEFAULT_TAILWIND_ANIMATION_DURATION);
    }
  }, [animatedOption, highlight.width]);

  const updateHighlightDimensions = (element: HTMLButtonElement) => {
    const { left: parentLeft } = listRef.current?.getBoundingClientRect() ?? {};
    const { left, width } = element.getBoundingClientRect() ?? {};

    setHighlight({
      offset: (left ?? 0) - (parentLeft ?? 0),
      width: width ?? 0,
    });
  };

  useEffect(() => {
    const handleResize = throttle(() => {
      const activeTabElement = listRef.current?.querySelector<HTMLButtonElement>(`[data-state="active"]`);

      if (activeTabElement) {
        updateHighlightDimensions(activeTabElement);
      }
    }, 100);

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTabClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    tabOnClick?.(index);
    updateHighlightDimensions(event.currentTarget as HTMLButtonElement);
  };

  const tabTriggerContent = (tab: TabTriggerContent) => {
    if (!tab) {
      return null;
    }

    if (React.isValidElement(tab) || typeof tab === 'string') {
      return tab;
    }

    if (typeof tab === 'object' && 'label' in tab) {
      return tab.label;
    }

    return null;
  };

  return (
    <Tabs.Root defaultValue={`tab-${defaultTabIndex}`} className={cn({ 'h-full': flexibleTabHeight }, rootClassName)}>
      <Tabs.List
        ref={listRef}
        className={cn(
          'relative',
          {
            'flex border-b border-neutral-300 dark:border-neutral-1000': underline,
          },
          { 'h-full': flexibleTabHeight },
        )}
      >
        {tabs.map(
          (tab, index) =>
            tab && (
              <Tabs.Trigger
                key={`tab-${index}`}
                className={cn(
                  'lg:px-6 md:px-5 px-4 py-4 ui-text-label1 font-bold data-[state=active]:text-neutral-1300 text-neutral-1000 dark:data-[state=active]:text-neutral-000 dark:text-neutral-300 focus:outline-none focus-visible:outline-gui-focus transition-colors hover:text-neutral-1300 dark:hover:text-neutral-000 active:text-neutral-900 dark:active:text-neutral-400 disabled:text-gui-disabled-light dark:disabled:text-gui-disabled-dark disabled:cursor-not-allowed',
                  { 'flex-1': flexibleTabWidth },
                  { 'h-full': flexibleTabHeight },
                  tabClassName,
                )}
                value={`tab-${index}`}
                onClick={(event) => handleTabClick(event, index)}
                disabled={typeof tab === 'object' && 'disabled' in tab ? tab.disabled : false}
              >
                {tabTriggerContent(tab)}
              </Tabs.Trigger>
            ),
        )}
        <div
          className={cn('absolute bottom-0 bg-neutral-1300 dark:bg-neutral-000 h-[0.1875rem] w-6', {
            'transition-[transform,width]': animated,
          })}
          style={{
            transform: `translateX(${highlight.offset}px)`,
            width: `${highlight.width}px`,
          }}
        ></div>
      </Tabs.List>
      {contents.map((content, index) => (
        <Tabs.Content key={`tab-${index}`} value={`tab-${index}`} className={contentClassName}>
          {content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export default TabMenu;
