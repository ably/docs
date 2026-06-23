import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconGuiProdChatSolid = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="currentColor" fillRule="evenodd" d="M2.917 6.333A4.083 4.083 0 0 1 7 2.25h10a4.083 4.083 0 0 1 4.083 4.083v12.402c0 1.52-1.805 2.318-2.929 1.293l-3.778-3.445H7A4.083 4.083 0 0 1 2.917 12.5z" clipRule="evenodd" /></svg>;
const ForwardRef = forwardRef(IconGuiProdChatSolid);
export default ForwardRef;