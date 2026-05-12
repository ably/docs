import { useStore } from '@nanostores/react';
import type { ReactNode } from 'react';
import UserContext from 'src/contexts/user-context';
import { LayoutProvider } from 'src/contexts/layout-context';
import Header from 'src/components/Layout/Header';
import Footer from 'src/components/Layout/Footer';
import LeftSidebar from 'src/components/Layout/LeftSidebar';
import RightSidebar from 'src/components/Layout/RightSidebar';
import Breadcrumbs from 'src/components/Layout/Breadcrumbs';
import { PageHeader } from 'src/components/Layout/mdx/PageHeader';
import { $session } from '../../stores/session';
import { $apiKeys } from '../../stores/apiKeys';

const UserContextBridge = ({ children }: { children: ReactNode }) => {
  const session = useStore($session);
  const keys = useStore($apiKeys);
  const value = {
    sessionState: session,
    apps: keys.length
      ? [
          {
            id: 'demo',
            name: 'Demo',
            url: '#',
            apiKeys: keys.map((k) => ({ name: k.name, key: k.url, demo: true })),
            demo: true,
          },
        ]
      : [],
  };
  return <UserContext.Provider value={value as never}>{children}</UserContext.Provider>;
};

interface BridgeProps {
  children: ReactNode;
  title?: string;
  slug?: string;
  languages?: string[];
}

// Full bridge: UserContext (session/keys from nanostores) + LayoutContext
// (activePage computed from URL by LayoutProvider). Every chrome island that
// reads useLayoutContext() or UserContext must render inside this.
const Bridge = ({ children, title = '', slug = '', languages = [] }: BridgeProps) => {
  const pageContext = {
    frontmatter: { title, languages },
    slug,
    link: slug ? `/docs/${slug}` : '/docs',
    languages,
  } as never;
  return (
    <UserContextBridge>
      <LayoutProvider pageContext={pageContext}>{children}</LayoutProvider>
    </UserContextBridge>
  );
};

interface ChromeProps {
  title?: string;
  slug?: string;
  languages?: string[];
}

export const ChromeHeader = (props: ChromeProps) => (
  <Bridge {...props}>
    <Header />
  </Bridge>
);

export const ChromeFooter = (props: ChromeProps) => {
  const pageContext = {
    frontmatter: { title: props.title ?? '' },
    slug: props.slug ?? '',
    link: props.slug ? `/docs/${props.slug}` : '/docs',
  } as never;
  return (
    <Bridge {...props}>
      <Footer pageContext={pageContext} />
    </Bridge>
  );
};

export const ChromeLeftSidebar = (props: ChromeProps) => (
  <Bridge {...props}>
    <LeftSidebar />
  </Bridge>
);

export const ChromeRightSidebar = (props: ChromeProps) => (
  <Bridge {...props}>
    <RightSidebar />
  </Bridge>
);

interface PageHeaderProps extends ChromeProps {
  intro?: string;
}

export const ChromePageHeader = ({ intro = '', ...props }: PageHeaderProps) => (
  <Bridge {...props}>
    <>
      <Breadcrumbs />
      <PageHeader title={props.title ?? ''} intro={intro} />
    </>
  </Bridge>
);

export default {
  ChromeHeader,
  ChromeFooter,
  ChromeLeftSidebar,
  ChromeRightSidebar,
  ChromePageHeader,
};
