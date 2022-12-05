import posthog from 'posthog-js';

export const posthogIdentifyUser = (userId: string) => posthog.identify(userId);

export const posthogSetUserEmail = (email: string) => posthog.people.set({ email });
