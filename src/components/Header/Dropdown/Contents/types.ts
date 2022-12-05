export type DropdownContentLink = {
  href: string;
  text: string;
  rel?: string;
  external?: boolean;
};

export type Content = {
  link: DropdownContentLink;
  description: string;
};
