import { scriptLoader } from './utils';
import { track } from '@ably/ui/core/insights';

const inkeepChat = (
  apiKey: string | undefined,
  conversationsUrl: '',
  inkeepChatEnabled: boolean,
  inkeepSearchEnabled: boolean,
) => {
  if (!apiKey) {
    return;
  }

  scriptLoader(document, 'https://unpkg.com/@inkeep/cxkit-js@0.5.75/dist/embed.js', {
    defer: true,
    async: false,
    type: 'module',
    crossOrigin: 'anonymous',
    onload: () => {
      inkeepOnLoad(apiKey, conversationsUrl, inkeepChatEnabled, inkeepSearchEnabled);
    },
  });
};

declare global {
  interface Window {
    HubSpotConversations?: {
      widget: {
        load: () => void;
        open: () => void;
        remove: () => void;
      };
      on: (event: string, callback: (eventPayload: object) => void) => void;
      off: (event: string, callback: (() => void) | null) => void;
    };
    inkeepWidgetConfig?: object;
    inkeepWidget?: {
      update: (config: object) => void;
    };
    Inkeep: {
      ChatButton: (config: object) => {
        update: (config: object) => void;
      };
      SearchBar: (
        element: string,
        config: object,
      ) => {
        update: (config: object) => void;
        remount: () => void;
      };
    };
  }
}

const aiChatSettings = () => ({
  organizationDisplayName: 'Ably',
  aiAssistantAvatar:
    'https://storage.googleapis.com/organization-image-assets/ably-botAvatarDarkSrcUrl-1744125448083.png',
  getHelpOptions: [
    {
      name: 'Speak to sales',
      action: {
        type: 'open_link',
        url: '/contact',
      },
      isPinnedToToolbar: true,
    },
    {
      name: 'Get support',
      action: {
        type: 'open_link',
        url: '/support',
      },
      isPinnedToToolbar: true,
    },
  ],
  exampleQuestions: ['What is a channel?', 'How do I authenticate with Ably?', 'How to manage user status?'],
  shouldShowCopyChatButton: true,
});

interface SourceItem {
  id?: string;
  title: string | undefined;
  url: string;
  description: string | undefined;
  breadcrumbs: string[];
  type: string;
  contentType?: string;
  tag?: string;
  tabs?: string[];
}

interface ConversationEvent {
  eventName: string;
  properties: {
    conversation: {
      id: string;
      messages: { content: string }[];
    };
  };
}

const transformSource = (source: SourceItem) => {
  const { url, breadcrumbs } = source;
  if (!url) {
    return source;
  }
  try {
    const { pathname } = new URL(url);
    const urlPatterns = [
      { pattern: '/docs', tabName: 'Docs' },
      { pattern: '/blog', tabName: 'Blog' },
      { pattern: 'faqs.ably.com', tabName: 'FAQs' },
    ];

    const matchingPattern = urlPatterns.find(({ pattern }) => pathname.startsWith(pattern) || url.includes(pattern));

    if (matchingPattern) {
      const { tabName } = matchingPattern;
      return {
        ...source,
        tabs: [
          [
            tabName,
            {
              breadcrumbs: breadcrumbs[0] === tabName ? breadcrumbs.slice(1) : breadcrumbs,
            },
          ],
        ],
      };
    }
    return source;
  } catch (error) {
    return source;
  }
};

const prefilledSearchText = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  return new URLSearchParams(window.location.search).get('q') || '';
};

const searchSettings = {
  defaultQuery: prefilledSearchText(),
  placeholder: 'Search',
  tabs: ['All', 'Docs', 'Blog', 'FAQs', 'GitHub'],
};

export const inkeepOnLoad = (
  apiKey: string,
  conversationsUrl: string,
  inkeepChatEnabled: boolean,
  inkeepSearchEnabled: boolean,
) => {
  interface BaseSettings {
    apiKey: string;
    transformSource: (source: SourceItem) =>
      | SourceItem
      | {
          tabs: (string | { breadcrumbs: string[] })[][];
          id?: string;
          title: string | undefined;
          url: string;
          description: string | undefined;
          breadcrumbs: string[];
          type: string;
          contentType?: string;
          tag?: string;
        };
    theme: {
      styles: Array<{
        key: string;
        type: string;
        value: string;
      }>;
    };
    onEvent?: (event: ConversationEvent) => void;
  }

  const baseSettings: BaseSettings = {
    apiKey,
    transformSource,
    theme: {
      styles: [
        {
          key: 'custom-style',
          type: 'style',
          value: `
            .ikp-chat-button__container {
              z-index: 10;
            }

            .ikp-ai-chat-message-toolbar {
              flex-wrap: wrap;
              justify-content: flex-end;
            }

            .ikp-ai-chat-message-tool-actions {
              width: 100%;
            }

            .ikp-ai-chat-message-tool-action {
              background: #03020d;
              color: white;
              height: 36px;
              font-size: 15px;
              border: none;
              margin: 0px auto;
              margin-bottom: 8px;
              padding: 12px 24px;
              height: auto;
              gap: 12px;
            }

            .ikp-ai-chat-message-tool-action > .ikp-icon {
              font-size: 18px;
            }

            .ikp-ai-chat-message-tool-action:hover:not([disabled]) {
              background: #2c3344;
              color: white;
            }
          `,
        },
      ],
    },
  };

  const sendConversationData = (event: ConversationEvent, conversationsUrl: string): void => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    if (!csrfToken || !conversationsUrl) {
      return;
    }

    const payload = {
      conversation: {
        conversation_id: event.properties.conversation.id,
        message: event.properties.conversation.messages.at(-1)?.content,
      },
    };

    fetch(conversationsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify(payload),
    });
  };

  baseSettings.onEvent = (event: ConversationEvent) => {
    const { eventName, properties } = event;
    track(`inkeep_${eventName}`, properties);

    if (event.eventName === 'user_message_submitted') {
      sendConversationData(event as ConversationEvent, conversationsUrl);
    }
  };

  const config = {
    baseSettings,
    label: 'Ask Ably',
    aiChatSettings: aiChatSettings(),
    searchSettings,
    shouldShowAskAICard: false,
  };

  if (inkeepChatEnabled) {
    window.inkeepWidget = window.Inkeep.ChatButton({
      ...config,
    });
  }

  if (inkeepSearchEnabled) {
    loadInkeepSearch(config);
  }
};

const loadInkeepSearch = (config: object) => {
  const searchBar = document.getElementById('inkeep-search');
  if (!searchBar) {
    return;
  }

  window.Inkeep.SearchBar(`#${searchBar.id}`, {
    ...config,
    defaultView: 'chat',
    shouldShowAskAICard: false,
  }).remount();
};

export type InkeepUser = {
  id: string;
  email: string;
  companyName?: string;
};

export const inkeepChatIdentifyUser = ({ user }: { user?: InkeepUser }) => {
  const deviceId = (document?.querySelector('meta[name="device_id"]') as HTMLMetaElement)?.content;
  const userId = user?.id || deviceId;

  if (!(window.inkeepWidget && userId)) {
    return;
  }

  const userProperties: { id: string; email?: string; cohorts?: string[] } = {
    id: userId,
    email: user?.email,
  };
  if (user?.companyName) {
    userProperties.cohorts = [`Company: ${user?.companyName}`];
  }
  window.inkeepWidget.update({
    baseSettings: {
      userProperties,
    },
  });
};

export default inkeepChat;
