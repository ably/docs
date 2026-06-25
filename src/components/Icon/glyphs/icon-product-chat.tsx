import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconProductChat = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} fill="none" viewBox="0 0 128 128" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<defs><linearGradient id="paint0_linear_3636_438" x1={64} x2={64} y1={29.85} y2={109.883} gradientUnits="userSpaceOnUse"><stop stopColor="#FF5416" /><stop offset={1} stopColor="#FF2739" /></linearGradient></defs><path fill="url(#paint0_linear_3636_438)" fillRule="evenodd" d="M11.5 35c0-12.426 10.074-22.5 22.5-22.5h60c12.426 0 22.5 10.074 22.5 22.5v74.41c0 7.385-8.77 11.257-14.227 6.281l-22.812-20.8a1.5 1.5 0 0 0-1.01-.391H34c-12.426 0-22.5-10.074-22.5-22.5z" clipRule="evenodd" /></svg>;
const ForwardRef = forwardRef(IconProductChat);
export default ForwardRef;