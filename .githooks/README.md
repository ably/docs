# Git Hooks

These are recommended git hooks for your project.

You can activate them by running `npm run repo-githooks` and deactivate them by running `npm run no-githooks`.

`npm run repo-githooks` will set your `core.hooksPath` to the correct folder, an example of running this without `npm` might be `git config core.hooksPath .githooks` - but as the specifics may change it might be more convenient to rely on `npm run repo-githooks`.

`npm run no-githooks` can be substituted at any time for `git config --unset core.hooksPath`.