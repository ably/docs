import { Component, FunctionComponent, JSXElementConstructor } from 'react';

export type ValidReactElement =
  | keyof JSX.IntrinsicElements
  | JSXElementConstructor<typeof Component | FunctionComponent>;

export type NestedHtmlComponentProps<T extends ValidReactElement> = {
  attribs?: React.ComponentProps<T> & { [key: `data-${string}`]: string };
  data: HtmlComponentProps<ValidReactElement>[];
  type?: string;
};

export type HtmlComponentProps<T extends ValidReactElement> = {
  attribs?: React.ComponentProps<T> & { [key: `data-${string}`]: string };
  data: HtmlComponentProps<ValidReactElement>[] | string | null;
  type?: string;
};
