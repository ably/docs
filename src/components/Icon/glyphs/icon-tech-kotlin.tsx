import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconTechKotlin = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill="none" viewBox="0 0 48 48" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<defs><linearGradient id="paint0_linear_1031_1914" x1={14.252} x2={58.919} y1={66.464} y2={21.797} gradientUnits="userSpaceOnUse"><stop offset={0.108} stopColor="#C757BC" /><stop offset={0.173} stopColor="#CD5CA9" /><stop offset={0.492} stopColor="#E8744F" /><stop offset={0.716} stopColor="#F88316" /><stop offset={0.823} stopColor="#FF8900" /></linearGradient><linearGradient id="paint1_linear_1031_1914" x1={36.994} x2={43.459} y1={62.127} y2={36.495} gradientUnits="userSpaceOnUse"><stop offset={0.296} stopColor="#00AFFF" /><stop offset={0.694} stopColor="#5282FF" /><stop offset={1} stopColor="#945DFF" /></linearGradient><linearGradient id="paint2_linear_1031_1914" x1={6.685} x2={22.686} y1={21.279} y2={6.811} gradientUnits="userSpaceOnUse"><stop offset={0.296} stopColor="#00AFFF" /><stop offset={0.694} stopColor="#5282FF" /><stop offset={1} stopColor="#945DFF" /></linearGradient><clipPath id="clip0_1031_1914"><path fill="#fff" d="M0 0h48v48H0z" /></clipPath></defs><g clipPath="url(#clip0_1031_1914)"><path fill="url(#paint0_linear_1031_1914)" d="M24.1 0 0 25.344V48l24.065-24.107L48 0z" /><path fill="url(#paint1_linear_1031_1914)" d="m0 48 24.065-24.107L48 48z" /><path fill="url(#paint2_linear_1031_1914)" d="M0 0h24.1L0 25.344z" /></g></svg>;
const ForwardRef = forwardRef(IconTechKotlin);
export default ForwardRef;