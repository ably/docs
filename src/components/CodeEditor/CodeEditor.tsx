import React from 'react';
import { SandpackCodeEditor, SandpackLayout, SandpackFileExplorer, useSandpack } from '@codesandbox/sandpack-react';
import { type CodeEditorProps } from '@codesandbox/sandpack-react';
import Chrome from './Chrome';

import './CodeEditor.css';

const ActiveFileDisplay = () => {
  const { sandpack } = useSandpack();
  const { activeFile } = sandpack;

  return activeFile.startsWith('/') ? activeFile.substring(1) : activeFile;
};

type Props = { editor: CodeEditorProps; theme?: 'light' | 'dark' };

const CodeEditor = ({ editor, theme = 'dark' }: Props) => {
  const editorProps = {
    ...editor,
    showTabs: false,
  };

  return (
    <Chrome title={ActiveFileDisplay()} theme={theme}>
      <SandpackLayout className="rounded-none remove-btn-focus remove-border-radius">
        <SandpackFileExplorer autoHiddenFiles={true} />
        <SandpackCodeEditor {...editorProps} />
      </SandpackLayout>
    </Chrome>
  );
};

export { CodeEditor };
