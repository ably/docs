import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconTechNodejs = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill="none" viewBox="0 0 48 48" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<defs><linearGradient id="paint0_linear_1031_1900" x1={24.084} x2={-23.516} y1={-23.765} y2={18.053} gradientUnits="userSpaceOnUse"><stop stopColor="#3E863D" /><stop offset={1} stopColor="#5AAD45" /></linearGradient><linearGradient id="paint1_linear_1031_1900" x1={18.428} x2={-6.405} y1={-5.756} y2={27.603} gradientUnits="userSpaceOnUse"><stop stopColor="#76AC64" /><stop offset={0.526} stopColor="#3E863D" /><stop offset={1} stopColor="#3E863D" /></linearGradient><linearGradient id="paint2_linear_1031_1900" x1={3.048} x2={45.13} y1={48.88} y2={48.88} gradientUnits="userSpaceOnUse"><stop stopColor="#6BBF46" /><stop offset={1} stopColor="#3E863D" /></linearGradient><clipPath id="clip0_1031_1900"><path fill="#fff" d="M0 0h48v48H0z" /></clipPath></defs><g fillRule="evenodd" clipPath="url(#clip0_1031_1900)" clipRule="evenodd"><path fill="url(#paint0_linear_1031_1900)" d="M22.944.539h.005L4.137 11.397A2.27 2.27 0 0 0 3 13.365v21.732a2.27 2.27 0 0 0 1.137 1.967L22.95 47.932c.703.405 1.57.405 2.273 0l18.81-10.868a2.28 2.28 0 0 0 1.135-1.967V13.365a2.27 2.27 0 0 0-1.139-1.968L25.222.54a2.29 2.29 0 0 0-2.278 0" /><path fill="url(#paint1_linear_1031_1900)" d="M3.466 36.477c.18.234.405.436.67.588l16.138 9.322 2.688 1.544a2.28 2.28 0 0 0 1.757.216L44.56 11.816a2.3 2.3 0 0 0-.529-.42L31.713 4.283 25.202.536a2.4 2.4 0 0 0-.59-.236z" /><path fill="url(#paint2_linear_1031_1900)" d="M23.87.248h-.012c-.315.031-.624.13-.908.29L4.19 11.367 24.42 48.21c.281-.04.558-.134.808-.278L44.04 37.064a2.28 2.28 0 0 0 1.09-1.51v-.056L24.517.285a2.4 2.4 0 0 0-.648-.037" /></g></svg>;
const ForwardRef = forwardRef(IconTechNodejs);
export default ForwardRef;