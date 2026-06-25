import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconProductPlatform = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="#ff5416" d="M9.703 1.325a.63.63 0 0 1 .594 0L18.422 5.7a.624.624 0 0 1 0 1.1l-8.126 4.375a.63.63 0 0 1-.593 0L1.578 6.8a.625.625 0 0 1 0-1.1z" /><path fill="#ff5416" d="m2.72 8.835 6.39 3.44a1.88 1.88 0 0 0 1.78 0l6.39-3.44 1.14.615a.625.625 0 0 1 0 1.1l-8.124 4.375a.63.63 0 0 1-.592 0L1.58 10.55a.626.626 0 0 1 0-1.1z" /><path fill="#ff5416" d="m9.11 16.026-6.39-3.442-1.14.616a.625.625 0 0 0 0 1.1l8.124 4.375c.184.1.408.1.592 0L18.42 14.3a.626.626 0 0 0 0-1.1l-1.142-.615-6.39 3.442a1.88 1.88 0 0 1-1.778-.001" /></svg>;
const ForwardRef = forwardRef(IconProductPlatform);
export default ForwardRef;