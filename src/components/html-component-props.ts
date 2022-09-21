import { Component, FunctionComponent, JSXElementConstructor } from 'react';

export type ValidReactElement =
  | keyof JSX.IntrinsicElements
  | JSXElementConstructor<typeof Component | FunctionComponent>;

type ReactAttributes<T extends ValidReactElement> = React.ComponentProps<T> & { [key: `data-${string}`]: string };

export type HtmlAttributes<T extends ValidReactElement> = Omit<ReactAttributes<T>, 'ref'>;

export type NestedHtmlComponentProps<T extends ValidReactElement> = {
  attribs?: HtmlAttributes<T>;
  data: HtmlComponentProps<ValidReactElement>[];
  type?: string;
};

export type HtmlComponentPropsData = HtmlComponentProps<ValidReactElement>[] | string | null;

export type HtmlComponentProps<T extends ValidReactElement> = {
  attribs?: HtmlAttributes<T>;
  data: HtmlComponentPropsData;
  name?: string;
  type?: string;
};
