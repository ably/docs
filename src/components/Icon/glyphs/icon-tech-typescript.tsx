import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconTechTypescript = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill="none" viewBox="0 0 48 48" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<defs><clipPath id="clip0_1031_1977"><path fill="#fff" d="M0 0h48v48H0z" /></clipPath></defs><g clipPath="url(#clip0_1031_1977)"><path fill="#007ACC" d="M0 24V0h48v48H0" /><path fill="#fff" fillRule="evenodd" d="M41.568 23.796c-.84-.876-1.776-1.428-3-1.716l.024-.024c-.828-.216-2.808-.288-3.648-.12-2.592.48-4.404 2.16-4.92 4.56-.168.684-.108 2.388.072 3.084.24.804.756 1.776 1.32 2.4.984 1.032 2.04 1.704 4.524 2.76 2.16.96 2.928 1.392 3.312 1.92.276.42.36.672.36 1.224 0 .6-.192 1.032-.636 1.44-1.032.936-3.12 1.044-4.68.24-.516-.288-1.404-1.128-1.8-1.752l-.312-.42-1.356.792-1.8 1.044-.456.288c-.048.084.804 1.368 1.248 1.848 1.128 1.236 2.964 2.196 4.884 2.556.9.156 2.82.18 3.66.036 2.676-.444 4.548-1.8 5.316-3.804.684-1.836.456-4.284-.564-5.844-.9-1.392-2.388-2.364-5.82-3.84-1.86-.816-2.46-1.212-2.784-1.872-.144-.312-.216-.528-.216-.912 0-1.26.96-2.016 2.4-1.92.996.072 1.632.456 2.256 1.344.192.312.384.516.432.48 1.26-.78 3.336-2.184 3.336-2.256-.048-.216-.708-1.056-1.152-1.536M10.524 26.04v-1.956l.036.012v-1.968l8.4-.036c4.62 0 8.424.012 8.424.048.048.024.048.9.048 1.98v1.92h-6.24V43.8h-4.428V26.04z" clipRule="evenodd" /></g></svg>;
const ForwardRef = forwardRef(IconTechTypescript);
export default ForwardRef;