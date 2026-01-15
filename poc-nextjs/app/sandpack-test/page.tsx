"use client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { githubLight } from "@codesandbox/sandpack-themes";

// Simple vanilla JS code that works without external deps
const sampleCode = `// Counter Example
let count = 0;

const app = document.getElementById('app');
app.innerHTML = \`
  <h1>Counter: <span id="count">0</span></h1>
  <button id="increment">+1</button>
  <button id="decrement">-1</button>
\`;

document.getElementById('increment').onclick = () => {
  count++;
  document.getElementById('count').textContent = count;
};

document.getElementById('decrement').onclick = () => {
  count--;
  document.getElementById('count').textContent = count;
};
`;

export default function SandpackTestPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Sandpack SSR Test</h1>
      <p>Testing Sandpack with Next.js 15 App Router (use client directive)</p>

      <div style={{ marginTop: "2rem" }}>
        <SandpackProvider
          template="vanilla"
          theme={githubLight}
          files={{
            "/index.js": sampleCode,
          }}
          customSetup={{}}
          options={{
            autorun: true,
            autoReload: true,
          }}
        >
          <SandpackLayout>
            <SandpackCodeEditor
              showLineNumbers
              showTabs
              style={{ height: "400px" }}
            />
            <SandpackPreview
              showRefreshButton
              showOpenInCodeSandbox={false}
              style={{ height: "400px" }}
            />
          </SandpackLayout>
        </SandpackProvider>
      </div>

      <div style={{ marginTop: "2rem", padding: "1rem", background: "#f5f5f5", borderRadius: "8px" }}>
        <h3>Test Checklist:</h3>
        <ul>
          <li>Code editor loads and is editable</li>
          <li>Preview panel shows output</li>
          <li>Can run/refresh code</li>
          <li>No hydration warnings in console</li>
        </ul>
      </div>
    </main>
  );
}
