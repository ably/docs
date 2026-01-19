import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import { getAllMdxSlugs, getMdxBySlug } from '@/lib/mdx';
import { canonicalUrl, META_DESCRIPTION_FALLBACK } from '@/lib/site-config';
import { MDXPageClient } from './MDXPageClient';

interface DocPageProps {
  params: Promise<{ slug: string[] }>;
}

// Generate static params for all MDX pages
export async function generateStaticParams() {
  const slugs = await getAllMdxSlugs();

  return slugs.map((slug) => ({
    slug: slug.split('/'),
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.join('/');
  const mdxData = await getMdxBySlug(slug);

  if (!mdxData) {
    return {
      title: 'Not Found',
    };
  }

  const { frontmatter } = mdxData;
  const title = frontmatter.title || 'Documentation';
  const description = frontmatter.meta_description || META_DESCRIPTION_FALLBACK;
  const canonical = canonicalUrl(`/docs/${slug}`);

  return {
    title,
    description,
    keywords: frontmatter.meta_keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
    },
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.join('/');
  const mdxData = await getMdxBySlug(slug);

  if (!mdxData) {
    notFound();
  }

  const { frontmatter, content } = mdxData;

  // Serialize MDX content on the server
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      development: process.env.NODE_ENV === 'development',
    },
    parseFrontmatter: false, // Already parsed via gray-matter
  });

  return (
    <MDXPageClient
      mdxSource={mdxSource}
      frontmatter={frontmatter}
      slug={slug}
    />
  );
}
