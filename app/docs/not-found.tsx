import Link from 'next/link';

export default function DocsNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h1 className="ui-text-title mb-4">Page Not Found</h1>
      <p className="ui-text-p1 text-neutral-700 dark:text-neutral-400 mb-8 max-w-md">
        The documentation page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="flex gap-4">
        <Link href="/docs" className="ui-button-primary">
          Browse Documentation
        </Link>
        <Link href="/examples" className="ui-button-secondary">
          View Examples
        </Link>
      </div>
    </div>
  );
}
