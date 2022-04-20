export type MenuData = {
  name: string;
  id: string;
  level?: number;
  parent: MenuData;
  content: MenuData[];
};
