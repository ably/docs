import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconGuiProdLiveobjectsOutline = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path stroke="currentColor" strokeLinecap="round" strokeWidth={1.5} d="M14.038 3h2.886A4.076 4.076 0 0 1 21 7.075v2.887M9.962 3H7.075A4.075 4.075 0 0 0 3 7.075v2.887m0 4.076v2.886A4.076 4.076 0 0 0 7.075 21h2.887M21 14.038v2.886A4.076 4.076 0 0 1 16.924 21h-2.886" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m8.434 12.34 2.887 2.887 4.415-6.453" /></svg>;
const ForwardRef = forwardRef(IconGuiProdLiveobjectsOutline);
export default ForwardRef;