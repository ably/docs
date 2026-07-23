import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconGuiProdLiveobjectsSolid = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="currentColor" fillRule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5zm9.355 7.197a.75.75 0 0 0-1.238-.847l-3.905 5.707-2.248-2.248a.75.75 0 1 0-1.06 1.06l2.886 2.888a.75.75 0 0 0 1.15-.107z" clipRule="evenodd" /></svg>;
const ForwardRef = forwardRef(IconGuiProdLiveobjectsSolid);
export default ForwardRef;