import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconProductPlatformMono = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M5.358 8.125 1.874 10l3.483 1.875m0-3.75 4.642 2.5 4.643-2.5m-9.285 0L1.874 6.25 10 1.875l8.125 4.375-3.482 1.875m-9.285 3.75L1.874 13.75 10 18.125l8.125-4.375-3.482-1.875m-9.285 0 4.642 2.5 4.643-2.5m0-3.75L18.125 10l-3.482 1.875" /></svg>;
const ForwardRef = forwardRef(IconProductPlatformMono);
export default ForwardRef;