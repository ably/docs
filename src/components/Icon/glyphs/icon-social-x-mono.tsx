import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconSocialXMono = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="currentColor" d="M17.729 2h3.257l-7.116 8.133L22.24 21.2h-6.554l-5.134-6.712L4.679 21.2h-3.26l7.612-8.699L1 2h6.721l4.64 6.135zm-1.143 17.25h1.804L6.74 3.847H4.804z" /></svg>;
const ForwardRef = forwardRef(IconSocialXMono);
export default ForwardRef;