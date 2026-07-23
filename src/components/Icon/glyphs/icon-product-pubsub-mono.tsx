import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconProductPubsubMono = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} fill="none" viewBox="0 0 128 128" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path stroke="currentColor" strokeWidth={6} d="M56.604 13.893 16.802 77.888C15.145 80.552 17.061 84 20.2 84H62a2 2 0 0 1 2 2v25.995c0 4.023 5.272 5.529 7.397 2.112l39.802-63.994c1.657-2.665-.259-6.113-3.397-6.113H66a2 2 0 0 1-2-2V16.005c0-4.023-5.271-5.529-7.396-2.112Z" /></svg>;
const ForwardRef = forwardRef(IconProductPubsubMono);
export default ForwardRef;