import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconGuiProdAiTransportOutline = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.307} d="M11.498 1.016c.334 0 .628.221.72.543l.811 2.841A3.74 3.74 0 0 0 15.6 6.971l2.841.812a.749.749 0 0 1 0 1.44l-2.84.811a3.74 3.74 0 0 0-2.572 2.572l-.812 2.84a.749.749 0 0 1-1.44 0l-.811-2.84a3.74 3.74 0 0 0-2.571-2.572l-2.841-.811a.749.749 0 0 1 0-1.44l2.84-.812a3.74 3.74 0 0 0 2.572-2.57l.812-2.842a.75.75 0 0 1 .72-.543" clipRule="evenodd" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.307} d="M7.455 14.642 3.56 18.536M5.059 12.995l-2.097 2.097" /></svg>;
const ForwardRef = forwardRef(IconGuiProdAiTransportOutline);
export default ForwardRef;