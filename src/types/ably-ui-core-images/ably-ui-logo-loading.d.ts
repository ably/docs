declare module '@ably/ui/core/Logo' {
  import { FunctionComponent } from 'react';
  export interface LogoProps {
    dataId: string;
    href: string;
    logoUrl: string;
  }

  const Logo: FunctionComponent<LogoProps>;

  export default Logo;
}
