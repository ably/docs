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
    if (content && isArray(content)) {
      return any(checkSectionMatch(match), content);
    }
    return !!data.link && match === data.link;
  };
