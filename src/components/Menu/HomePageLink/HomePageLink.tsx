import { ARTICLE_TYPES, DOCUMENTATION_PATH } from '../../../../data/transform/constants';
import { ArticleTypeContext } from 'src/contexts/article-type-context';
import { HomeIcon } from './HomeIcon';

export const HomePageLink = () => (
  <ArticleTypeContext.Consumer>
    {(value) =>
      value === ARTICLE_TYPES.apiReference ? (
        <span
          className={`mr-auto ui-text-p3 align-middle self-center whitespace-nowrap group
          md:pl-adapt-homepage-link-medium
          lg:pl-adapt-homepage-link-large
          xl:pl-64 xl:left-0
          hover:text-active-orange`}
        >
          <a href={DOCUMENTATION_PATH}>
            <HomeIcon />
            <span className="hidden sm:inline">Go to Docs home</span>
            <span className="hidden xs:inline sm:hidden">Docs</span>
          </a>
        </span>
      ) : null
    }
  </ArticleTypeContext.Consumer>
);
