declare module '@ably/ui/core/Icon' {
  import { FunctionComponent } from 'react';
  export interface IconProps {
    name: string;
    size?: string;
    color?: string;
    additionalCSS?: string;
  }

  const Icon: FunctionComponent<IconProps>;

  export default Icon;
}
