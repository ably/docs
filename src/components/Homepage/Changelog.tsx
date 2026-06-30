import { useStaticQuery, graphql } from 'gatsby';
import FeaturedLink from '@ably/ui/core/FeaturedLink';
import Link from '../Link';
import ChangelogTag from '../Changelog/ChangelogTag';
import { sortByDateDesc } from '../Changelog/filter-changelog';
import { formatShortDate } from '../Changelog/format-date';
import { ChangelogEntry } from '../Changelog/types';
import { ChangelogFileNode, nodesToEntries } from '../Changelog/entries';

interface HomepageChangelogData {
  entries: {
    nodes: ChangelogFileNode[];
  };
}

const ChangelogRow = ({ entry }: { entry: ChangelogEntry }) => (
  <li>
    <Link to={entry.link} className="flex gap-4 group p-1 -m-1 rounded">
      <div className="ui-text-p3 flex-shrink-0 text-neutral-800 dark:text-neutral-500">
        {formatShortDate(entry.date)}
      </div>
      <div className="grid gap-1">
        <div className="text-neutral-1300 dark:text-neutral-000 font-bold group-hover:underline block mb-0.5">
          {entry.title}
        </div>
        {entry.products.length > 0 && (
          <div className="flex gap-0.5 flex-wrap mb-0.5">
            {entry.products.map((product) => (
              <ChangelogTag key={product} product={product} />
            ))}
          </div>
        )}
        <p className="ui-text-p3 text-neutral-800 group-hover:text-neutral-1000 dark:text-neutral-500 dark:group-hover:text-neutral-300 line-clamp-2">
          {entry.description}
        </p>
      </div>
    </Link>
  </li>
);

export const ChangelogSection = () => {
  const data = useStaticQuery<HomepageChangelogData>(graphql`
    query HomepageChangelogQuery {
      entries: allFile(
        filter: {
          sourceInstanceName: { eq: "pages" }
          extension: { eq: "mdx" }
          relativeDirectory: { regex: "/^docs/changelog(/|$)/" }
        }
      ) {
        nodes {
          name
          relativeDirectory
          childMdx {
            frontmatter {
              title
              meta_description
              date
              products
            }
          }
        }
      }
    }
  `);

  // Pull the three most recent changelog entries straight from the MDX collection
  // (no external RSS feed), ordered by the `date` frontmatter.
  const entries: ChangelogEntry[] = sortByDateDesc(nodesToEntries(data.entries.nodes)).slice(0, 3);

  return (
    <div className="rounded-lg border border-neutral-300 dark:border-neutral-1000 p-6 lg:p-8 mt-6 md:mt-0">
      <div className="flex justify-between items-center mb-6">
        <h3 className="ui-text-h3 text-neutral-1300 dark:text-neutral-000">Changelog</h3>
        <FeaturedLink
          iconColor="text-orange-600"
          additionalCSS="ui-text-p3 text-neutral-1300 dark:text-neutral-000 hover:text-neutral-1300 dark:hover:text-neutral-000"
          url="/docs/changelog"
        >
          View all
        </FeaturedLink>
      </div>
      <ul className="grid grid-cols-1 gap-y-6">
        {entries.map((entry) => (
          <ChangelogRow key={entry.link} entry={entry} />
        ))}
      </ul>
    </div>
  );
};
