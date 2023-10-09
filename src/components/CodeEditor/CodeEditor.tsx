import React from 'react';
import { SandpackCodeEditor, SandpackLayout, SandpackFileExplorer, useSandpack } from '@codesandbox/sandpack-react';
import { CodeEditorProps } from '@codesanbox/sandpack-react/types';
import Chrome from './Chrome';

const ActiveFileDisplay = () => {
  const { sandpack } = useSandpack();
  const { activeFile } = sandpack;

  return activeFile;
};

type Props = { editor: CodeEditorProps };

const CodeEditor = ({ editor }: Props) => {
  const editorProps = {
    ...editor,
    showTabs: false,
  };

  return (
    <Chrome title={ActiveFileDisplay()}>
      <SandpackLayout className="rounded-none">
        <SandpackFileExplorer />
        <SandpackCodeEditor {...editorProps} />
      </SandpackLayout>
    </Chrome>
  );
};

export { CodeEditor };
