import React, { useState, createContext, useContext, isValidElement, ReactNode, useId } from 'react';
import cn from '@ably/ui/core/utils/cn';

type TabsContextType = {
  activeTab: string;
  tabsId: string;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabProps {
  value: string;
  label: string;
  children: ReactNode;
}

export const Tab: React.FC<TabProps> = ({ value, children }) => {
  const context = useContext(TabsContext);
  if (!context) {
    return null;
  }
  return context.activeTab === value ? (
    <div role="tabpanel" id={`${context.tabsId}-panel-${value}`} aria-labelledby={`${context.tabsId}-tab-${value}`}>
      {children}
    </div>
  ) : null;
};

interface TabsProps {
  children: ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const tabsId = useId();

  const tabs: { value: string; label: string }[] = [];
  React.Children.forEach(children, (child) => {
    if (isValidElement<TabProps>(child) && child.props.value) {
      tabs.push({ value: child.props.value, label: child.props.label ?? child.props.value });
    }
  });

  const [activeTab, setActiveTab] = useState(tabs[0]?.value ?? '');

  return (
    <TabsContext.Provider value={{ activeTab, tabsId }}>
      <div className="my-5 border border-neutral-300 dark:border-neutral-800 rounded-lg overflow-hidden">
        <div
          className="flex gap-1 border-b border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-1100 px-2 pt-2"
          role="tablist"
        >
          {tabs.map(({ value, label }) => (
            <button
              key={value}
              id={`${tabsId}-tab-${value}`}
              role="tab"
              aria-selected={activeTab === value}
              aria-controls={`${tabsId}-panel-${value}`}
              onClick={() => setActiveTab(value)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-t-md transition-colors cursor-pointer',
                activeTab === value
                  ? 'bg-white dark:bg-neutral-1300 text-neutral-1300 dark:text-neutral-000 border border-neutral-300 dark:border-neutral-800 border-b-white dark:border-b-neutral-1300 -mb-px'
                  : 'text-neutral-700 dark:text-neutral-500 hover:text-neutral-1000 dark:hover:text-neutral-300',
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="p-5">{children}</div>
      </div>
    </TabsContext.Provider>
  );
};
