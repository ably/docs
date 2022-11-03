import { safeWindow } from './safe-window';

export const isMac = safeWindow.navigator.platform.toUpperCase().indexOf('MAC') >= 0;
