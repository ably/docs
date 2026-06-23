import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconProductLiveobjectsMono = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} fill="none" viewBox="0 0 128 128" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<g stroke="currentColor" strokeLinecap="round" strokeWidth={6}><path d="M76 11h17c13.255 0 24 10.745 24 24v17M52 11H35c-13.255 0-24 10.745-24 24v17m0 24v17c0 13.255 10.745 24 24 24h17m65-41v17c0 13.255-10.745 24-24 24H76" /><path strokeLinejoin="round" d="m43 66 17 17 26-38" /></g></svg>;
const ForwardRef = forwardRef(IconProductLiveobjectsMono);
export default ForwardRef;