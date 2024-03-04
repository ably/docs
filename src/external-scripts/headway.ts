/* global Headway */

import { scriptLoader } from './utils';

const HEADWAY_WIDGET_TARGET = '#headway-widget-target';

const headway = (headwayAccountId) => {
  require('./headway.css');

  scriptLoader(document, '//cdn.headwayapp.co/widget.js', {
    onload: () => {
      const headwayElement = document.querySelector(HEADWAY_WIDGET_TARGET);

      // Don't try to load the widget on pages where the widget is not loaded
      if (!headwayElement) {
        return;
      }

      Headway.init({
        selector: HEADWAY_WIDGET_TARGET,
        account: headwayAccountId,
      });
    },
  });
};

export default headway;
