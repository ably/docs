import React, { FunctionComponent as FC } from 'react';
import Icon from '@ably/ui/core/Icon';
import { ButtonWithTooltip } from 'src/components';
import { safeWindow } from 'src/utilities';
import { copyCodeBlockContentTracker } from 'src/external-scripts/google-tag-manager/events';
import { DEFAULT_LANGUAGE } from '../../../../../data/createPages/constants';

type Props = {
  content: string;
  language?: string;
};

const CodeCopyButton: FC<Props> = ({ content, language }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    const page = safeWindow.location.pathname;
    const contentIdentifier = content.slice(0, 10);
    copyCodeBlockContentTracker({
      copyCodeBlockContent: `docs - ${language ?? DEFAULT_LANGUAGE} ${page} ${contentIdentifier}`,
    });
  };

  return (
    <div className="absolute top-64 right-16">
      <ButtonWithTooltip tooltip="Copy" notification="Copied!" onClick={handleCopy} className="text-white">
        <Icon name="icon-gui-copy" size="1rem" color="white" />
      </ButtonWithTooltip>
    </div>
  );
};

export default CodeCopyButton;
