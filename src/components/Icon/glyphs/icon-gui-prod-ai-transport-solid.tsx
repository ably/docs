import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconGuiProdAiTransportSolid = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="#FF5416" d="M19.638 8.502c0 .626-.415 1.177-1.017 1.349l-2.841.812a3.09 3.09 0 0 0-2.122 2.121l-.812 2.842a1.402 1.402 0 0 1-2.697 0l-.812-2.841a3.09 3.09 0 0 0-2.121-2.122L4.374 9.85a1.402 1.402 0 0 1 0-2.697l2.842-.812A3.09 3.09 0 0 0 9.337 4.22l.812-2.841a1.402 1.402 0 0 1 2.697 0l.812 2.841a3.09 3.09 0 0 0 2.122 2.122l2.841.812a1.4 1.4 0 0 1 1.017 1.348M6.993 14.18a.653.653 0 1 1 .924.924l-3.894 3.893a.653.653 0 0 1-.924-.924zM4.597 12.533a.653.653 0 1 1 .924.924l-2.097 2.096a.653.653 0 1 1-.924-.924z" /></svg>;
const ForwardRef = forwardRef(IconGuiProdAiTransportSolid);
export default ForwardRef;