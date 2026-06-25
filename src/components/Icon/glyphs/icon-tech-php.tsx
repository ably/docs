import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconTechPhp = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill="none" viewBox="0 0 48 48" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="#000" fillRule="evenodd" d="M10.917 17.073H3.798L0 36.118h3.692l1.01-5.047h3.187q1.62 0 3.134-.372 1.515-.372 2.842-1.753a8.2 8.2 0 0 0 1.7-2.443q.638-1.355.824-2.763.479-3.081-.93-4.86-1.408-1.781-4.542-1.807m-4.016 3.055.005-.026-.026.026zm0 0L5.312 28.07q.16.027.32.027h.371q2.55.027 4.25-.505 1.7-.558 2.284-3.878.479-2.789-.956-3.214-1.408-.425-3.533-.398a8 8 0 0 1-.61.026z" clipRule="evenodd" /><path fill="#000" d="M20.595 12h3.665l-1.036 5.073h3.294q2.71.054 4.037 1.116 1.355 1.062.797 4.037l-1.78 8.846h-3.718l1.7-8.447q.266-1.328-.16-1.886-.425-.558-1.832-.558l-2.949-.027-2.178 10.918H16.77z" /><path fill="#000" fillRule="evenodd" d="M42.407 17.073h-7.119L31.49 36.118h3.692l1.01-5.047h3.187q1.62 0 3.134-.372 1.515-.372 2.842-1.753a8.2 8.2 0 0 0 1.7-2.443q.638-1.355.824-2.763.479-3.081-.93-4.86-1.409-1.781-4.542-1.807m-4.016 3.055.005-.026-.026.026zm0 0-1.588 7.942q.159.027.318.027h.372q2.55.027 4.25-.505 1.7-.558 2.284-3.878.479-2.789-.956-3.214-1.408-.425-3.533-.398a8 8 0 0 1-.61.026z" clipRule="evenodd" /></svg>;
const ForwardRef = forwardRef(IconTechPhp);
export default ForwardRef;