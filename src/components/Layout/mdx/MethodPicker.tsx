import React, { useState, createContext, useContext, isValidElement, ReactNode } from 'react';
import cn from '@ably/ui/core/utils/cn';

type MethodContextType = {
  activeMethod: string;
};

const MethodContext = createContext<MethodContextType | undefined>(undefined);

const METHOD_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  'control-api': 'Control API',
  cli: 'Ably CLI',
};

interface MethodProps {
  value: string;
  children: ReactNode;
}

export const Method: React.FC<MethodProps> = ({ value, children }) => {
  const context = useContext(MethodContext);
  if (!context) {
    return null;
  }
  return context.activeMethod === value ? <>{children}</> : null;
};

interface MethodPickerProps {
  children: ReactNode;
}

export const MethodPicker: React.FC<MethodPickerProps> = ({ children }) => {
  // Extract method values from Method children
  const methods: string[] = [];
  React.Children.forEach(children, (child) => {
    if (isValidElement<MethodProps>(child) && child.props.value) {
      methods.push(child.props.value);
    }
  });

  const [activeMethod, setActiveMethod] = useState(methods[0] ?? 'dashboard');

  return (
    <MethodContext.Provider value={{ activeMethod }}>
      <div className="my-5">
        <div className="flex gap-1 border-b border-neutral-300 dark:border-neutral-800 mb-5">
          {methods.map((method) => (
            <button
              key={method}
              onClick={() => setActiveMethod(method)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-t-md transition-colors cursor-pointer',
                activeMethod === method
                  ? 'bg-neutral-100 dark:bg-neutral-1100 text-neutral-1300 dark:text-neutral-000 border border-neutral-300 dark:border-neutral-800 border-b-transparent -mb-px'
                  : 'text-neutral-700 dark:text-neutral-500 hover:text-neutral-1000 dark:hover:text-neutral-300',
              )}
            >
              {METHOD_LABELS[method] ?? method}
            </button>
          ))}
        </div>
        <div>{children}</div>
      </div>
    </MethodContext.Provider>
  );
};
