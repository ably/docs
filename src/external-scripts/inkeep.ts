import { scriptLoader } from './utils';

const inkeepChat = (apiKey, integrationId, organizationId) => {
  if (!(apiKey && integrationId && organizationId)) {
    return;
  }

  scriptLoader(document, 'https://unpkg.com/@inkeep/uikit-js@0.3.8/dist/embed.js', {
    defer: true,
    async: false,
    type: 'module',
    onload: () => {
      inkeepOnLoad(apiKey, integrationId, organizationId);
    },
  });
};

const openHubSpotConversations = () => {
  window.HubSpotConversations?.widget.load();
  window.HubSpotConversations?.widget.open();

  window.HubSpotConversations.on('widgetClosed', () => {
    window.HubSpotConversations?.widget.remove();
    window.HubSpotConversations.off('widgetClosed', null);
  });
};

const aiChatSettings = {
  aiChatSettings: {
    actionButtonLabels: {
      getHelpButtonLabel: 'More Help',
    },
    chatSubjectName: 'Ably',
    botAvatarSrcUrl: 'https://storage.googleapis.com/organization-image-assets/ably-botAvatarSrcUrl-1721406747144.png',
    getHelpCallToActions: [
      {
        name: 'Chat with support',
        url: 'https://ably.com/support',
        icon: {
          builtIn: 'IoHelpBuoyOutline',
        },
        type: 'INVOKE_CALLBACK',
        callback: () => {
          openHubSpotConversations();
        },
        shouldCloseModal: true,
      },
    ],
    quickQuestions: [
      'How do I get presence data for a specific member?',
      "What's the difference between detach and unsubscribe?",
      "Can I limit users' access to message interactions?",
    ],
  },
};

export const inkeepOnLoad = (apiKey, integrationId, organizationId) => {
  window.inkeepBase = Inkeep({
    apiKey,
    integrationId,
    organizationId,
    theme: {
      components: {
        SearchBarTrigger: {
          defaultProps: {
            size: 'expand',
            variant: 'emphasize',
          },
        },
      },
    },
  });

  window.inkeepWidget = inkeepBase.embed({
    componentType: 'ChatButton',
    properties: {
      chatButtonType: 'PILL',
      chatButtonText: 'Ask Ably',
      ...aiChatSettings,
    },
  });

  loadInkeepSearch();
};

const loadInkeepSearch = () => {
  const searchBar = document.getElementById('inkeep-search');
  if (!searchBar) {
    return;
  }
  window.inkeepBase.embed({
    componentType: 'SearchBar',
    targetElement: searchBar,
    properties: {
      searchSettings: {
        placeholder: 'Search',
      },
      ...aiChatSettings,
    },
  });
};

type InkeepUser = {
  uuid: string;
};

export const inkeepChatIdentifyUser = ({ user }: { user?: InkeepUser }) => {
  if (!(window.inkeepWidget && user)) {
    return;
  }

  window.inkeepWidget.render({
    baseSettings: {
      userId: user.uuid,
    },
  });
};

export default inkeepChat;