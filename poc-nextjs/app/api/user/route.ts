import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { UserDetails, SessionState, App } from '@/lib/update-ably-connection-keys';

// Rails API base URL - matches the Gatsby configuration
const RAILS_API_BASE = process.env.NEXT_PUBLIC_ABLY_MAIN_WEBSITE || 'https://ably.com';

/**
 * API Route Handler: GET /api/user
 *
 * This route proxies requests to the Rails session endpoints to fetch:
 * 1. Session state (/api/me) - user authentication status and profile
 * 2. API keys (/api/api_keys) - user's Ably applications and API keys
 *
 * The Rails session cookie is automatically forwarded because we're reading
 * cookies from the incoming request and including them in our fetch calls.
 *
 * This pattern enables:
 * - SSR-compatible session validation
 * - API key injection in Sandpack without client-side cookie exposure
 * - Unified session handling across Docs (Next.js) and Dashboard (Rails)
 */
export async function GET(request: NextRequest) {
  try {
    // Read the cookies from the incoming request
    // This will include the Rails session cookie if user is logged in
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    // Format cookies for forwarding to Rails
    const cookieHeader = allCookies
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ');

    // Log for debugging (remove in production)
    console.log('[/api/user] Cookie names present:', allCookies.map(c => c.name));

    // Fetch session state from Rails
    const sessionResponse = await fetch(`${RAILS_API_BASE}/api/me`, {
      headers: {
        Cookie: cookieHeader,
        Accept: 'application/json',
      },
      // Important: include credentials to forward cookies
      credentials: 'include',
    });

    let sessionState: SessionState = {};
    if (sessionResponse.ok) {
      sessionState = await sessionResponse.json();
      console.log('[/api/user] Session signedIn:', sessionState.signedIn);
    } else {
      console.log('[/api/user] Session response status:', sessionResponse.status);
    }

    // Fetch API keys from Rails (only if signed in)
    let apps: App[] = [];
    if (sessionState.signedIn) {
      const keysResponse = await fetch(`${RAILS_API_BASE}/api/api_keys`, {
        headers: {
          Cookie: cookieHeader,
          Accept: 'application/json',
        },
        credentials: 'include',
      });

      if (keysResponse.ok) {
        apps = await keysResponse.json();
        console.log('[/api/user] API keys found:', apps.length);
      } else {
        console.log('[/api/user] API keys response status:', keysResponse.status);
      }
    }

    const userData: UserDetails = {
      sessionState,
      apps,
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error('[/api/user] Error:', error);

    // Return empty user data on error - will fall back to demo key
    return NextResponse.json({
      sessionState: {},
      apps: [],
    } satisfies UserDetails);
  }
}
