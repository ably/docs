import { graphql, useStaticQuery } from 'gatsby';
import cn from '@ably/ui/core/utils/cn';

import { InkeepSearchBar } from './InkeepSearchBar';

import { searchInput, searchInputNoPadding } from './SearchBar.module.css';

export enum DisplayMode {
  FULL_SCREEN = 'FULL_SCREEN',
  MOBILE = 'MOBILE',
}

export const SearchBar = ({
  displayMode,
  displayLocation,
  extraStyleOptions,
}: {
  displayMode?: DisplayMode;
  displayLocation?: string;
  extraStyleOptions?: object;
}) => {
  const extraWrapperContainerStyle = extraStyleOptions && extraStyleOptions.wrapperContainer;
  const extraInputStyle = extraStyleOptions && extraStyleOptions.inputContainer;

  const {
    site: {
      siteMetadata: { externalScriptsData },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          externalScriptsData {
            inkeepChatEnabled
            inkeepSearchEnabled
          }
        }
      }
    }
  `);

  return (
    <div
      className={cn('relative items-center justify-start md:py-0', {
        'flex md:hidden': displayMode === DisplayMode.MOBILE,
        'hidden md:flex': displayMode === DisplayMode.FULL_SCREEN,
      })}
      style={{ ...extraWrapperContainerStyle }}
    >
      <div
        className={cn('relative w-full', {
          'mx-6 mt-6 md:m-0': displayLocation !== 'homepage',
        })}
      >
        {externalScriptsData.inkeepSearchEnabled && (
          <InkeepSearchBar className={`${searchInput} ${searchInputNoPadding}`} extraInputStyle={extraInputStyle} />
        )}
      </div>
    </div>
  );
};
