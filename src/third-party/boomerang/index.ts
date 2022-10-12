import { safeWindow } from 'src/utilities';

export const loadBoomerang = (herokuSession: string) => () =>
  safeWindow.Boomerang?.init({ app: herokuSession, addon: 'ably' });
