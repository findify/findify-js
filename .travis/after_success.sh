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
  [analytics]=dist
  [analytics-dom]=dist
  [sdk]=dist
  [agent]=dist
  [bundle]=dist
  [react-connect]=dist
)

# mapping from pkg name to the directory path on S3
typeset -A DST_MAP
DST_MAP=(
  [analytics]=analytics-js
  [analytics-dom]=analytics-dom-js
  [sdk]=js-sdk
  [agent]=js-agent
  [bundle]=bundle
  [react-components]=react-components
  [react-connect]=react-connect
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
  local PKG_NAME=bundle  # pkg name

  local PKG_BUNDLE_DIR=${SRC_MAP[$PKG_NAME]}
  local DST_BUNDLE_DIR=${DST_MAP[$PKG_NAME]}/$S3_ENV/$TRAVIS_COMMIT

  local SRC_BUNDLE_PATH=packages/$PKG_NAME/$PKG_BUNDLE_DIR
  local DST_BUNDLE_PATH=$S3_BUCKET_PATH/$DST_BUNDLE_DIR

  echo "deploying $SRC_BUNDLE_PATH to s3://$DST_BUNDLE_PATH"
  aws s3 cp --recursive $SRC_BUNDLE_PATH s3://$DST_BUNDLE_PATH
}

PKGS=(analytics analytics-dom sdk agent react-connect react-components bundle)
export GIT_SHA=$(git rev-parse HEAD)

LAST_MJS_TAG=$(git describe --always --tags --match "@findify/bundle@*" --abbrev=0)
LAST_MJS_VER=0.0.0-invalid

if [[ $LAST_MJS_TAG =~ ^@findify\/(.+)\@([0-9]+\.[0-9]+\.[0-9]+) ]]; then
  # mjs package version (e.g. 4.1.0)
  LAST_MJS_VER=${BASH_REMATCH[2]}
fi

if [[ $TRAVIS_BRANCH == 'master' ]]; then
  echo "Publishing to NPM"
  lerna publish --yes
fi

if [[ $TRAVIS_BRANCH == 'develop' ]]; then
  echo "deploying bundle to AWS S3"
  echo "tag: $TRAVIS_COMMIT"
  deploy_to_s3 $TRAVIS_COMMIT
fi
