import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconGuiProdChatOutline = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path stroke="currentColor" strokeWidth={1.5} d="M7 3h10a3.333 3.333 0 0 1 3.333 3.333v12.402c0 .869-1.031 1.324-1.673.739l-3.802-3.467a.67.67 0 0 0-.45-.174H7A3.333 3.333 0 0 1 3.667 12.5V6.333A3.333 3.333 0 0 1 7 3Z" /></svg>;
const ForwardRef = forwardRef(IconGuiProdChatOutline);
export default ForwardRef;