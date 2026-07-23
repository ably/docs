import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconSocialDiscordMono = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="currentColor" d="M20.317 4.607a19.6 19.6 0 0 0-4.885-1.542.074.074 0 0 0-.079.038c-.21.382-.444.88-.608 1.271a18 18 0 0 0-5.487 0c-.163-.4-.406-.89-.617-1.271a.08.08 0 0 0-.079-.038c-1.714.3-3.354.827-4.885 1.542a.07.07 0 0 0-.032.028C.533 9.364-.32 13.976.099 18.532a.08.08 0 0 0 .031.057 19.8 19.8 0 0 0 5.993 3.082.08.08 0 0 0 .084-.028c.462-.642.874-1.318 1.226-2.03a.08.08 0 0 0-.041-.107A13 13 0 0 1 5.52 18.6a.08.08 0 0 1-.008-.13q.19-.145.372-.297a.07.07 0 0 1 .078-.01c3.927 1.824 8.18 1.824 12.061 0a.07.07 0 0 1 .079.01q.18.15.372.297a.08.08 0 0 1-.006.13q-.895.531-1.873.906a.08.08 0 0 0-.041.109c.36.71.772 1.386 1.225 2.028a.075.075 0 0 0 .084.029 19.7 19.7 0 0 0 6.002-3.082.08.08 0 0 0 .032-.056c.5-5.267-.838-9.842-3.549-13.897a.06.06 0 0 0-.031-.03M8.02 15.757c-1.182 0-2.157-1.104-2.157-2.46s.956-2.46 2.157-2.46c1.21 0 2.176 1.113 2.157 2.46 0 1.356-.956 2.46-2.157 2.46m7.975 0c-1.183 0-2.157-1.104-2.157-2.46s.955-2.46 2.157-2.46c1.21 0 2.176 1.113 2.157 2.46 0 1.356-.946 2.46-2.157 2.46" /></svg>;
const ForwardRef = forwardRef(IconSocialDiscordMono);
export default ForwardRef;