  #!/bin/bash

  if [[ $TRAVIS_BRANCH == 'master' ]]; then
    export PUBLIC_PATH="https://cdn.jsdelivr.net/npm/@findify/bundle@__MERCHANT_VERSION_RAW__/dist/"
    export PROJECT_NAME='bundle-production'
    export FINDIFY_ENV="production"
    export NODE_ENV="production"
    echo "$PROJECT_NAME : $PUBLIC_PATH"
  fi

  if [[ $TRAVIS_BRANCH == 'develop' || $TRAVIS_BRANCH =~ ^([0-9]+\.[0-9]+\.[0-9]+) ]]; then
    export PUBLIC_PATH="https://findify-assets-2bveeb6u8ag.netdna-ssl.com/bundle/staging/$TRAVIS_BRANCH/"
    export PROJECT_NAME='bundle-staging'
    export FINDIFY_ENV="staging"
    export NODE_ENV="production"
    echo "$PROJECT_NAME : $PUBLIC_PATH"
  fi

  yarn
