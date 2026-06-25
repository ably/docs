import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconProductLivesyncMono = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} fill="none" viewBox="0 0 128 128" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path stroke="currentColor" strokeLinecap="round" strokeWidth={6} d="M115.029 117H64V78.015a1 1 0 0 1 1.605-.797l50.029 37.986c.763.579.353 1.796-.605 1.796ZM11 52v25c0 22.091 17.909 40 40 40h13M12.97 11H64v38.985a1 1 0 0 1-1.605.797L12.366 12.797c-.763-.58-.353-1.797.605-1.797ZM117 76V51c0-22.091-17.909-40-40-40H64" /></svg>;
const ForwardRef = forwardRef(IconProductLivesyncMono);
export default ForwardRef;