import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconSocialLinkedinMono = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="currentColor" d="M24 1.765v20.47A1.764 1.764 0 0 1 22.235 24H1.765A1.765 1.765 0 0 1 0 22.235V1.765A1.765 1.765 0 0 1 1.765 0h20.47A1.765 1.765 0 0 1 24 1.765M7.059 9.176h-3.53v11.295h3.53zm.317-3.882a2.033 2.033 0 0 0-2.018-2.047h-.064a2.047 2.047 0 1 0 0 4.094 2.033 2.033 0 0 0 2.082-1.983zm13.095 8.315c0-3.395-2.16-4.715-4.306-4.715a4.02 4.02 0 0 0-3.572 1.821h-.099V9.176H9.176v11.295h3.53v-6.007a2.344 2.344 0 0 1 2.117-2.527h.135c1.122 0 1.955.705 1.955 2.484v6.05h3.53z" /></svg>;
const ForwardRef = forwardRef(IconSocialLinkedinMono);
export default ForwardRef;