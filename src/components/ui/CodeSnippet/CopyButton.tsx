import React, { useState } from 'react';
import Icon from 'src/components/Icon';
import TooltipButton from './TooltipButton';

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
        <Icon name="icon-gui-document-duplicate-outline" size="20px" color="text-neutral-1300 dark:text-neutral-000" />
      </TooltipButton>
    </div>
  );
};

export default CopyButton;
