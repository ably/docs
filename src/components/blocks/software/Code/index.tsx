import React, { useMemo, useState } from 'react';
import { some } from 'lodash/fp';

import Html from 'src/components/blocks/Html';
import { languageSyntaxHighlighterNames } from 'src/maps/language';
import UserContext, { devApiKeysPresent } from 'src/contexts/user-context';

import HtmlDataTypes from '../../../../../data/types/html';
import { API_KEY_DATA_ATTRIBUTE } from '../../../../../data/html-parser/add-info-to-codeblocks/codeblock-api-key-info';
import { RANDOM_CHANNEL_NAME_DATA_ATTRIBUTE } from '../../../../../data/html-parser/add-info-to-codeblocks/codeblock-random-channel-name';

import APIKeyMenuSelector from './ApiKeyMenuSelector';
import InlineCodeElement from './InlineCodeElement';
import CodeCopyButton from './CodeCopyButton';
import { MultilineCodeContent } from './MultilineCodeContent';
import { getRandomChannelName } from './get-random-channel-name';

import '../styles.css';
import { NestedHtmlComponentProps } from 'src/components/html-component-props';
import { extractCodeStringsFromContent } from './extract-code-strings-from-content';

const API_KEY_LENGTH = 5;
export const DEFAULT_API_KEY_MESSAGE = '<loading API key, please wait>';

export const multilineRegex = /\r|\n/gm;

const Code = ({ data, attribs }: NestedHtmlComponentProps<'div'>) => {
  const [activeApiKey, setActiveApiKey] = useState({
    label: DEFAULT_API_KEY_MESSAGE,
    value: DEFAULT_API_KEY_MESSAGE,
  });

  const isString = some((child) => child.type === HtmlDataTypes.text, data);
  const hasRenderableLanguages = isString && attribs && attribs.lang;

  const dataContainsKey = attribs?.[`data-contains-${API_KEY_DATA_ATTRIBUTE}`] === 'true';
  const dataContainsRandomChannelName = attribs?.[`data-contains-${RANDOM_CHANNEL_NAME_DATA_ATTRIBUTE}`] === 'true';

  const content = extractCodeStringsFromContent(data)
    .join('')
    .replace(/<\/?code>/g, '@'); // Don't nest <code> inside <code> components; it's probably textile-js mis-interpreting Objective-C code.
  const contentWithRandomChannelName = useMemo(
    () =>
      dataContainsRandomChannelName ? content.replace(/{{RANDOM_CHANNEL_NAME}}/g, getRandomChannelName()) : content,
    [attribs?.lang],
  );

  const hasMultilineText = isString && multilineRegex.test(content);
  /**
   * Refer to Decision Record:
   * https://ably.atlassian.net/wiki/spaces/ENG/pages/2070053031/DR9+API+Keys+vs+tokens+vs+authUrls+in+docs+code+snippets#Recommendation
   * Referenced on ticket:
   * https://ably.atlassian.net/browse/EDX-49
   */
  const contentWithObfuscatedKey = useMemo(() => {
    const firstSectionApiKey = activeApiKey.value.substring(0, activeApiKey.value.indexOf(':') + 1);
    const displayApiKey = firstSectionApiKey ? firstSectionApiKey : activeApiKey.value.substring(0, 10) + ':';
    return dataContainsKey
      ? contentWithRandomChannelName.replace(
          /{{API_KEY}}/g,
          `${displayApiKey}${new Array(API_KEY_LENGTH + 1).join('*')}`,
        )
      : contentWithRandomChannelName;
  }, [contentWithRandomChannelName, activeApiKey]);
  const contentWithKey = useMemo(
    () =>
      dataContainsKey
        ? contentWithRandomChannelName.replace(/{{API_KEY}}/g, activeApiKey.value)
        : contentWithRandomChannelName,
    [contentWithRandomChannelName, activeApiKey],
  );

  if (hasRenderableLanguages || hasMultilineText) {
    const displayLanguage =
      attribs?.lang && languageSyntaxHighlighterNames[attribs?.lang]
        ? languageSyntaxHighlighterNames[attribs.lang]
        : languageSyntaxHighlighterNames['plaintext'];

    return (
      <>
        <div {...attribs} className="overflow-auto relative p-16" data-testid="code-block">
          <UserContext.Consumer>
            {(value) => (
              <MultilineCodeContent
                signedIn={value.sessionState.signedIn}
                dataContainsKey={dataContainsKey}
                content={contentWithRandomChannelName}
                contentWithKey={contentWithKey}
                contentWithObfuscatedKey={contentWithObfuscatedKey}
                language={displayLanguage.key}
              />
            )}
          </UserContext.Consumer>
        </div>
        <UserContext.Consumer>
          {(value) => (
            <APIKeyMenuSelector
              dataContainsKey={dataContainsKey}
              // @ts-ignore - fix api key type mismatch
              userApiKeys={process.env.GATSBY_DOCS_API_KEYS ? devApiKeysPresent : value.apiKeys.data}
              setActiveApiKey={setActiveApiKey}
              activeApiKey={activeApiKey}
              signedIn={!!value.sessionState.signedIn || !!process.env.GATSBY_DOCS_SIGNED_IN}
            />
          )}
        </UserContext.Consumer>
        <CodeCopyButton
          language={attribs?.lang}
          content={dataContainsKey ? contentWithKey : contentWithRandomChannelName}
        />
      </>
    );
  }
  return (
    <InlineCodeElement {...attribs}>
      <Html data={data} />
    </InlineCodeElement>
  );
};

export default Code;
