export type DropdownContentLink = {
  href: string;
  text: string;
  rel?: string;
};

export type Content = {
  link: DropdownContentLink;
  description: string;
};
