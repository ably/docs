import * as React from 'react';
import { Link, withPrefix } from 'gatsby';

const NotFoundPage = () => {
  return (
    <main>
      <title>Not found</title>
      <h1>404: Page not found</h1>
      <p>
        Sorry - we couldn&apos;t find what you were looking for.
        <br />
        {process.env.NODE_ENV === 'development' ? (
          <>
            Try creating a new page in <code>src/pages/</code> for specific pages, or using MDX in <code>how-tos/</code>
            .
          </>
        ) : null}
        <br />
        <Link to={withPrefix(`/`)}>Return to documentation home page</Link>.
      </p>
    </main>
  );
};

export default NotFoundPage;
