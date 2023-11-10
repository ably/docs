import React from 'react';
import { SandpackCodeEditor, SandpackLayout, SandpackFileExplorer, useSandpack } from '@codesandbox/sandpack-react';
import { CodeEditorProps } from '@codesanbox/sandpack-react/types';
import Chrome from './Chrome';

import './CodeEditor.css';

const ActiveFileDisplay = () => {
  const { sandpack } = useSandpack();
  const { activeFile } = sandpack;

  return activeFile.startsWith('/') ? activeFile.substring(1) : activeFile;
};

type Props = { editor: CodeEditorProps };

const CodeEditor = ({ editor }: Props) => {
  const editorProps = {
    ...editor,
    showTabs: false,
  };

  return (
    <Chrome title={ActiveFileDisplay()}>
      <SandpackLayout className="rounded-none remove-btn-focus">
        <SandpackFileExplorer autoHiddenFiles={true} />
        <SandpackCodeEditor {...editorProps} />
      </SandpackLayout>
    </Chrome>
  );
};

export { CodeEditor };
