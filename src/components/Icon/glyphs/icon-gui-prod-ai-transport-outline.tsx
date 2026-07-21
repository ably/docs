import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconGuiProdAiTransportOutline = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.30682} fillRule="evenodd" clipRule="evenodd" d="M11.4975 1.01587C11.8318 1.01587 12.1255 1.23747 12.2174 1.55888L13.0292 4.40013C13.3845 5.64375 14.3566 6.61585 15.6002 6.97117L18.4414 7.78296C18.7629 7.87479 18.9845 8.16857 18.9845 8.50285C18.9845 8.83713 18.7629 9.13091 18.4414 9.22274L15.6002 10.0345C14.3566 10.3898 13.3845 11.3619 13.0292 12.6056L12.2174 15.4468C12.1255 15.7682 11.8318 15.9898 11.4975 15.9898C11.1632 15.9898 10.8694 15.7682 10.7776 15.4468L9.9658 12.6056C9.61048 11.3619 8.63838 10.3898 7.39476 10.0345L4.55351 9.22274C4.2321 9.13091 4.0105 8.83713 4.0105 8.50285C4.0105 8.16857 4.2321 7.87479 4.55351 7.78296L7.39476 6.97117C8.63838 6.61585 9.61048 5.64375 9.9658 4.40013L10.7776 1.55888C10.8694 1.23747 11.1632 1.01587 11.4975 1.01587Z" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.30682} d="M7.45451 14.6423 3.56128 18.5356M5.05876 12.9951 2.9624 15.0915" /></svg>;
const ForwardRef = forwardRef(IconGuiProdAiTransportOutline);
export default ForwardRef;
