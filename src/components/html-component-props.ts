import { Component, FunctionComponent, JSXElementConstructor } from 'react';

export type ValidReactElement =
  | keyof JSX.IntrinsicElements
  | JSXElementConstructor<typeof Component | FunctionComponent>;

export type HtmlComponentProps<T extends ValidReactElement> = {
  attribs: React.ComponentProps<T>;
  data: HtmlComponentProps<ValidReactElement>[] | string;
  type?: string;
};
