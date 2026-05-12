import type { PropsWithChildren, ReactNode } from 'react';
import { Children, isValidElement } from 'react';

type TabProps = PropsWithChildren<{ label?: string; name?: string }>;

// PoC stub. Phase 4 will replace with a proper interactive Tabs island that
// syncs with the language selector nanostore.
export const Tabs = ({ children }: PropsWithChildren) => {
  const tabs = Children.toArray(children).filter(isValidElement) as Array<
    { props: TabProps; key: string | null }
  >;
  return (
    <div className="my-4 border border-neutral-200 rounded-md overflow-hidden">
      <div className="flex gap-1 px-3 py-2 bg-neutral-50 border-b border-neutral-200 text-sm">
        {tabs.map((tab, i) => (
          <span
            key={tab.key ?? i}
            className="px-2 py-0.5 rounded bg-white border border-neutral-200 text-neutral-800"
          >
            {tab.props?.label ?? tab.props?.name ?? `Tab ${i + 1}`}
          </span>
        ))}
      </div>
      <div className="p-4">{children as ReactNode}</div>
    </div>
  );
};

export const Tab = ({ children }: TabProps) => <div>{children}</div>;
