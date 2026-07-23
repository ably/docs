import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconProductSpacesMono = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} fill="none" viewBox="0 0 128 128" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path stroke="currentColor" strokeWidth={6} d="m41.23 109.769-23.404-84.56c-1.244-4.494 2.889-8.627 7.383-7.383l84.56 23.405c5.545 1.535 5.96 9.239.611 11.36L72.213 67.726a8 8 0 0 0-4.487 4.487L52.59 110.38c-2.121 5.349-9.825 4.934-11.36-.611Z" /></svg>;
const ForwardRef = forwardRef(IconProductSpacesMono);
export default ForwardRef;