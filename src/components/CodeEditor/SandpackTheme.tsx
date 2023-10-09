import { SandpackTheme } from '@codesandbox/sandpack-react/types';

export const sandpackTheme: SandpackTheme = {
  colors: {
    surface1: '#03020d',
    surface2: '#2b303b',
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
      color: '#667085',
      fontStyle: 'italic',
    },
    keyword: '#0080ff',
    tag: '#4da6ff',
    punctuation: '#ffffff',
    definition: '#b986f8',
    property: '#2894ff',
    static: '#FF453A',
    string: '#ff47db',
  },
  font: {
    body: '"Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono: '"JetBrains Mono", "Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
    size: '13px',
    lineHeight: '20px',
  },
};
