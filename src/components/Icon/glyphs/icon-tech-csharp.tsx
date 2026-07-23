import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconTechCsharp = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill="none" viewBox="0 0 48 48" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<defs><clipPath id="clip0_1031_1911"><path fill="#fff" d="M0 0h48v48H0z" /></clipPath></defs><g clipPath="url(#clip0_1031_1911)"><path fill="#9A4993" d="M45.68 14.1c0-.801-.172-1.524-.526-2.13q-.513-.906-1.539-1.498C37.935 7.198 32.242 3.924 26.562.65c-1.539-.88-3.011-.855-4.536.04C19.764 2.017 8.43 8.512 5.064 10.471 3.671 11.274 3 12.51 3 14.114v19.775c0 .789.17 1.486.5 2.09.342.619.867 1.145 1.564 1.552 3.38 1.96 14.7 8.441 16.962 9.782 1.525.894 3.01.934 4.536.04 5.68-3.287 11.373-6.548 17.053-9.822.71-.407 1.223-.92 1.565-1.551.328-.605.5-1.302.5-2.091z" /><path fill="#6A1577" d="M24.393 23.922 3.473 35.966c.343.618.868 1.144 1.565 1.552 3.38 1.959 14.7 8.44 16.962 9.782 1.525.894 3.01.934 4.536.04 5.68-3.288 11.373-6.548 17.053-9.822.71-.408 1.223-.92 1.565-1.552z" /><path fill="#6A1577" d="M18.2 27.486a7.06 7.06 0 0 0 6.126 3.563 7.04 7.04 0 0 0 6.154-3.603l-6.088-3.524z" /><path fill="#813084" d="M45.68 14.1c0-.801-.172-1.524-.527-2.13l-20.76 11.952L45.18 35.967c.328-.604.5-1.301.5-2.09z" /><path fill="#fff" fillRule="evenodd" d="M30.48 27.446a7.07 7.07 0 0 1-6.153 3.603 7.03 7.03 0 0 1-6.127-3.563 7.054 7.054 0 0 1 12.228-7.034l6.166-3.55c-2.459-4.234-7.034-7.088-12.28-7.088-7.837 0-14.174 6.351-14.174 14.174 0 2.564.683 4.984 1.88 7.061a14.2 14.2 0 0 0 12.307 7.113c5.272 0 9.874-2.88 12.32-7.152zm7.797-6.811H36.87v6.797h1.407zm1.71 0h1.406v6.797h-1.407z" clipRule="evenodd" /><path fill="#fff" fillRule="evenodd" d="M35.74 21.779h6.797v1.407h-6.798zm0 3.103h6.797v1.407h-6.798z" clipRule="evenodd" /></g></svg>;
const ForwardRef = forwardRef(IconTechCsharp);
export default ForwardRef;