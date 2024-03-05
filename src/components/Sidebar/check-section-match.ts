import { isArray } from 'lodash';
import { any } from 'lodash/fp';
import { withPrefix } from 'gatsby';

import { SidebarData } from './types';

export const checkSectionMatch =
  (match: string) =>
  (data: SidebarData): boolean => {
    const content = data.content;
    return content && isArray(content) ? any(checkSectionMatch(match), content) : match === withPrefix(data.link);
  };
