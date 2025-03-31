import { scriptLoader } from './utils';

const inkeepChat = (apiKey: string) => {
  if (!apiKey) {
    return;
  }

  scriptLoader(document, 'https://unpkg.com/@inkeep/cxkit-js@0.5.36/dist/embed.js', {
    defer: true,
    async: false,
    type: 'module',
    crossOrigin: 'anonymous',
    onload: () => {
      inkeepOnLoad(apiKey);
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

const aiChatSettings = {
  organizationDisplayName: 'Ably',
  aiAssistantAvatar: 'https://storage.googleapis.com/organization-image-assets/ably-botAvatarSrcUrl-1721406747144.png',
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
};

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
  };

  const config = {
    baseSettings,
    label: 'Ask Ably',
    aiChatSettings,
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
  if (!(window.inkeepWidget && user)) {
    return;
  }

  window.inkeepWidget.update({
    baseSettings: {
      userProperties: {
        id: user.uuid,
      },
    },
  });
};

export default inkeepChat;
