import posthog from 'posthog-js';

const posthogSetup = (posthogApiKey: string) => {
  posthog.init(posthogApiKey, { api_host: 'https://app.posthog.com' });
};

const posthogIdentifyUser = (userId: string) => posthog.identify(userId);
const posthogSetUserEmail = (email: string) => posthog.people.set({ email });

export { posthogIdentifyUser, posthogSetUserEmail };

export default posthogSetup;
