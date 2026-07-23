import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconGuiProdSpacesSolid = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="currentColor" d="M3.569 5.744C3.203 4.42 4.42 3.203 5.744 3.57l14.345 3.97c1.634.453 1.756 2.723.18 3.348l-6.474 2.567a.6.6 0 0 0-.34.34l-2.568 6.476c-.625 1.575-2.895 1.453-3.347-.18z" /></svg>;
const ForwardRef = forwardRef(IconGuiProdSpacesSolid);
export default ForwardRef;