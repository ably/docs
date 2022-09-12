import React from 'react';
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
      secondaryOptionLabel="Contact Us"
      secondaryOptionDestination="/contact"
    />
  </InArticleBanner>
);
