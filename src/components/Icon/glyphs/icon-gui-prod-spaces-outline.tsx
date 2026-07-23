import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconGuiProdSpacesOutline = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path stroke="currentColor" strokeWidth={1.5} d="M8.262 19.89 4.292 5.543a1.018 1.018 0 0 1 1.252-1.252l14.345 3.97c.941.26 1.011 1.568.104 1.928l-6.475 2.567a1.36 1.36 0 0 0-.761.761l-2.567 6.475c-.36.907-1.667.837-1.928-.104Z" /></svg>;
const ForwardRef = forwardRef(IconGuiProdSpacesOutline);
export default ForwardRef;