import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconGuiProdLivesyncOutline = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path stroke="currentColor" strokeLinecap="round" strokeWidth={1.5} d="M19.703 20H12v-5.884c0-.125.143-.196.242-.12l7.552 5.733a.151.151 0 0 1-.091.271ZM4 10.189v3.773A6.04 6.04 0 0 0 10.038 20H12M4.297 4H12v5.884a.151.151 0 0 1-.242.12L4.206 4.272A.15.15 0 0 1 4.297 4ZM20 13.812v-3.774A6.04 6.04 0 0 0 13.962 4H12" /></svg>;
const ForwardRef = forwardRef(IconGuiProdLivesyncOutline);
export default ForwardRef;