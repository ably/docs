import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconProductAiTransportMono = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} fill="none" viewBox="0 0 128 128" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="M74 4a5 5 0 0 1 4.808 3.626l5.42 18.975a25 25 0 0 0 17.171 17.17l18.975 5.421a5 5 0 0 1 0 9.616l-18.975 5.42A25 25 0 0 0 84.229 81.4l-5.421 18.975a5 5 0 0 1-9.616 0l-5.42-18.975A25 25 0 0 0 46.6 64.229l-18.975-5.421a5 5 0 0 1 0-9.616l18.975-5.42A25 25 0 0 0 63.771 26.6l5.421-18.975A5 5 0 0 1 74 4" clipRule="evenodd" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m47 95-26 26M31 84 17 98" /></svg>;
const ForwardRef = forwardRef(IconProductAiTransportMono);
export default ForwardRef;