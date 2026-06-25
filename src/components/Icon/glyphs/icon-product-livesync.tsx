import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconProductLivesync = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} fill="none" viewBox="0 0 128 128" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<defs><linearGradient id="paint0_linear_3807_387" x1={64} x2={64} y1={101.232} y2={16.969} gradientUnits="userSpaceOnUse"><stop stopColor="#FF5416" /><stop offset={1} stopColor="#FF2739" /></linearGradient></defs><path fill="url(#paint0_linear_3807_387)" fillRule="evenodd" d="M13.5 52a2.5 2.5 0 0 0-5 0v25c0 23.472 19.028 42.5 42.5 42.5h64.029c3.353 0 4.787-4.26 2.117-6.288l-50.03-37.985c-2.304-1.75-5.616-.106-5.616 2.788V114.5H51c-20.71 0-37.5-16.79-37.5-37.5zm53-2.015c0 2.894-3.312 4.538-5.617 2.788L10.854 14.788C8.184 12.76 9.618 8.5 12.971 8.5H77c23.472 0 42.5 19.028 42.5 42.5v25a2.5 2.5 0 1 1-5 0V51c0-20.71-16.79-37.5-37.5-37.5H66.5z" clipRule="evenodd" /></svg>;
const ForwardRef = forwardRef(IconProductLivesync);
export default ForwardRef;