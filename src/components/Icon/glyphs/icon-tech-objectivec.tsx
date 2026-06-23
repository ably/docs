import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconTechObjectivec = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill="none" viewBox="0 0 48 48" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<defs><clipPath id="clip0_1031_1913"><path fill="#fff" d="M0 0h48v48H0z" /></clipPath></defs><g fill="#03020D" clipPath="url(#clip0_1031_1913)"><path d="M48 45v3H38v-3zM10 45v3H0v-3zM33.068 31.276c-1.728 1.26-3.888 2.088-6.48 2.088-5.508 0-9.54-3.816-9.54-9.144 0-5.4 3.924-9.252 9.252-9.252l7.74 2.376v-5.076c-1.98-.72-4.788-1.476-7.884-1.476-7.74 0-13.752 5.436-13.752 13.428s6.012 13.428 13.752 13.428c3.348 0 6.48-.972 8.532-2.268zM0 3h3v42H0zM48 0v3H38V0zM45 3h3v42h-3zM10 0v3H0V0z" /></g></svg>;
const ForwardRef = forwardRef(IconTechObjectivec);
export default ForwardRef;