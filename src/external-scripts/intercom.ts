import Intercom, { update } from '@intercom/messenger-js-sdk';

export const intercomSetup = (appId: string) => {
  Intercom({
    app_id: appId,
  });
};

export const intercomIdentifyUser = (
  sessionState: {
    user?: {
      name: string | undefined;
      createdAt: number | undefined;
      uuid: string;
      email: string;
    };
  } = {},
) => {
  if (!sessionState.user) {
    return;
  }

  const { user } = sessionState;

  update({
    user_id: user.uuid,
    email: user.email,
    name: user.name,
    created_at: sessionState.user.createdAt,
  });
};
