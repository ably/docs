import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconTechNextjs = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill="none" viewBox="0 0 48 48" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<defs><linearGradient id="paint0_linear_2276_25" x1={29.067} x2={38.533} y1={31.067} y2={42.8} gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset={1} stopColor="#fff" stopOpacity={0} /></linearGradient><linearGradient id="paint1_linear_2276_25" x1={32.267} x2={32.213} y1={14.4} y2={28.5} gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset={1} stopColor="#fff" stopOpacity={0} /></linearGradient><clipPath id="clip0_2276_25"><path fill="#fff" d="M0 0h48v48H0z" /></clipPath><clipPath id="clip1_2276_25"><path fill="#fff" d="M0 0h48v48H0z" /></clipPath></defs><g clipPath="url(#clip0_2276_25)"><g clipPath="url(#clip1_2276_25)"><mask id="mask0_2276_25" width={48} height={48} x={0} y={0} maskUnits="userSpaceOnUse" style={{
        maskType: "alpha"
      }}><path fill="#000" d="M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24s10.745 24 24 24" /></mask><g mask="url(#mask0_2276_25)"><path fill="#000" d="M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24s10.745 24 24 24" /><path fill="url(#paint0_linear_2276_25)" d="M39.869 42.005 18.438 14.4H14.4v19.192h3.23v-15.09L37.333 43.96a24 24 0 0 0 2.536-1.954" /><path fill="url(#paint1_linear_2276_25)" d="M33.867 14.4h-3.2v19.2h3.2z" /></g></g></g></svg>;
const ForwardRef = forwardRef(IconTechNextjs);
export default ForwardRef;