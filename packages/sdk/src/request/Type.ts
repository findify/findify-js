/**
 * * [autocomplete](https://findify.readme.io/v3/reference#search-api-autocomplete) - Get the predictive results.
 *   The answer contains both search suggestions to direct the end user to high-conversion queries,
 *   and item matches to help them understand what will be displayed in the complete search results.
 * * [search](https://findify.readme.io/v3/reference#search-api-search) - Get the complete search results.
 *   It includes both items matching the query and a list of facet that the user can use as filters to narrow down the search query.
 * * [smart-collection](https://findify.readme.io/v3/reference#smart-collection-api) - Provides and ability to use our filters on pages other than search results.
 * * [recommendations](https://findify.readme.io/v3/reference#recommendation-api) - Provides an access to different types of recommendations.
 * * [feedback](https://findify.readme.io/reference#feedback-api) - Provides a way to send information about
 *   user activity on the web page to power our ML and personalization algorithms.
 */
export enum Type {
  Autocomplete = 'autocomplete',
  Search = 'search',
  SmartCollection = 'smart-collection',
  Recommendations = 'recommendations',
  Feedback = 'feedback',
}
