import { safeWindow } from 'src/utilities';

export const loadHeadway = (headwayAccountId: string) => () =>
  safeWindow.Headway?.init({ selector: '#headway-widget-target', account: headwayAccountId });
