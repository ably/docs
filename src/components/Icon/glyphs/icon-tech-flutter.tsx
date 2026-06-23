import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconTechFlutter = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill="none" viewBox="0 0 48 48" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<defs><linearGradient id="paint0_linear_1031_1893" x1={25.645} x2={26.676} y1={39.281} y2={40.312} gradientUnits="userSpaceOnUse"><stop offset={0.2} stopOpacity={0.15} /><stop offset={0.85} stopColor="#616161" stopOpacity={0.01} /></linearGradient><linearGradient id="paint1_linear_1031_1893" x1={22.466} x2={33.433} y1={42.463} y2={42.463} gradientUnits="userSpaceOnUse"><stop offset={0.2} stopOpacity={0.55} /><stop offset={0.85} stopColor="#616161" stopOpacity={0.01} /></linearGradient><clipPath id="clip0_1031_1893"><path fill="#fff" d="M0 0h48v48H0z" /></clipPath></defs><g clipPath="url(#clip0_1031_1893)"><path fill="#0D47A1" d="M22.463 42.463 28 48h14.781L29.855 35.074" /><path fill="#42A5F5" fillOpacity={0.8} fillRule="evenodd" d="m4 23.998 7.392 7.392L42.78 0H28zm24-1.853h14.781L29.855 35.073l-7.392-7.391z" clipRule="evenodd" /><path fill="#42A5F5" d="m15.09 35.077 7.38-7.382 7.379 7.38-7.38 7.382z" /><path fill="url(#paint0_linear_1031_1893)" d="m22.47 42.458 7.379-7.38 1.03 1.03-7.38 7.38z" /><path fill="url(#paint1_linear_1031_1893)" d="m22.463 42.463 10.967-3.789-3.575-3.602" /></g></svg>;
const ForwardRef = forwardRef(IconTechFlutter);
export default ForwardRef;