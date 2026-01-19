import { Metadata } from 'next';
import { canonicalUrl } from '@/lib/site-config';
import { ExamplesListPage } from './ExamplesListPage';

export const metadata: Metadata = {
  title: 'Examples',
  description: 'Browse interactive code examples for Ably Pub/Sub, Chat, Spaces, LiveObjects, and AI Transport.',
  alternates: {
    canonical: canonicalUrl('/examples'),
  },
};

export default function ExamplesPage() {
  return <ExamplesListPage />;
}
