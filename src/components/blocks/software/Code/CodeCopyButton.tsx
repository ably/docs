import React, { FunctionComponent as FC } from 'react';
import Icon from '@ably/ui/core/Icon';
import { ButtonWithTooltip } from 'src/components';
import '@ably/ui/core/styles.css';

type Props = {
  content: string;
};

const CodeCopyButton: FC<Props> = ({ content }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="absolute top-14 right-16">
      <ButtonWithTooltip tooltip="Copy" notification="Copied!" onClick={handleCopy} className="text-white">
        <Icon name="icon-gui-copy" size="1rem" color="white" />
      </ButtonWithTooltip>
    </div>
  );
};

export default CodeCopyButton;
