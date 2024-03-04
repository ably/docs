import { safeWindow } from 'src/utilities';

// Event identifiers used in triggers in Google Tag Manager.
// Changing these requires an update in GTM.
// See also frontend/util/analytics/gtm.js in the website repository.
// Docs-specific.
const DOCS_GTM_COPY_CODE_BLOCK_CONTENT = 'docs-copy-code-block-content';
const DOCS_GTM_SUPPORT_FOOTER_CLICK = 'docs-support-footer-click';
const DOCS_GTM_CONTACT_US_FOOTER_CLICK = 'docs-contact-us-footer-click';

const push = (data: Record<string, string | number>) => {
  safeWindow.dataLayer = safeWindow.dataLayer || [];
  safeWindow.dataLayer.push(data);
};

export const copyCodeBlockContentTracker = ({ copyCodeBlockContent }: { copyCodeBlockContent: string }) => {
  push({ event: DOCS_GTM_COPY_CODE_BLOCK_CONTENT, copyCodeBlockContent });
};

export const supportClickTracker = () => push({ event: DOCS_GTM_SUPPORT_FOOTER_CLICK });

export const contactUsClickTracker = () => push({ event: DOCS_GTM_CONTACT_US_FOOTER_CLICK });
