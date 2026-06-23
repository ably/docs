import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconSocialGithubMono = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="currentColor" fillRule="evenodd" d="M12 0C5.4 0 0 5.42 0 12.043c0 5.32 3.4 9.836 8.2 11.441.6.1.8-.3.8-.602v-2.007c-3.3.702-4-1.606-4-1.606-.5-1.405-1.3-1.806-1.3-1.806-1.1-.703.1-.703.1-.703 1.2.1 1.8 1.204 1.8 1.204 1.1 1.807 2.8 1.305 3.5 1.004.1-.803.4-1.305.8-1.606-2.8-.3-5.6-1.304-5.6-5.92 0-1.306.5-2.41 1.2-3.212 0-.402-.5-1.606.2-3.212 0 0 1-.301 3.3 1.204 1-.3 2-.401 3-.401s2 .1 3 .401c2.3-1.505 3.3-1.204 3.3-1.204.7 1.706.2 2.91.1 3.212.8.802 1.2 1.906 1.2 3.211 0 4.617-2.8 5.62-5.5 5.921.4.402.8 1.104.8 2.208v3.312c0 .301.2.703.8.602 4.9-1.606 8.3-6.122 8.3-11.44C24 5.418 18.6 0 12 0" clipRule="evenodd" /></svg>;
const ForwardRef = forwardRef(IconSocialGithubMono);
export default ForwardRef;