import type { Metadata, Viewport } from 'next';
import { siteConfig, externalScriptsData } from '@/lib/site-config';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: '%s | Ably Docs',
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.siteUrl),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: 'Ably Documentation',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Manrope:wght@200..800&family=Source+Code+Pro:wght@600&family=IBM+Plex+Serif:ital,wght@1,400;1,700&display=swap"
          rel="stylesheet"
        />

        {/* OneTrust consent management */}
        {externalScriptsData.oneTrustEnabled === 'true' && externalScriptsData.oneTrustDomain && (
          <>
            <script
              async
              src="https://cdn-ukwest.onetrust.com/scripttemplates/otSDKStub.js"
              data-domain-script={
                externalScriptsData.oneTrustTest === 'true'
                  ? `${externalScriptsData.oneTrustDomain}-test`
                  : externalScriptsData.oneTrustDomain
              }
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.OptanonWrapper = function(){};`,
              }}
            />
          </>
        )}

        {/* Google Tag Manager */}
        {externalScriptsData.gtmContainerId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${externalScriptsData.gtmContainerId}');
              `,
            }}
          />
        )}
      </head>
      <body className="bg-neutral-000 dark:bg-neutral-1300 text-neutral-1300 dark:text-neutral-000">
        {/* Google Tag Manager (noscript) */}
        {externalScriptsData.gtmContainerId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${externalScriptsData.gtmContainerId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
