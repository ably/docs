import { Component, FunctionComponent, JSXElementConstructor } from 'react';

export type HtmlComponentProps<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<typeof Component | FunctionComponent>,
> = {
  attribs: React.ComponentProps<T>;
  data: HtmlComponentProps<any>[];
};
