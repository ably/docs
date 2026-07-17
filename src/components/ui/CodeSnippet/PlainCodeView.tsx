import React, { ReactNode, useRef, useState } from 'react';
import Code from 'src/components/ui/Code';
import cn from 'src/utilities/cn';
import CopyButton from './CopyButton';
import IconSlot from 'src/components/ui/IconSlot';

type PlainCodeViewProps = {
  content: string;
  language: string;
  icon: ReactNode | null;
  className?: string;
};

const PlainCodeView: React.FC<PlainCodeViewProps> = ({ content, className, language, icon }) => {
  const codeRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={cn(
        'rounded-lg overflow-hidden bg-neutral-000 dark:bg-neutral-1300 border border-neutral-300 dark:border-neutral-1100 relative flex items-center',
        language === 'shell' ? 'min-h-[3.375rem]' : 'min-h-12',
        className,
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsHovering(true)}
      onBlur={() => setIsHovering(false)}
      tabIndex={0}
      role="button"
      aria-label="Focusable code view area"
      ref={codeRef}
    >
      {icon && (
        <div className="absolute top-2 left-2 z-10">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-neutral-200 dark:bg-neutral-1100">
            <IconSlot icon={icon} size="20px" colorClass="text-neutral-1300 dark:text-neutral-000" />
          </div>
        </div>
      )}

      <Code
        language={language}
        snippet={content}
        additionalCSS={cn(
          'w-full bg-neutral-000 text-neutral-1300 dark:bg-neutral-1300 dark:text-neutral-200 px-4 py-2',
          icon && 'pl-14',
        )}
        showLines={false}
      />

      {isHovering && <CopyButton onCopy={() => navigator.clipboard.writeText(content)} />}
    </div>
  );
};

export default PlainCodeView;
