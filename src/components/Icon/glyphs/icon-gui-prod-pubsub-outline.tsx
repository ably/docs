import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconGuiProdPubsubOutline = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path stroke="currentColor" strokeWidth={1.5} d="M10.994 3.328 4.106 14.404a.692.692 0 0 0 .587 1.057h7.235c.191 0 .346.155.346.347v4.499c0 .696.913.956 1.28.365l6.889-11.076a.692.692 0 0 0-.588-1.057H12.62a.346.346 0 0 1-.346-.347V3.694c0-.697-.912-.957-1.28-.366Z" /></svg>;
const ForwardRef = forwardRef(IconGuiProdPubsubOutline);
export default ForwardRef;