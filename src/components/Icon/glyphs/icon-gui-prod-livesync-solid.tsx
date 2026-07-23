import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconGuiProdLivesyncSolid = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="currentColor" fillRule="evenodd" d="M20 14.561a.75.75 0 0 1-.75-.75v-3.773a5.29 5.29 0 0 0-5.288-5.288H12.75v5.134a.9.9 0 0 1-1.446.718L3.753 4.868c-.688-.522-.319-1.618.544-1.618h9.665a6.79 6.79 0 0 1 6.788 6.788v3.773a.75.75 0 0 1-.75.75M4 9.438a.75.75 0 0 1 .75.75v3.774a5.29 5.29 0 0 0 5.288 5.288h1.212v-5.134a.901.901 0 0 1 1.446-.718l7.551 5.733c.688.523.319 1.619-.544 1.619h-9.665a6.79 6.79 0 0 1-6.788-6.788v-3.774a.75.75 0 0 1 .75-.75" clipRule="evenodd" /></svg>;
const ForwardRef = forwardRef(IconGuiProdLivesyncSolid);
export default ForwardRef;