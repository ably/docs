import { redirect } from 'next/navigation';

// Redirect /docs to the first documentation page
export default function DocsIndexPage() {
  // Redirect to the getting started page
  redirect('/docs/getting-started');
}
