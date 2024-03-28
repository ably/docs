import { scriptLoader } from './utils';

const oneTrustScript = (oneTrustDomain, oneTrustTest) => {
  if (!oneTrustDomain) {
    return;
  }

  let domainId = oneTrustDomain;

  if (oneTrustTest === 'true') {
    domainId = `${domainId}-test`;
  }

  scriptLoader(document, 'https://cdn-ukwest.onetrust.com/scripttemplates/otSDKStub.js', {
    async: false,
    defer: false,
    charset: 'UTF-8',
    data: {
      domainScript: domainId,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.OptanonWrapper = () => {};
};

export default oneTrustScript;
