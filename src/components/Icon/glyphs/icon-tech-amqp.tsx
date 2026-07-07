import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconTechAmqp = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill="none" viewBox="0 0 48 48" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<text x={24} y={25} fill="currentColor" fontFamily="inherit" fontSize={15} fontWeight={700} letterSpacing={-0.5} textAnchor="middle" dominantBaseline="central">AMQP</text></svg>;
const ForwardRef = forwardRef(IconTechAmqp);
export default ForwardRef;
