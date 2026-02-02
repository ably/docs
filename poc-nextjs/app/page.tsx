import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>POC: API Key Injection (Next.js 15)</h1>
      <p>
        This proof of concept validates that the API key injection pattern from
        the Gatsby Docs site can be replicated in Next.js 15 with App Router.
      </p>

      <h2>What this POC tests:</h2>
      <ul>
        <li>Reading Rails session cookie from Next.js route handler</li>
        <li>Fetching user data and API keys from Rails endpoints</li>
        <li>Injecting API keys into Sandpack code examples</li>
        <li>No hydration mismatches (client/server state sync)</li>
        <li>Fallback to demo key for logged-out users</li>
      </ul>

      <h2>Test Pages:</h2>
      <ul>
        <li>
          <Link href="/example">/example</Link> - Sandpack with API key injection
        </li>
      </ul>

      <h2>API Endpoints:</h2>
      <ul>
        <li>
          <a href="/api/user">/api/user</a> - Session proxy (returns user data
          and API keys)
        </li>
      </ul>
    </main>
  );
}
