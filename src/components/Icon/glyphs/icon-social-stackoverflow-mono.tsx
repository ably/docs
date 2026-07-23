import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconSocialStackoverflowMono = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="currentColor" fillRule="evenodd" d="M19.01 15.47h2.126V24H2v-8.53h2.126v6.397H19.01z" clipRule="evenodd" /><path fill="currentColor" d="m6.446 14.83 10.437 2.21.445-2.093-10.438-2.21zM7.818 9.83l9.665 4.517.908-1.939L8.727 7.89zm2.687-4.77 8.195 6.844 1.373-1.648-8.196-6.843zM15.8 0l-1.72 1.28 6.359 8.588 1.72-1.28zM6.252 19.735h10.631v-2.132H6.253z" /></svg>;
const ForwardRef = forwardRef(IconSocialStackoverflowMono);
export default ForwardRef;