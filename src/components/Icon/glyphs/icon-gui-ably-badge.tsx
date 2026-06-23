import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconGuiAblyBadge = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="currentColor" fillRule="evenodd" d="M2.77 19.615 11.849 3H9.4L1 18.373zm18.282 0L11.975 3h2.449l8.399 15.373zm-9.14-6.962 9.014 7.06L19.086 21l-7.174-5.617L4.737 21l-1.84-1.288z" clipRule="evenodd" /></svg>;
const ForwardRef = forwardRef(IconGuiAblyBadge);
export default ForwardRef;