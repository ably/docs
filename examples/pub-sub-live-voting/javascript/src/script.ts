// Single entry point. The app has three roles — voter, presenter, admin —
// selected by the `?role=` query param. Splitting one app this way (rather
// than three HTML pages) lets the docs sandbox show two of the roles side by
// side in separate preview panes, each loaded with a different `?role=`.
import { mount as mountVoter } from './voter';
import { mount as mountPresenter } from './presenter';
import { mount as mountAdmin } from './admin';
import { runDemoHost } from './demo-bootstrap';
import { IS_SANDBOX } from './config';

const params = new URLSearchParams(window.location.search);
const role = params.get('role') ?? 'voter';

if (role === 'presenter') {
  mountPresenter();
  // Sandbox only: `?demo=1` also makes this pane the host that auto-starts the
  // show, since there's no admin running. See demo-bootstrap.ts.
  if (IS_SANDBOX && params.get('demo') === '1') {
    runDemoHost();
  }
} else if (role === 'admin') {
  mountAdmin();
} else {
  mountVoter();
}
