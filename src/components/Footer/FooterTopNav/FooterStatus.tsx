import FeaturedLink from '@ably/ui/core/FeaturedLink';
import React from 'react';

export const FooterStatus = () => (
  <>
    <div className="flex flex-row mt-24 -mb-6">
      <iframe className="w-24 h-24 mt-4" src="https://status.ably.com/embed/icon"></iframe>
      <span className="pl-8 font-medium">System status</span>
    </div>
    <FeaturedLink url="https://status.ably.com/" textSize="text-p3">
      <span className="ml-30">More on our status site</span>
    </FeaturedLink>
  </>
);
