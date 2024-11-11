import { IconName } from '@ably/ui/core/Icon/types';

const navProductKeys: string[] = ['platform', 'pubsub', 'chat', 'spaces', 'liveSync', 'assetTracking'];

export type NavProductKey = (typeof navProductKeys)[number];

export type NavProduct = {
  name: string;
  icon: { closed: IconName; open: IconName };
  content: NavProductContent[];
};

export type NavProductPages = NavProductPage | NavProductContent;

type NavProductContent = {
  name: string;
  pages: NavProductPages[];
};

type NavProductPage = {
  name: string;
  link: string;
  breadcrumbs?: boolean;
  external?: boolean;
  rightNav?: boolean;
};

export type NavData = { [key in NavProductKey]: NavProduct };
