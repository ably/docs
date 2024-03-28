# Git Hooks

These are recommended git hooks for your project.

You can activate them by running `yarn repo-githooks` and deactivate them by running `yarn no-githooks`.

`yarn repo-githooks` will set your `core.hooksPath` to the correct folder, an example of running this without `yarn` might be `git config core.hooksPath .githooks` - but as the specifics may change it might be more convenient to rely on `yarn repo-githooks`.

`yarn no-githooks` can be substituted at any time for `git config --unset core.hooksPath`.
