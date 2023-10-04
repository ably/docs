import React from 'react';
import { SandpackCodeEditor, SandpackLayout, SandpackPreview, useSandpack } from '@codesandbox/sandpack-react';
import Chrome from './Chrome';

const ActiveFileDisplay = () => {
  const { sandpack } = useSandpack();
  const { activeFile } = sandpack;

  return activeFile;
};

const CodeEditor = (props) => {
  return (
    <Chrome title={ActiveFileDisplay()}>
      <SandpackLayout {...props}>
        <SandpackCodeEditor {...props} />
        <SandpackPreview {...props} />
      </SandpackLayout>
    </Chrome>
  );
};

export default CodeEditor;
