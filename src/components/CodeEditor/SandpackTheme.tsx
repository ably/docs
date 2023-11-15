import { SandpackTheme } from '@codesandbox/sandpack-react/types';

export const sandpackTheme: SandpackTheme = {
  colors: {
    surface1: '#03020d',
    surface2: '#2B303B',
    surface3: '#202531',
    clickable: '#adb6c2',
    base: '#141924',
    disabled: '#a8a8a8',
    hover: '#f4f8fb',
    accent: '#ff5416',
    error: '#fb0c0c',
    errorSurface: '#fff5f1',
  },
  syntax: {
    plain: '#FFFFFF',
    comment: {
      color: '#d9d9da',
      fontStyle: 'italic',
    },
    keyword: '#bb87d3',
    tag: '#4da6ff',
    punctuation: '#ffffff',
    definition: '#bb87d3',
    property: '#79c0ff',
    static: '#79c0ff',
    string: '#b9ca4a',
  },
  font: {
    body: '"NEXT Book", "Arial", "Helvetica", "sans-serif"',
    mono: '"Source Code Pro", "Courier", "monospace"',
    size: '13px',
    lineHeight: '20px',
  },
};
