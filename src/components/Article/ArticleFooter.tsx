import { supportClickTracker } from 'src/external-scripts/google-tag-manager/events';
import { InArticleBanner, InArticleBannerCopy, InArticleOptions } from './InArticleBanner';

export const ArticleFooter = () => (
  <InArticleBanner>
    <InArticleBannerCopy title="Need help?">
      If you need any help with your implementation or if you have encountered any problems, do get in touch. You can
      also quickly find answers from our{' '}
      <a href="/support" className="ui-link">
        FAQs
      </a>
      , and{' '}
      <a className="ui-link" href="/blog">
        blog
      </a>
      .
    </InArticleBannerCopy>
    <InArticleOptions
      primaryOptionLabel="Support &amp; Help"
      primaryOptionDestination="/support"
      primaryTracker={supportClickTracker}
    />
  </InArticleBanner>
);
