import React, { useMemo } from 'react';
import * as Select from '@radix-ui/react-select';
import Badge from 'src/components/ui/Badge';
import Icon from 'src/components/Icon';
import Tooltip from 'src/components/ui/Tooltip';
import type { ApiKeysItem } from '../CodeSnippet';

type ApiKeySelectorProps = {
  apiKeys?: ApiKeysItem[];
  selectedApiKey: string;
  onApiKeyChange: (apiKey: string) => void;
};

const ApiKeySelector = ({ apiKeys, selectedApiKey, onApiKeyChange }: ApiKeySelectorProps) => {
  const isDemoMode = useMemo(() => apiKeys?.length === 1 && apiKeys[0].app === 'demo', [apiKeys]);

  const renderDemoMode = useMemo(
    () => (
      <div className="flex items-center gap-2">
        <Badge className="ml-1 bg-neutral-200 dark:bg-neutral-1100">DEMO ONLY</Badge>
        <Tooltip
          className="ml-0"
          triggerProps={{
            className: 'h-5',
          }}
          contentProps={{
            className: 'bg-neutral-1100 dark:bg-neutral-200 text-neutral-300 dark:text-neutral-1000',
          }}
          triggerElement={
            <div className="group/code-snippet-tooltip-icon-hover flex items-center justify-center">
              <Icon
                name="icon-gui-information-circle-outline"
                size="20px"
                color="text-neutral-700 dark:text-neutral-600"
                additionalCSS="group-hover/code-snippet-tooltip-icon-hover:hidden"
              />
              <Icon
                name="icon-gui-information-circle-solid"
                size="20px"
                color="text-neutral-1300 dark:text-neutral-000"
                additionalCSS="group-hover/code-snippet-tooltip-icon-hover:flex hidden"
              />
            </div>
          }
        >
          This code example uses a temporary key that is rate limited and expires in 4 hrs. Sign in to Ably to use your
          API keys instead.
        </Tooltip>
      </div>
    ),
    [],
  );

  const renderApiKeyDropdown = useMemo(() => {
    if (isDemoMode) {
      return renderDemoMode;
    }

    if (!apiKeys?.length) {
      return null;
    }

    return (
      <Select.Root value={selectedApiKey} onValueChange={onApiKeyChange}>
        <Select.Trigger
          className="font-sans inline-flex items-center justify-between rounded px-3 py-2 ml-1 text-14 text-neutral-1300 dark:text-neutral-000 bg-neutral-200 dark:bg-neutral-1100 hover:bg-neutral-300 dark:hover:bg-neutral-1000 gap-2 focus-base border border-neutral-300 dark:border-neutral-1000 transition-colors"
          aria-label="API Key"
        >
          <Select.Value />
          <Select.Icon className="size-4">
            <Icon name="icon-gui-chevron-down-micro" size="16px" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="overflow-hidden rounded-lg bg-neutral-000 dark:bg-neutral-1300 border border-neutral-300 dark:border-neutral-1000 shadow-md z-50">
            <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-neutral-000 dark:bg-neutral-1300 text-neutral-1300 dark:text-neutral-000 cursor-default focus-base">
              <Icon name="icon-gui-chevron-down-outline" size="16px" additionalCSS="rotate-180" />
            </Select.ScrollUpButton>

            <Select.Viewport className="rounded-lg font-sans">
              {apiKeys.map((apiKeyItem) => (
                <Select.Group key={apiKeyItem.app}>
                  {apiKeys.length > 1 && (
                    <Select.Label className="text-neutral-700 rounded-none dark:text-neutral-600 p-1 bg-neutral-200 dark:bg-neutral-1100">
                      {apiKeyItem.app}
                    </Select.Label>
                  )}
                  {apiKeyItem.keys.map(({ name, key }) => (
                    <Select.Item
                      key={`${apiKeyItem.app}-${name}-${key}`}
                      value={key}
                      className="relative flex items-center justify-between m-2 p-2 rounded-lg text-14 text-neutral-1300 dark:text-neutral-000 select-none hover:bg-neutral-100 dark:hover:bg-neutral-1200 data-[highlighted]:outline-none data-[highlighted]:bg-neutral-100 dark:data-[highlighted]:bg-neutral-1200 focus-base min-w-64"
                    >
                      <Select.ItemText>
                        {key.length > 10 ? `${key.substring(0, 10)}...` : key}
                        <span className="font-light">{name && ` - ${name}`}</span>
                      </Select.ItemText>
                      <Select.ItemIndicator className="size-4">
                        <Icon name="icon-gui-check-micro" size="16px" />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Group>
              ))}
            </Select.Viewport>

            <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-neutral-000 dark:bg-neutral-1300 text-neutral-1300 dark:text-neutral-000 cursor-default focus-base">
              <Icon name="icon-gui-chevron-down-outline" size="16px" />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  }, [apiKeys, isDemoMode, selectedApiKey, onApiKeyChange, renderDemoMode]);

  return (
    <div className="flex items-center border-t border-neutral-300 dark:border-neutral-1000 px-3 py-3">
      <span className="ui-text-label4 text-neutral-700 dark:text-neutral-600 mr-1">API key:</span>
      {renderApiKeyDropdown}
    </div>
  );
};

export default ApiKeySelector;
