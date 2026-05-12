// The Gatsby build resolves `import Logo from '...ably-logo.svg'` to a URL
// string. Astro's asset handler returns an { src, width, height } object
// instead. We intercept the logo import and re-export the `?url` variant
// so Header.tsx renders `<img src={Logo}>` correctly without modification.
import url from '@ably/ui/core/images/logo/ably-logo.svg?url';
export default url;
