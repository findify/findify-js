#!/bin/bash

set -e

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo "Pull requests are not released to NPM."
  exit 0
fi

case "$TRAVIS_BRANCH" in
 develop) S3_ENV='staging' ;;
 master) S3_ENV='prod' ;;
 *) S3_ENV='tmp' ;;
esac

# root bucket path for package assets
S3_BUCKET_PATH=findify-assets

# FYI: bash >= 4.0 required

# mapping from pkg name to the relative file path of
# the corresponding dir that should be published to S3_BUCKET_PATH
typeset -A SRC_MAP
SRC_MAP=(
  [analytics]=dist/prod
  [corge]=lib/js/src
  [grault]=lib
  [helpers]=dist
  [mjs]=dist
  [quux]=lib
  [quuz]=lib
  [qux]=lib
  [sdk]=lib
)

# mapping from pkg name to the directory path on S3
typeset -A DST_MAP
DST_MAP=(
  [analytics]=analytics-js
  [corge]=corge
  [grault]=grault
  [helpers]=helpers-js
  [mjs]=mjs
  [quux]=quux
  [quuz]=quuz
  [qux]=qux
  [sdk]=js-sdk
)

# AWS CLI reads config from ~/.aws/config or ~/.aws/credentials
# for travis CI default vars see: https://docs.travis-ci.com/user/environment-variables/#Default-Environment-Variables
mkdir -p $HOME/.aws
cat >$HOME/.aws/credentials << EOL
[default]
aws_access_key_id = ${AWS_S3_ACCESS_KEY}
aws_secret_access_key = ${AWS_S3_SECRET_KEY}
EOL

function deploy_to_s3() {
  if [[ $1 =~ ^@findify\/(.+)\@([0-9]+\.[0-9]+\.[0-9]+) ]]; then
    local GIT_TAG=${BASH_REMATCH[0]}    # the whole thing
    local PKG_NAME=${BASH_REMATCH[1]}   # pkg name
    local PKG_SEMVER=${BASH_REMATCH[2]} # pkg semver

    local VER_PREFIX=
    local PKG_BUNDLE_DIR=${SRC_MAP[$PKG_NAME]}
    local DST_BUNDLE_DIR=${DST_MAP[$PKG_NAME]}/$S3_ENV/$VER_PREFIX$PKG_SEMVER

    local SRC_BUNDLE_PATH=packages/$PKG_NAME/$PKG_BUNDLE_DIR
    local DST_BUNDLE_PATH=$S3_BUCKET_PATH/$DST_BUNDLE_DIR

    echo "deploying $SRC_BUNDLE_PATH to s3://$DST_BUNDLE_PATH"
    aws s3 cp --recursive $SRC_BUNDLE_PATH s3://$DST_BUNDLE_PATH
  fi
}

if [[ $TRAVIS_BRANCH == 'master' ]]; then
  echo "publishing new versions to npm"
  npm run release
  # new tags are created by lerna-semantic-release

  echo "changelogs"
  find packages -maxdepth 2 -name 'CHANGELOG.md' -print0 | xargs -0 -I % sh -c 'echo %; cat %'
fi

PKGS=(analytics helpers mjs)
export GIT_SHA=$(git rev-parse HEAD)

ASSET_HOST="https://findify-assets-2bveeb6u8ag.netdna-ssl.com"
LAST_MJS_TAG=$(git describe --always --tags --match "@findify/mjs@*" --abbrev=0)
LAST_MJS_VER=0.0.0-invalid

if [[ $LAST_MJS_TAG =~ ^@findify\/(.+)\@([0-9]+\.[0-9]+\.[0-9]+) ]]; then
  # mjs package version (e.g. 4.1.0)
  LAST_MJS_VER=${BASH_REMATCH[2]}
fi

if [[ $TRAVIS_BRANCH == 'master' ]]; then
  export PUBLIC_PATH="$ASSET_HOST/mjs/prod/${LAST_MJS_VER}/"
  export PROJECT_NAME='mjs-production'
  echo "$PROJECT_NAME : $PUBLIC_PATH"
fi

if [[ $TRAVIS_BRANCH == 'develop' ]]; then
  export PUBLIC_PATH="$ASSET_HOST/mjs/staging/${LAST_MJS_VER}/"
  export PROJECT_NAME='mjs-staging'
  echo "$PROJECT_NAME : $PUBLIC_PATH"
fi

if [[ $TRAVIS_BRANCH == 'master' || $TRAVIS_BRANCH == 'develop' ]]; then
  echo "building"
  npm run build

  echo "deploying to AWS S3"
  for pkg in ${PKGS[@]}
  do
    echo "pkg: $pkg"
    LATEST_GIT_TAG=$(git describe --always --tags --match "@findify/${pkg}@*" --abbrev=0)
    echo "tag: $LATEST_GIT_TAG"
    deploy_to_s3 $LATEST_GIT_TAG
  done
else
  echo "branch is neither master nor develop, skipping"
fi
