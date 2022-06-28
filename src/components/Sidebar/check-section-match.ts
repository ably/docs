import { isArray } from 'lodash';
import { any } from 'lodash/fp';

type SidebarData = {
  label: string;
  link?: string;
  level?: number;
  content?: null | string | SidebarData[];
};
export const checkSectionMatch =
  (match: string) =>
  (data: SidebarData): boolean => {
    const content = data.content;
    return content && isArray(content) ? any(checkSectionMatch(match), content) : match === data.link;
  };
