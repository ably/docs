export type SidebarData = {
  content?: SidebarData[];
  parent?: SidebarData;
  label: string;
  link: string;
  level?: number;
};
