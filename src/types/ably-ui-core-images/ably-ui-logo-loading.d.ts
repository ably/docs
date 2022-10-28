declare module '@ably/ui/core/Logo' {
  import { FunctionComponent } from 'react';
  export interface LogoProps {
    dataId: string;
    href: string;
  }

  const Logo: FunctionComponent<LogoProps>;

  export default Logo;
}
