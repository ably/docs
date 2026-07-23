import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconTechSwift = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill="none" viewBox="0 0 48 48" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<defs><linearGradient id="paint0_linear_1031_1912" x1={2.813} x2={-6.259} y1={-6.259} y2={45.187} gradientUnits="userSpaceOnUse"><stop stopColor="#FAAE41" /><stop offset={1} stopColor="#EF3E31" /></linearGradient><linearGradient id="paint1_linear_1031_1912" x1={4.876} x2={-1.23} y1={-2.365} y2={35.34} gradientUnits="userSpaceOnUse"><stop stopColor="#E29F3A" /><stop offset={1} stopColor="#D43929" /></linearGradient><clipPath id="clip0_1031_1912"><path fill="#fff" d="M0 0h48v48H0z" /></clipPath></defs><g fillRule="evenodd" clipPath="url(#clip0_1031_1912)" clipRule="evenodd"><path fill="url(#paint0_linear_1031_1912)" d="M10.633 0C4.76 0 0 4.76 0 10.633v26.734C0 43.24 4.76 48 10.633 48h26.734C43.24 48 48 43.24 48 37.367V10.633C48 4.76 43.24 0 37.367 0z" /><path fill="url(#paint1_linear_1031_1912)" d="M10.624.038C4.756.038 0 4.795 0 10.662v12.092l4.925 5.301c.05.088 6.417 11.228 19.817 11.228 6.054 0 7.813-3.104 10.814-3.104 3.104 0 4.967 3.104 4.967 3.104 1.811-4.45-2.69-9.52-2.69-9.52s5.122-11.848-10.71-22.61l-.001-.001L20.107.038z" /><path fill="#FEFEFE" d="M27.16 7.155c15.833 10.763 10.71 22.612 10.71 22.612s4.502 5.07 2.691 9.52c0 0-1.863-3.105-4.967-3.105-3.001 0-4.76 3.105-10.814 3.105-13.453 0-19.817-11.228-19.817-11.228 12.113 7.982 20.386 2.328 20.386 2.328-5.465-3.174-17.075-18.316-17.075-18.316 10.12 8.608 14.488 10.865 14.488 10.865-2.615-2.152-9.935-12.676-9.935-12.676 5.857 5.926 17.49 14.177 17.49 14.177 3.317-9.12-3.157-17.282-3.157-17.282" /></g></svg>;
const ForwardRef = forwardRef(IconTechSwift);
export default ForwardRef;