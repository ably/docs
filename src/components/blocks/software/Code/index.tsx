import React, { useMemo, useState } from 'react';
import { every, some } from 'lodash/fp';

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

import '@ably/ui/core/styles.css';
import '../styles.css';
import { NestedHtmlComponentProps } from 'src/components/html-component-props';

const API_KEY_LENGTH = 57;
export const DEFAULT_API_KEY_MESSAGE = '<loading API key, please wait>';

export const multilineRegex = /\r|\n/gm;

const Code = ({ data, attribs }: NestedHtmlComponentProps<'div'>) => {
  const [activeApiKey, setActiveApiKey] = useState({
    label: DEFAULT_API_KEY_MESSAGE,
    value: DEFAULT_API_KEY_MESSAGE,
  });

  const isString = every((child) => child.type === HtmlDataTypes.text, data);
  const hasRenderableLanguages = isString && attribs && attribs.lang;
  const hasMultilineText = isString && some((child) => multilineRegex.test(child.data as string), data);

  const dataContainsKey = attribs?.[`data-contains-${API_KEY_DATA_ATTRIBUTE}`] === 'true';
  const dataContainsRandomChannelName = attribs?.[`data-contains-${RANDOM_CHANNEL_NAME_DATA_ATTRIBUTE}`] === 'true';

  const emptyContentValue = '';
  const content = data
    .map((child) => child.data as string | null)
    .reduce((acc, curr) => (acc as string).concat(curr ?? ''), emptyContentValue) as string;
  const contentWithRandomChannelName = useMemo(
    () =>
      dataContainsRandomChannelName ? content.replace(/{{RANDOM_CHANNEL_NAME}}/g, getRandomChannelName()) : content,
    [],
  );

  /**
   * Refer to Decision Record:
   * https://ably.atlassian.net/wiki/spaces/ENG/pages/2070053031/DR9+API+Keys+vs+tokens+vs+authUrls+in+docs+code+snippets#Recommendation
   * Referenced on ticket:
   * https://ably.atlassian.net/browse/EDX-49
   */
  const contentWithObfuscatedKey = useMemo(
    () =>
      dataContainsKey
        ? contentWithRandomChannelName.replace(/{{API_KEY}}/g, new Array(API_KEY_LENGTH).join('*'))
        : contentWithRandomChannelName,
    [contentWithRandomChannelName, activeApiKey],
  );
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
                displayLanguage={displayLanguage.key}
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
