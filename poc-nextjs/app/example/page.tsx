'use client';

import { useEffect, useState } from 'react';
import { SandpackProvider, SandpackCodeEditor, SandpackPreview, SandpackLayout } from '@codesandbox/sandpack-react';
import { githubLight } from '@codesandbox/sandpack-themes';
import { getApiKey, updateAblyConnectionKey, DEMO_API_KEY, type UserDetails } from '@/lib/update-ably-connection-keys';

/**
 * Sample Sandpack files demonstrating API key injection
 * The VITE_ABLY_KEY placeholder gets replaced with the real API key
 */
const SAMPLE_FILES = {
  '/index.js': `import Ably from 'ably';

// API key is injected at runtime - no secrets in source code
const ably = new Ably.Realtime({
  key: import.meta.env.VITE_ABLY_KEY,
});

const channel = ably.channels.get('hello-channel');

// Subscribe to messages
channel.subscribe('greeting', (message) => {
  console.log('Received:', message.data);
  document.getElementById('output').innerHTML +=
    '<p>Received: ' + message.data + '</p>';
});

// Publish a test message after connection
ably.connection.once('connected', () => {
  console.log('Connected to Ably!');
  document.getElementById('output').innerHTML = '<p>Connected to Ably!</p>';

  channel.publish('greeting', 'Hello from Sandpack!');
});

// Display connection state
ably.connection.on('statechange', (state) => {
  document.getElementById('status').textContent = state.current;
});
`,
  '/index.html': `<!DOCTYPE html>
<html>
<head>
  <title>Ably Sandpack Demo</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      padding: 20px;
      max-width: 600px;
    }
    #status {
      padding: 4px 8px;
      background: #f0f0f0;
      border-radius: 4px;
      font-size: 12px;
    }
    #output {
      margin-top: 16px;
      padding: 12px;
      background: #f9f9f9;
      border-radius: 8px;
      min-height: 100px;
    }
    .api-key-display {
      font-family: monospace;
      background: #ffffcc;
      padding: 8px;
      border-radius: 4px;
      margin-top: 16px;
      word-break: break-all;
    }
  </style>
</head>
<body>
  <h2>Ably Pub/Sub Demo</h2>
  <p>Connection status: <span id="status">initializing...</span></p>
  <div id="output">Connecting...</div>
  <script type="module" src="./index.js"></script>
</body>
</html>
`,
};

/**
 * ExamplePage - Demonstrates API key injection in Next.js with Sandpack
 *
 * Key aspects of hydration safety:
 * 1. We start with null userData (no data on server or first client render)
 * 2. Data is fetched client-side via useEffect
 * 3. Until data loads, we show a consistent loading state
 * 4. This ensures server HTML matches initial client render
 */
export default function ExamplePage() {
  // State for user data - null means "not loaded yet"
  const [userData, setUserData] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data on mount (client-side only)
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Set empty user data to show demo key
        setUserData({ sessionState: {}, apps: [] });
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, []);

  // Get API key from user data (falls back to demo key)
  const apiKey = getApiKey(userData, true); // true = prefer demo app

  // Apply API key injection to Sandpack files
  const processedFiles = updateAblyConnectionKey(SAMPLE_FILES, apiKey);

  // Determine user state for display
  const isSignedIn = userData?.sessionState?.signedIn ?? false;
  const userName = userData?.sessionState?.user?.firstName;
  const isUsingDemoKey = apiKey === DEMO_API_KEY;

  // Show loading state until data is fetched
  // This ensures consistent server/client render
  if (isLoading) {
    return (
      <main>
        <h1>Sandpack with API Key Injection</h1>
        <p>Loading user session...</p>
        <div style={{
          padding: '20px',
          background: '#f0f0f0',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <p>Checking authentication status...</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1>Sandpack with API Key Injection</h1>

      {/* User status banner */}
      <div style={{
        padding: '12px 16px',
        background: isSignedIn ? '#d4edda' : '#fff3cd',
        borderRadius: '8px',
        marginBottom: '20px',
        border: `1px solid ${isSignedIn ? '#c3e6cb' : '#ffc107'}`,
      }}>
        {isSignedIn ? (
          <span>Logged in as <strong>{userName || 'User'}</strong> - using your real API key</span>
        ) : (
          <span>Not logged in - using demo API key</span>
        )}
        {error && <span style={{ color: '#dc3545', marginLeft: '10px' }}>(Error: {error})</span>}
      </div>

      {/* API key info */}
      <div style={{
        padding: '12px 16px',
        background: '#f8f9fa',
        borderRadius: '8px',
        marginBottom: '20px',
        fontFamily: 'monospace',
        fontSize: '14px',
      }}>
        <strong>API Key:</strong>{' '}
        <code style={{ background: '#e9ecef', padding: '2px 6px', borderRadius: '4px' }}>
          {isUsingDemoKey ? 'Demo Key (xVLyHw...)' : `${apiKey.slice(0, 10)}...`}
        </code>
      </div>

      {/* Sandpack editor with injected API key */}
      <SandpackProvider
        files={processedFiles}
        customSetup={{
          dependencies: {
            ably: '~2.14.0',
          },
          environment: 'parcel',
        }}
        theme={githubLight}
        template="static"
      >
        <SandpackLayout style={{ minHeight: '400px' }}>
          <SandpackCodeEditor
            showLineNumbers
            showTabs
            style={{ height: '400px' }}
          />
          <SandpackPreview
            showRefreshButton
            showOpenInCodeSandbox={false}
            style={{ height: '400px' }}
          />
        </SandpackLayout>
      </SandpackProvider>

      {/* Debug info */}
      <details style={{ marginTop: '20px' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Debug Info</summary>
        <pre style={{
          background: '#f5f5f5',
          padding: '16px',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '12px',
        }}>
          {JSON.stringify({
            isSignedIn,
            isUsingDemoKey,
            apiKeyPrefix: apiKey.slice(0, 10),
            appsCount: userData?.apps?.length ?? 0,
            sessionKeys: Object.keys(userData?.sessionState || {}),
          }, null, 2)}
        </pre>
      </details>

      {/* Hydration test marker */}
      <div
        id="hydration-test"
        data-hydration="complete"
        style={{
          marginTop: '20px',
          padding: '8px 12px',
          background: '#28a745',
          color: 'white',
          borderRadius: '4px',
          fontSize: '12px',
        }}
      >
        Hydration complete - no mismatch detected
      </div>
    </main>
  );
}
