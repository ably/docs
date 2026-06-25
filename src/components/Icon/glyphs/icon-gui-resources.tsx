import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconGuiResources = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="currentColor" fillRule="evenodd" d="M5 1.5c-.69 0-1.25.56-1.25 1.25v1H5a.75.75 0 0 1 0 1.5H3.75v1.5H5a.75.75 0 0 1 0 1.5H3.75v1.5H5a.75.75 0 0 1 0 1.5H3.75v1.5H5a.75.75 0 0 1 0 1.5H3.75v1.5H5a.75.75 0 0 1 0 1.5H3.75v1.5H5a.75.75 0 0 1 0 1.5H3.75v1c0 .69.56 1.25 1.25 1.25h13.5c.69 0 1.25-.56 1.25-1.25v-1.5H12A2.75 2.75 0 0 1 9.25 17v-5A2.75 2.75 0 0 1 12 9.25h7.75v-5.5A2.25 2.25 0 0 0 17.5 1.5zM2.25 2.75v1H1a.75.75 0 0 0 0 1.5h1.25v1.5H1a.75.75 0 0 0 0 1.5h1.25v1.5H1a.75.75 0 0 0 0 1.5h1.25v1.5H1a.75.75 0 0 0 0 1.5h1.25v1.5H1a.75.75 0 0 0 0 1.5h1.25v1.5H1a.75.75 0 0 0 0 1.5h1.25v1A2.75 2.75 0 0 0 5 24h13.5a2.75 2.75 0 0 0 2.75-2.75v-1.511A2.75 2.75 0 0 0 23.75 17v-5a2.75 2.75 0 0 0-2.5-2.739V3.75A3.75 3.75 0 0 0 17.5 0H5a2.75 2.75 0 0 0-2.75 2.75m18.25 8H12c-.69 0-1.25.56-1.25 1.25v5c0 .69.56 1.25 1.25 1.25h9c.69 0 1.25-.56 1.25-1.25v-5c0-.69-.56-1.25-1.25-1.25zm-8-6.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1.5 9.508 1.975 1.241L15.5 15.74zm2.542 2.066a.97.97 0 0 0 0-1.65l-2.024-1.272c-.641-.402-1.518.034-1.518.825v2.545c0 .79.877 1.227 1.518.824z" clipRule="evenodd" /></svg>;
const ForwardRef = forwardRef(IconGuiResources);
export default ForwardRef;