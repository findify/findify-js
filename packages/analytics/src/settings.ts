export const env = {
  staging:{
    searchApiUrl: 'https://search-staging.findify.io/v4',
    bigcommerceTrackingUrl: 'https://order.findify.io/bigcommerce-staging',
  },

  production: {
    searchApiUrl: 'https://api.findify.io/v4',
    bigcommerceTrackingUrl: 'https://order.findify.io/bigcommerce',
  }
}


export default env[
  (typeof process !== 'undefined' && process.env && process.env.FINDIFY_ENV) ||
  'production'
];
