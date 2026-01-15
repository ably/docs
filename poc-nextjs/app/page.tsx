import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Sandpack SSR POC</h1>
      <p>Testing Sandpack compatibility with Next.js 15 App Router</p>
      <nav style={{ marginTop: "1rem" }}>
        <ul>
          <li>
            <Link href="/sandpack-test">Sandpack Test Page</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
