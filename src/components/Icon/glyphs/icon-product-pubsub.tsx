import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconProductPubsub = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} fill="none" viewBox="0 0 128 128" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<defs><linearGradient id="paint0_linear_3807_142" x1={64} x2={64} y1={27.434} y2={110.189} gradientUnits="userSpaceOnUse"><stop stopColor="#FF5416" /><stop offset={1} stopColor="#FF2739" /></linearGradient></defs><path fill="url(#paint0_linear_3807_142)" fillRule="evenodd" d="M54.48 12.572c3.453-5.551 12.02-3.105 12.02 3.433V41.5h41.302c5.099 0 8.212 5.603 5.519 9.933L73.52 115.428c-3.453 5.551-12.02 3.105-12.02-3.433V86.5H20.198c-5.099 0-8.212-5.603-5.52-9.933z" clipRule="evenodd" /></svg>;
const ForwardRef = forwardRef(IconProductPubsub);
export default ForwardRef;