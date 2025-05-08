import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';
import { Key } from 'react';
import Badge from '@ably/ui/core/Badge';
import FeaturedLink from '@ably/ui/core/FeaturedLink';
import Link from '../Link';
import parse from '@js-bits/dom-parser';

interface ChangelogFeedItemNode {
  title: string;
  link: string;
  content: string;
  isoDate: string;
}

interface ChangelogFeedEdge {
  node: ChangelogFeedItemNode;
}

interface ChangelogQueryData {
  allFeedAblyChangelog: {
    edges: ChangelogFeedEdge[];
  };
  feedAblyChangelogMeta: {
    link: string;
  };
}

const ChangelogEntry = ({
  date,
  href,
  title,
  description,
  tags,
}: {
  date: string;
  href: string;
  title: string;
  description: string;
  tags?: string[];
}) => {
  const getTagStyle = (tag: string) => {
    const tagLower = tag.toLowerCase();

    if (tagLower.includes('fix')) {
      return 'blue';
    }
    if (tagLower.includes('improvement')) {
      return 'green';
    }
    if (tagLower.includes('new')) {
      return 'red';
    }
    return 'neutral';
  };

  return (
    <li>
      <Link to={href} target="_blank" className="flex gap-16 group p-4 -m-4 rounded">
        <div className="ui-text-p3 flex-shrink-0 text-neutral-800 dark:text-neutral-500">{date}</div>
        <div className="grid gap-4">
          <div className="text-neutral-1300 dark:text-neutral-000 font-bold group-hover:underline block mb-2">
            {title}
          </div>
          {tags && tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-2">
              {tags.map((tag: string) => (
                <Badge key={tag} color={getTagStyle(tag)}>
                  {tag.toUpperCase()}
                </Badge>
              ))}
            </div>
          )}
          <p className="ui-text-p3 text-neutral-800 group-hover:text-neutral-1000 dark:text-neutral-500 dark:group-hover:text-neutral-300 line-clamp-2">
            {description}
          </p>
        </div>
      </Link>
    </li>
  );
};

const stripHtml = (html: string | null | undefined): string => {
  if (!html) {
    return '';
  }

  const doc = parse(html);

  return doc.textContent || '';
};

const parseChangelogContent = (htmlContent: string): { tags: string[]; description: string } => {
  const extractedTags: string[] = [];
  let descriptionText = '';

  try {
    if (htmlContent) {
      const tagRegex = /<h3 class='category category_\d+'>(.*?)<\/h3>/gi;
      let tagMatch;
      while ((tagMatch = tagRegex.exec(htmlContent)) !== null) {
        if (tagMatch[1]) {
          extractedTags.push(tagMatch[1]);
        }
      }

      const afterCategoriesMarker = '<span class="afterCategories">&nbsp;</span>';
      const markerEndIndex = htmlContent.indexOf(afterCategoriesMarker);
      const paragraphTexts: string[] = [];

      if (markerEndIndex !== -1) {
        let searchStartIndex = markerEndIndex + afterCategoriesMarker.length;

        for (let i = 0; i < 2; i++) {
          const pStartIndex = htmlContent.indexOf('<p>', searchStartIndex);
          if (pStartIndex === -1) {
            break;
          }

          const pEndIndex = htmlContent.indexOf('</p>', pStartIndex);
          if (pEndIndex === -1) {
            break;
          }

          const paragraphHtml = htmlContent.substring(pStartIndex, pEndIndex + 4);
          const strippedText = stripHtml(paragraphHtml).trim();

          if (strippedText) {
            paragraphTexts.push(strippedText);
          }

          searchStartIndex = pEndIndex + 4;
        }

        descriptionText = paragraphTexts.join(' ').trim();
      }
    }
  } catch (error) {
    console.error('Error parsing changelog content:', error);
    descriptionText = stripHtml(htmlContent).substring(0, 200);
    return { tags: [], description: descriptionText };
  }

  return { tags: extractedTags, description: descriptionText };
};

const formatChangelogDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
};

export const ChangelogSection = () => {
  const data = useStaticQuery<ChangelogQueryData>(graphql`
    query ChangelogFeedQuery {
      allFeedAblyChangelog(sort: { isoDate: DESC }, limit: 3) {
        edges {
          node {
            title
            link
            content
            isoDate
          }
        }
      }
      feedAblyChangelogMeta {
        link
      }
    }
  `);

  return (
    <div className="rounded-lg border border-neutral-300 dark:border-neutral-1000 p-24 lg:p-32 mt-24 md:mt-0">
      <div className="flex justify-between items-center mb-24">
        <h3 className="ui-text-h3 text-neutral-1300 dark:text-neutral-000">Changelog</h3>
        <FeaturedLink
          iconColor="text-orange-600"
          additionalCSS="ui-text-p3 text-neutral-1300 dark:text-neutral-000 hover:text-neutral-1300 dark:hover:text-neutral-000"
          url={data.feedAblyChangelogMeta.link}
        >
          View all
        </FeaturedLink>
      </div>
      <ul className="grid grid-cols-1 gap-y-24">
        {data.allFeedAblyChangelog.edges.map(({ node }: ChangelogFeedEdge, index: Key) => {
          try {
            const { tags, description } = parseChangelogContent(node.content);

            return (
              <ChangelogEntry
                key={node.link || index}
                date={formatChangelogDate(node.isoDate)}
                href={node.link}
                title={node.title}
                description={description}
                tags={tags}
              />
            );
          } catch (error) {
            console.error('Error parsing changelog content:', error);
            return null;
          }
        })}
      </ul>
    </div>
  );
};
