import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllExampleIds, getExampleWithContent } from '@/lib/examples';
import { canonicalUrl } from '@/lib/site-config';
import { ExamplePageClient } from './ExamplePageClient';

interface ExamplePageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for all examples
export async function generateStaticParams() {
  const ids = getAllExampleIds();
  return ids.map((id) => ({ id }));
}

// Generate metadata for each example
export async function generateMetadata({ params }: ExamplePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const example = getExampleWithContent(resolvedParams.id);

  if (!example) {
    return {
      title: 'Not Found',
    };
  }

  const title = example.metaTitle || `Ably Examples | ${example.name}`;
  const description = example.metaDescription || example.description;
  const canonical = canonicalUrl(`/examples/${example.id}`);

  return {
    title,
    description,
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

export default async function ExamplePage({ params }: ExamplePageProps) {
  const resolvedParams = await params;
  const example = getExampleWithContent(resolvedParams.id);

  if (!example) {
    notFound();
  }

  return <ExamplePageClient example={example} />;
}
