import { IconName } from '@ably/ui/core/Icon/types';

export type NavProduct = {
  name: string;
  icon: { closed: IconName; open: IconName };
  content: NavProductContent[];
  api: NavProductContent[];
  showJumpLink?: boolean;
};

export type NavProductPages = NavProductPage | NavProductContent;

export type NavProductContent = {
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
