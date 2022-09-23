import React, { ReactNode, useEffect, useState } from 'react';
import cn from 'classnames';

import { ButtonWithTooltip } from 'src/components';
import AILink from '../../../styles/svg/ai-link';

import { container, buttonContainer } from './CopyLink.module.css';

const CopyLink = ({
  attribs,
  marginBottom,
  children,
}: {
  attribs: { id?: string };
  marginBottom: string;
  children: ReactNode;
}) => {
  const [copySuccess, setCopySuccess] = useState<null | boolean>(null);

  useEffect(() => {
    const resetStateTimeout = setTimeout(() => {
      setCopySuccess(null);
    }, 2000);
    return () => clearTimeout(resetStateTimeout);
  }, [copySuccess]);

  if (!attribs || !attribs.id) {
    return <>{children}</>;
  }

  const copyLink = () => {
    const linkToCopy = `${window.location.href.replace(/#.*$/, '')}#${attribs.id}`;
    navigator.clipboard.writeText(linkToCopy);
  };

  return (
    <div className={cn('flex items-center', container, marginBottom)}>
      {children}
      <ButtonWithTooltip
        id={attribs.id}
        tabIndex={0}
        className={buttonContainer}
        notification="Copied"
        onClick={copyLink}
      >
        {/* TODO: use Icon from ably-ui here */}
        <AILink />
      </ButtonWithTooltip>
    </div>
  );
};

export default CopyLink;
