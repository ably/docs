import React, { useState } from 'react';
import TooltipButton from './TooltipButton';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';

type CopyButtonProps = {
  onCopy: () => void;
  tooltip?: string;
};

const CopyButton = ({ onCopy, tooltip = 'Copy' }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="absolute top-2 right-2 z-10 rounded-lg focus-base"
      role="button"
      tabIndex={0}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);

        setTimeout(() => {
          setIsCopied(false);
        }, 250);
      }}
    >
      <TooltipButton
        tooltip={isCopied ? 'Copied!' : tooltip}
        onClick={() => {
          onCopy();
          setIsCopied(true);
        }}
        tooltipRootProps={{
          open: isHovering,
        }}
        variant="icon-button"
      >
        <DocumentDuplicateIcon className="size-[20px] text-neutral-1300 dark:text-neutral-000" aria-hidden />
      </TooltipButton>
    </div>
  );
};

export default CopyButton;
