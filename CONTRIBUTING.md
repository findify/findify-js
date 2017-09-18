- Create a topic branch from where you want to base your work. This is usually master.
- Make commits of logical units.
- Write good commit messages (see below).
- Push your changes to a topic branch in your fork of the repository.
- Submit a pull request
- If its not a hotfix or something urgent wait for at least one approval

Tag all merged pull requests that go into the release with the relevant milestone.
Each merged PR should also be labeled with one of the relevant project and tag labels.
When creating a pull request, its comment should reference the corresponding issue id.

We use [commitizen](https://github.com/commitizen/cz-cli) +
[cz-lerna-changelog](https://github.com/atlassian/cz-lerna-changelog) to format commit messages and
[lerna-semantic-release](https://github.com/atlassian/lerna-semantic-release) to release new versions automatically.

Use `make commit` `npm run c` instead of `git commit`.
Read: https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md

Use package name to specify the `scope` of change.
You can use `*` when the change affects more than a single scope and `^` if its
a top-level change or a "chore" related to the monorepo setup.

*  Commits of type `fix` will trigger bugfix releases, think `0.0.1`
*  Commits of type `feat` will trigger feature releases, think `0.1.0`
*  Commits with `BREAKING CHANGE` in body or footer will trigger breaking releases, think `1.0.0`

All other commit types will trigger no new release.
