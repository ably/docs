import { Component, FunctionComponent, JSXElementConstructor } from 'react';

export type Attribs<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<typeof Component | FunctionComponent>,
> = {
  attribs: React.ComponentProps<T>;
};
