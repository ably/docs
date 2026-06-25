import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconProductChatMono = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} fill="none" viewBox="0 0 128 128" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path stroke="currentColor" strokeWidth={6} d="M38 11h52c13.255 0 24 10.745 24 24v70.41c0 5.213-6.19 7.946-10.043 4.434l-22.812-20.8A4 4 0 0 0 78.45 88H38c-13.255 0-24-10.745-24-24V35c0-13.255 10.745-24 24-24Z" /></svg>;
const ForwardRef = forwardRef(IconProductChatMono);
export default ForwardRef;