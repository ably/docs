import React, { isValidElement, ReactNode } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import cn from '@ably/ui/core/utils/cn';

interface TabProps {
  value: string;
  label: string;
  children: ReactNode;
}

export const Tab: React.FC<TabProps> = () => {
  // Tab is only used declaratively — Tabs reads its props and renders RadixTabs.Content.
  // When used outside of Tabs, render nothing.
  return null;
};

interface TabsProps {
  children: ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const tabs: { value: string; label: string }[] = [];
  const contentByValue: Record<string, ReactNode> = {};

  React.Children.forEach(children, (child) => {
    if (isValidElement<TabProps>(child) && child.props.value) {
      tabs.push({ value: child.props.value, label: child.props.label ?? child.props.value });
      contentByValue[child.props.value] = child.props.children;
    }
  });

  return (
    <RadixTabs.Root
      defaultValue={tabs[0]?.value}
      className="my-5 border border-neutral-300 dark:border-neutral-800 rounded-lg overflow-hidden"
    >
      <RadixTabs.List className="flex gap-1 border-b border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-1100 px-2 pt-2">
        {tabs.map(({ value, label }) => (
          <RadixTabs.Trigger
            key={value}
            value={value}
            style={{ outline: 'none', borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}
            className={cn(
              'px-4 py-2 ui-text-label3 transition-colors cursor-pointer',
              'border border-transparent',
              'text-neutral-700 dark:text-neutral-500 hover:text-neutral-1000 dark:hover:text-neutral-300',
              'data-[state=active]:bg-white data-[state=active]:dark:bg-neutral-1300 data-[state=active]:text-neutral-1300 data-[state=active]:dark:text-neutral-000',
              'data-[state=active]:border-neutral-300 data-[state=active]:dark:border-neutral-800',
              'data-[state=active]:border-b-white data-[state=active]:dark:border-b-neutral-1300 data-[state=active]:-mb-px',
            )}
          >
            {label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {tabs.map(({ value }) => (
        <RadixTabs.Content key={value} value={value} className="px-5 pt-5 pb-2.5">
          {contentByValue[value]}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
};
