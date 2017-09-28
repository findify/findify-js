#!/bin/bash
set -e

# TODO: should be set from outside
S3_ENV=staging
# root bucket path for package assets
S3_BUCKET_PATH=findify-assets

# FYI: bash >= 4.0 required

# mapping from pkg name to the relative file path of
# the corresponding dir that should be published to S3_BUCKET_PATH
typeset -A SRC_MAP

# mapping from pkg name to the directory path on S3
typeset -A DST_MAP

SRC_MAP[analytics]=dist/prod
DST_MAP[analytics]=analytics-js/$S3_ENV

SRC_MAP[corge]=lib/js/src
DST_MAP[corge]=corge/$S3_ENV

SRC_MAP[grault]=lib
DST_MAP[grault]=grault/$S3_ENV

SRC_MAP[helpers]=dist
DST_MAP[helpers]=helpers-js/$S3_ENV

SRC_MAP[mjs]=dist
DST_MAP[mjs]=mjs/$S3_ENV

SRC_MAP[quux]=lib
DST_MAP[quux]=quux/$S3_ENV

SRC_MAP[quuz]=lib
DST_MAP[quuz]=quuz/$S3_ENV

SRC_MAP[qux]=lib
DST_MAP[qux]=qux/$S3_ENV

SRC_MAP[sdk]=lib
DST_MAP[sdk]=js-sdk/$S3_ENV

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

    local PKG_BUNDLE_DIR=${SRC_MAP[$PKG_NAME]}
    local DST_BUNDLE_DIR=${DST_MAP[$PKG_NAME]}/$PKG_SEMVER

    local SRC_BUNDLE_PATH=packages/$PKG_NAME/$PKG_BUNDLE_DIR
    local DST_BUNDLE_PATH=$S3_BUCKET_PATH/$PKG_NAME/$DST_BUNDLE_DIR

    echo "deploying (actually, not yet) $SRC_BUNDLE_PATH to s3://$DST_BUNDLE_PATH"
    # aws s3 cp --recursive $SRC_FILE_PATH s3://$DST_FILE_PATH
  fi
}

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo "Pull requests are not released to NPM."
  exit 0
fi

if [[ $TRAVIS_BRANCH == 'master' ]]; then
  npm run release

  echo "changelogs"

  find packages -maxdepth 2 -name 'CHANGELOG.md' -print0 | xargs -0 -I % sh -c 'echo %; cat %'

  # get all new tags
  # deploy to s3 corresponding pkgs

  PKGS=$(ls packages)
  for i in $PKGS
  do
    LATEST_GIT_TAG=$(git describe --always --match "*${i}*" --abbrev=0)
    deploy_to_s3 $LATEST_GIT_TAG
  done
fi
