/**
 * Site configuration - replaces Gatsby's siteMetadata
 */

const stripTrailingSlash = (str: string) => (str.endsWith('/') ? str.slice(0, -1) : str);

const mainWebsite = stripTrailingSlash(process.env.NEXT_PUBLIC_ABLY_MAIN_WEBSITE ?? 'https://ably.com');

export const siteConfig = {
  siteUrl: mainWebsite,
  title: 'Documentation | Ably Realtime',
  description:
    'Ably provides a suite of APIs to build, extend, and deliver powerful digital experiences in realtime.',
};

export const externalScriptsData = {
  hubspotTrackingId: process.env.NEXT_PUBLIC_HUBSPOT_TRACKING_ID,
  gtmContainerId: process.env.NEXT_PUBLIC_GTM_CONTAINER_ID,
  headwayAccountId: process.env.NEXT_PUBLIC_HEADWAY_ACCOUNT_ID,
  announcementEnabled: process.env.NEXT_PUBLIC_ANNOUNCEMENT_ENABLED,
  oneTrustDomain: process.env.NEXT_PUBLIC_ONE_TRUST_DOMAIN,
  oneTrustEnabled: process.env.NEXT_PUBLIC_ONE_TRUST_ENABLED,
  oneTrustTest: process.env.NEXT_PUBLIC_ONE_TRUST_TEST,
  inkeepChatEnabled: process.env.NEXT_PUBLIC_INKEEP_CHAT_ENABLED === 'true',
  inkeepSearchEnabled: process.env.NEXT_PUBLIC_INKEEP_SEARCH_ENABLED === 'true',
  inkeepApiKey: process.env.NEXT_PUBLIC_INKEEP_CHAT_API_KEY,
  insightsEnabled: process.env.NEXT_PUBLIC_INSIGHTS_ENABLED === 'true',
  insightsDebug: process.env.NEXT_PUBLIC_INSIGHTS_DEBUG === 'true',
  mixpanelApiKey: process.env.NEXT_PUBLIC_MIXPANEL_API_KEY,
  mixpanelAutoCapture: !!process.env.NEXT_PUBLIC_MIXPANEL_AUTO_CAPTURE,
  posthogApiKey: process.env.NEXT_PUBLIC_POSTHOG_API_KEY,
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_API_HOST || 'https://insights.ably.com',
  posthogFeedbackSurveyName: process.env.NEXT_PUBLIC_POSTHOG_FEEDBACK_SURVEY_NAME || 'Docs Feedback',
  conversationsUrl: process.env.NEXT_PUBLIC_CONVERSATIONS_API_URL,
};

/**
 * Generate canonical URL from path
 */
export function canonicalUrl(path: string): string {
  return stripTrailingSlash(`${siteConfig.siteUrl}${path}`);
}

/**
 * Default meta description
 */
export const META_DESCRIPTION_FALLBACK =
  "Ably provides a suite of APIs to build, extend, and deliver powerful digital experiences in realtime. Organizations like Toyota, Bloomberg, HubSpot, and Hopin depend on Ably's platform to offload the growing complexity of business-critical realtime data synchronization at global scale.";
