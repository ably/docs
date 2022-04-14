import { JSXElementConstructor } from 'react';

export type Attribs<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = {
  attribs: React.ComponentProps<T>;
};
