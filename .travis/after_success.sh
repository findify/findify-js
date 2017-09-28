#!/bin/bash
set -e

S3_BUCKET_PATH=findify-assets
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

    # TODO: its not the same for every subpackage
    local SRC_FILE_PATH=packages/$PKG_NAME/lib/index.js
    local DST_FILE_PATH=$S3_BUCKET_PATH/$PKG_NAME/$PKG_NAME-$PKG_SEMVER.js

    echo "deploying (actually, not yet) $SRC_FILE_PATH to s3://$DST_FILE_PATH"
    # aws s3 cp $SRC_FILE_PATH s3://$DST_FILE_PATH
  fi
}

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo "We are in a pull request, not releasing"
  exit 0
fi

if [[ $TRAVIS_BRANCH == 'master' ]]; then
  npm run release

  # get all new tags
  # deploy to s3 corresponding pkgs

  PKGS=$(ls packages)
  for i in $PKGS
  do
    LATEST_GIT_TAG=$(git describe --always --match "*${i}*" --abbrev=0)
    deploy_to_s3 $LATEST_GIT_TAG
  done
fi
