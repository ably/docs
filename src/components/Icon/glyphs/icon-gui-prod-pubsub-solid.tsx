import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconGuiProdPubsubSolid = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="currentColor" fillRule="evenodd" d="M10.357 2.932c.766-1.232 2.667-.69 2.667.762v4.095h6.831a1.442 1.442 0 0 1 1.225 2.204L14.19 21.068c-.766 1.232-2.667.69-2.667-.761v-4.095h-6.83a1.442 1.442 0 0 1-1.225-2.204z" clipRule="evenodd" /></svg>;
const ForwardRef = forwardRef(IconGuiProdPubsubSolid);
export default ForwardRef;