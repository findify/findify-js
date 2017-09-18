[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

# Findify monorepo

### Known issues

* [ts-jest/issues/238](https://github.com/kulshekhar/ts-jest/issues/238) - Doesn't work with jest --projects switch,
so you cannot use the [projects option](https://facebook.github.io/jest/docs/en/configuration.html#projects-array-string)
* root-level tsconfig.test.json is required by ts-jest
* [tsc -w pain](https://github.com/Microsoft/TypeScript/issues/12996#issuecomment-330003351) - Its impossible to run tsc in "watch-only" mode without compiling
