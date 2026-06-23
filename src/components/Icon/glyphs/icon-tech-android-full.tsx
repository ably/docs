import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconTechAndroidFull = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill="none" viewBox="0 0 48 48" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="#ABC43E" fillRule="evenodd" d="M29.711 6.88c.84 0 1.52.664 1.52 1.484s-.68 1.484-1.52 1.484c-.838 0-1.52-.665-1.52-1.484 0-.82.682-1.485 1.52-1.485m-11.423 0c.839 0 1.52.664 1.52 1.484s-.681 1.484-1.52 1.484c-.84 0-1.52-.665-1.52-1.484 0-.82.68-1.485 1.52-1.485m23.744 8.425c1.633 0 2.968 1.303 2.968 2.897v11.59c0 1.594-1.335 2.897-2.968 2.897-1.632 0-2.968-1.303-2.968-2.897v-11.59c0-1.594 1.336-2.897 2.968-2.897m-36.065 0c1.632 0 2.967 1.303 2.967 2.897v11.59c0 1.594-1.335 2.897-2.967 2.897S3 31.386 3 29.792v-11.59c0-1.594 1.335-2.897 2.967-2.897m15.624 23.357v6.44c0 1.594-1.335 2.898-2.968 2.898-1.632 0-2.967-1.304-2.967-2.898v-6.44h-2.49c-1.32 0-2.402-1.056-2.402-2.346v-21.11h26.47v21.11c0 1.29-1.08 2.346-2.402 2.346h-2.49v6.44c0 1.594-1.334 2.898-2.966 2.898s-2.967-1.304-2.967-2.898v-6.44zm2.408-35.705c1.998 0 3.89.358 5.589 1l2.5-3.759a.453.453 0 0 1 .617-.128.43.43 0 0 1 .13.604l-2.412 3.628c3.992 1.8 6.712 5.224 6.79 9.166H10.786c.078-3.942 2.798-7.366 6.79-9.166L15.164.674a.43.43 0 0 1 .131-.604.453.453 0 0 1 .618.128l2.5 3.759c1.697-.641 3.59-1 5.587-1" clipRule="evenodd" /></svg>;
const ForwardRef = forwardRef(IconTechAndroidFull);
export default ForwardRef;