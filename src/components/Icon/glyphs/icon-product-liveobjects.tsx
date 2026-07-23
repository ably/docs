import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconProductLiveobjects = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} fill="none" viewBox="0 0 128 128" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<defs><linearGradient id="paint0_linear_3807_520" x1={64} x2={64} y1={27.103} y2={110.608} gradientUnits="userSpaceOnUse"><stop stopColor="#FF5416" /><stop offset={1} stopColor="#FF2739" /></linearGradient></defs><rect width={110} height={110} x={9} y={9} fill="url(#paint0_linear_3807_520)" rx={26} /><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="m43 66 17 17 26-38" /></svg>;
const ForwardRef = forwardRef(IconProductLiveobjects);
export default ForwardRef;