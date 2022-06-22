import React, { useEffect, useState } from 'react';
import '@ably/ui/core/styles.css';
import { gui } from '../../../../styles/colors';

const DEFAULT_BUTTON_CONTENT = `Copy ⎘`;

const CodeCopyButton = ({ content }: { content: string }) => {
  const [buttonContent, setButtonContent] = useState<string>(DEFAULT_BUTTON_CONTENT);
  const [copySuccess, setCopySuccess] = useState<boolean | null>(null);

  const resetState = () => {
    setButtonContent(DEFAULT_BUTTON_CONTENT);
    setCopySuccess(null);
  };

  const copyContent = () =>
    navigator &&
    navigator.clipboard.writeText(content).then(
      () => {
        setButtonContent('Copied ✓');
        setCopySuccess(true);
      },
      (err) => {
        console.error(err);
        setButtonContent(`Failed to copy ×`);
        setCopySuccess(false);
      },
    );

  useEffect(() => {
    const resetStateTimeout = setTimeout(resetState, 2000);
    return () => clearTimeout(resetStateTimeout);
  }, [copySuccess]);

  return (
    <button
      className={`docs-menu-item-button bottom-4 right-4 absolute`}
      style={{
        fontFamily: `NEXT Book,Arial,Helvetica,sans-serif`,
        backgroundColor: copySuccess ? gui.success : copySuccess === null ? 'inherit' : gui.error,
        transition: 'background-color 1000ms linear',
      }}
      onClick={copyContent}
      tabIndex={0}
    >
      {buttonContent}
    </button>
  );
};

export default CodeCopyButton;
