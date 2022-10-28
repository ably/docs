declare module '@ably/ui/core/FeaturedLink' {
  import React from 'react';
  export interface FeatureLinkProps {
    url: string;
    textSize?: string;
    iconColor?: string;
    flush?: boolean;
    children: React.ReactNode;
  }

  const FeatureLink: React.FC<FeatureLinkProps>;

  export default FeatureLink;
}
