import React from 'react';
import { contactUsClickTracker, supportClickTracker } from 'src/third-party/gtm/gtm';
import { InArticleBanner, InArticleBannerCopy, InArticleOptions } from './InArticleBanner';

export const ArticleFooter = () => (
  <InArticleBanner>
    <InArticleBannerCopy title="Need help?">
      If you need any help with your implementation or if you have encountered any problems, do get in touch. You can
      also quickly find answers from our <a href="/support">knowledge base</a>, and <a href="/blog">blog</a>.
    </InArticleBannerCopy>
    <InArticleOptions
      primaryOptionLabel="Support &amp; Help"
      primaryOptionDestination="/support"
      primaryTracker={supportClickTracker}
      secondaryOptionLabel="Contact Us"
      secondaryOptionDestination="/contact"
      secondaryTracker={contactUsClickTracker}
    />
  </InArticleBanner>
);
