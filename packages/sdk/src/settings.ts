const common = {
  timeout: 5000,
  jsonpCallback: 'findifyCallback',
};

export const staging = {
  ...common,
  url: 'https://search-staging.findify.io/v4',
  // usually you don't want to
  // retry failed requests on staging
  retryCount: 1,
};

export const production = {
  ...common,
  url: 'https://api.findify.io/v4', 
  retryCount: 3,
};

export const development = staging;
