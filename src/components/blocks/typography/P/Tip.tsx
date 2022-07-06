import React from 'react';
import { HtmlComponentProps } from '../../../html-component-props';
import Html from '../../Html';
import '@ably/ui/core/styles.css';

/**
 * This is required because Tailwind v2 does not offer a good way to style one side of a border.
 * The closest to what design requires here is:
 * rounded-lg bg-containers-three ring-2 ring-event-driven-push-transport ring-inset border-l-8 border-event-driven-software p-4
 */
const InelegantLeftsideElement = () => (
  <span className={`bg-event-driven-software w-8 left-0 cursor-default`}>&nbsp;</span>
);

// This needs to be set to a grid in order to render properly
export const Tip = ({ data, attribs }: HtmlComponentProps<'p'>) => (
  <p
    {...attribs}
    className={`${attribs.className} flex rounded-lg bg-containers-three  border-2 border-event-driven-push-transport p-4`}
  >
    <InelegantLeftsideElement />
    <strong className={`pb-4`}>TIP</strong>
    <br />
    <div className={`inline`}>
      <Html data={data} />
    </div>
  </p>
);
