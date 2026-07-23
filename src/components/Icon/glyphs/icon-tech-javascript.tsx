import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconTechJavascript = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill="none" viewBox="0 0 48 48" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<defs><clipPath id="clip0_1031_1922"><path fill="#fff" d="M0 0h48v48H0z" /></clipPath></defs><g clipPath="url(#clip0_1031_1922)"><path fill="#F7DF1E" d="M46 0H2a2 2 0 0 0-2 2v44a2 2 0 0 0 2 2h44a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2" /><path fill="#000" d="M32.244 37.5c.967 1.579 2.225 2.74 4.45 2.74 1.868 0 3.062-.935 3.062-2.225 0-1.547-1.227-2.095-3.284-2.995l-1.127-.484c-3.255-1.386-5.417-3.123-5.417-6.796 0-3.382 2.577-5.958 6.605-5.958 2.868 0 4.93.998 6.416 3.612l-3.513 2.255c-.773-1.387-1.607-1.933-2.903-1.933-1.32 0-2.158.838-2.158 1.933 0 1.353.838 1.9 2.773 2.739l1.128.483c3.832 1.643 5.996 3.319 5.996 7.086 0 4.06-3.19 6.285-7.474 6.285-4.19 0-6.896-1.996-8.22-4.612zm-15.934.391c.709 1.257 1.353 2.32 2.903 2.32 1.482 0 2.417-.58 2.417-2.834V22.04h4.51v15.398c0 4.67-2.738 6.796-6.735 6.796-3.612 0-5.703-1.869-6.767-4.12z" /></g></svg>;
const ForwardRef = forwardRef(IconTechJavascript);
export default ForwardRef;