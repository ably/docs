import { scriptLoader } from './utils';
import posthog from 'posthog-js';

const inkeepChat = (apiKey: string) => {
  if (!apiKey) {
    return;
  }

  scriptLoader(document, 'https://unpkg.com/@inkeep/cxkit-js@0.5.40/dist/embed.js', {
    defer: true,
    async: false,
    type: 'module',
    crossOrigin: 'anonymous',
    onload: () => {
      posthog.onFeatureFlags(() => {
        inkeepOnLoad(apiKey);
      });
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
      on: (event: string, callback: () => void) => void;
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

const openHubSpotConversations = () => {
  window.HubSpotConversations?.widget.load();
  window.HubSpotConversations?.widget.open();

  window.HubSpotConversations.on('widgetClosed', () => {
    window.HubSpotConversations?.widget.remove();
    window.HubSpotConversations.off('widgetClosed', null);
  });
};

const getTools = () => [
  {
    type: 'function',
    function: {
      name: 'contactSales',
      description:
        "Detect if there is buyer intent or the customer is asking about pricing information or Ably's paid plans.",
      parameters: {
        type: 'object',
        properties: {
          aiAnnotations: {
            type: 'object',
            properties: {
              answerConfidence: {
                anyOf: [
                  { type: 'string', const: 'very_confident' },
                  { type: 'string', const: 'somewhat_confident' },
                  { type: 'string', const: 'not_confident' },
                  { type: 'string', const: 'no_sources' },
                ],
              },
            },
            required: ['answerConfidence'],
          },
        },
        required: ['aiAnnotations'],
      },
    },
    renderMessageButtons: ({ args }: { args: { aiAnnotations: { answerConfidence: string } } }) => {
      const confidence = args.aiAnnotations.answerConfidence;
      if (confidence === 'very_confident' || confidence === 'somewhat_confident') {
        return [
          {
            label: 'Talk to Sales',
            icon: { builtIn: 'LuUsers' },
            action: {
              type: 'invoke_callback',
              callback: () => {
                window.history.pushState({}, '', '?chat-type=product');
                openHubSpotConversations();
              },
              shouldCloseModal: true,
            },
          },
        ];
      }
      return [];
    },
  },
];

const aiChatSettings = () => ({
  organizationDisplayName: 'Ably',
  aiAssistantAvatar:
    'https://storage.googleapis.com/organization-image-assets/ably-botAvatarDarkSrcUrl-1744125448083.png',
  getHelpOptions: [
    {
      name: 'Request a meeting',
      action: {
        type: 'open_link',
        url: 'https://meetings.hubspot.com/cameron-michie/ably-demo',
      },
      isPinnedToToolbar: true,
    },
    {
      name: 'Chat with support',
      action: {
        type: 'invoke_callback',
        callback: () => {
          openHubSpotConversations();
        },
        shouldCloseModal: true,
      },
      isPinnedToToolbar: true,
    },
  ],
  exampleQuestions: ['What is a channel?', 'How do I authenticate with Ably?', 'How to manage user status?'],
  shouldShowCopyChatButton: true,
  ...(posthog.isFeatureEnabled('inkeep-intent') ? { getTools } : {}),
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

export const inkeepOnLoad = (apiKey: string) => {
  const baseSettings = {
    apiKey,
    transformSource,
    theme: {
      styles: [
        {
          key: 'custom-style',
          type: 'style',
          value: `css
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

  const config = {
    baseSettings,
    label: 'Ask Ably',
    aiChatSettings: aiChatSettings(),
    searchSettings,
  };

  window.inkeepWidget = window.Inkeep.ChatButton({
    ...config,
  });

  loadInkeepSearch(config);
};

const loadInkeepSearch = (config: object) => {
  const searchBar = document.getElementById('inkeep-search');
  if (!searchBar) {
    return;
  }

  window.Inkeep.SearchBar(`#${searchBar.id}`, {
    ...config,
    modalSettings: {
      defaultView: 'SEARCH',
    },
  }).remount();
};

export type InkeepUser = {
  uuid: string;
};

export const inkeepChatIdentifyUser = ({ user }: { user?: InkeepUser }) => {
  const deviceId = (document?.querySelector('meta[name="device_id"]') as HTMLMetaElement)?.content;
  const userId = user?.uuid || deviceId;

  if (!(window.inkeepWidget && userId)) {
    return;
  }

  window.inkeepWidget.update({
    baseSettings: {
      userProperties: {
        id: userId,
      },
    },
  });
};

export default inkeepChat;
