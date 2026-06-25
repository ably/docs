import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconTechWeb = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill="none" viewBox="0 0 48 48" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="#03020D" fillRule="evenodd" d="M4 2h40a2 2 0 0 1 2 2v6H2V4a2 2 0 0 1 2-2m-4 8V4a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V10m2 2v32a2 2 0 0 0 2 2h40a2 2 0 0 0 2-2V12z" clipRule="evenodd" /><path fill="#03020D" d="m14.816 32.52 1.584-6.036 1.596 6.036h1.488L21.812 24h-1.584l-1.488 6.12L17.144 24h-1.476l-1.608 6.12L12.584 24H11l2.328 8.52zM28.025 32.52v-1.404h-3.6v-2.172h3.336V27.54h-3.336v-2.136h3.54V24h-5.04v8.52zM33.073 32.52c1.692 0 2.64-1.02 2.64-2.364 0-.996-.54-1.812-1.524-2.172.612-.396.936-1.032.936-1.776 0-1.248-.9-2.208-2.52-2.208h-3.024v8.52zm-.216-3.576c.72 0 1.272.336 1.272 1.08s-.552 1.092-1.272 1.092H31.13v-2.172zm-.432-3.54c.624 0 1.128.324 1.128 1.044 0 .768-.504 1.092-1.128 1.092H31.13v-2.136zM14 6c0-1.09.91-2 2-2s2 .91 2 2-.91 2-2 2-2-.91-2-2M9 6c0-1.09.91-2 2-2s2 .91 2 2-.91 2-2 2-2-.91-2-2M4 6c0-1.09.91-2 2-2s2 .91 2 2-.91 2-2 2-2-.91-2-2" /></svg>;
const ForwardRef = forwardRef(IconTechWeb);
export default ForwardRef;