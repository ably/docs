import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconProductSpaces = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} fill="none" viewBox="0 0 128 128" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<defs><linearGradient id="paint0_linear_3807_221" x1={65.785} x2={65.785} y1={31.716} y2={108.821} gradientUnits="userSpaceOnUse"><stop stopColor="#FF5416" /><stop offset={1} stopColor="#FF2739" /></linearGradient></defs><path fill="url(#paint0_linear_3807_221)" d="M15.318 25.777c-1.762-6.366 4.093-12.221 10.46-10.46l84.559 23.406c7.856 2.174 8.443 13.088.866 16.093L73.036 69.951a5.5 5.5 0 0 0-3.085 3.085l-15.135 38.167c-3.005 7.577-13.919 6.99-16.093-.866z" /></svg>;
const ForwardRef = forwardRef(IconProductSpaces);
export default ForwardRef;