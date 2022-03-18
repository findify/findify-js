import { Config } from '@findify/store-configuration';

const config: Config = {
  sentryDisabled: true,
  key: 'd0a81ccc-62dd-42a9-be8f-b33024dbeaea',
  merchantId: 8330,
  status: 'live',
  platform: 'shopify',
  mobileBreakpoint: 768,
  api: {
    method: 'post',
  },
  analytics: {},
  observeDomChanges: false,
  location: {
    searchUrl: '/pages/search-results',
    prefix: '',
    keys: ['q', 'limit', 'sort', 'offset', 'filters', 'rules'],
  },
  selectors: {
    '#findify_results': 'search',
    "input[name='q']": 'autocomplete',
  },
  currency: {
    code: 'USD',
    symbol: '$',
    thousand: ',',
    decimal: '.',
    symbolOnLeft: true,
    spaceBetweenAmountAndSymbol: false,
    precision: 2,
  },
  collections: ['products/camping-and-hiking/hiking-clothing/hiking-jackets/c/420'],
  stickers: {
    discount: false,
    outOfStock: false,
  },
  colorMapping: {},
  translations: {
    'suggestions.accessibleTitle':
      'Use up and down arrows to review and enter to select.',
    'product.availableInVariants': 'Available in %s options',
    'facets.less': 'Less',
    'facets.more': 'More',
    'facets.allCategories': 'All Categories',
    'facets.expanded': 'Expanded',
    'facets.collapsed': 'Collapsed',
    'facets.submit': 'go',
    'facets.filters': 'Filters',
    'facets.clearAll': 'Clear all',
    'facets.hide': 'Hide',
    'facets.back': 'Back to menu',
    'facets.done': 'Done',
    'facets.seeResults': 'See results',
    'facets.search': 'Search',
    'pagination.previous': 'Prev',
    'pagination.goTo': 'Go to page',
    'pagination.next': 'Next',
    'actions.showFilters': 'Filters',
    'actions.sorting': 'Sort by',
    'actions.back': 'Back to menu',
    'actions.seeResults': 'See results',
    'actions.sortBy': 'Sort by',
    'actions.filter': 'Filters',
    'search.title': 'Search Resultss',
    'search.loadPrev': 'Load previous',
    'search.loadMore': 'Load more',
    'search.noQuery':
      'Showing all products. Use filters to refine your search.',
    'search.showingEmpty': 'Showing %s results',
    'search.showing': 'Showing %s results for',
    'search.zeroResultsFor': '0 results for',
    'search.partialMatch': 'Showing results that partially match instead.',
    'search.accessibleUpdate': 'Products has been updated',
    'zeroresults.sorryNoResults':
      'Oh no! Your search for %s did not match any products.<br/>But don’t give up, we’re here to help you find what you’re looking for.',
    'zeroresults.noResultsFound':
      'We can\'t seem to find any products that match your search for \\"%s\\"',
    'zeroresults.noResultEmptyQuery':
      "We can't seem to find any products that match your search",
    'zeroresults.tryOneOfThese': 'Try one of these instead:',
    'zeroresults.checkOutPopularProducts':
      'Or check out some of these popular products',
    'autocomplete.trendingSearches': 'Trending searches',
    'autocomplete.suggestionsTitle': 'Search suggestions',
    'autocomplete.trendingProducts': 'Trending products',
    'autocomplete.productMatches': 'Product matches',
    'autocomplete.tipResults': 'View all results for',
    'autocomplete.viewAll': 'View all results for',
    'autocomplete.viewAllResults': 'View all',
    'autocomplete.placeholder': 'What are you looking for?',
    'range.up': '&amp; up',
    'range.under': 'Under',
  },
  features: {
    autocomplete: {
      instant: false,
      disableRerenderingOnInputChange: false,
      handleFormSubmit: true,
      enableTrendingSearches: true,
      renderIn: 'body',
      defaultRequestParams: {
        limits: {
          suggestions: 10,
          products: 10,
          'shopify-collection_999': 10,
          'shopify-blog_998': 10,
        },
      },
      mobile: {
        template: 'sidebar',
        breakpoints: {
          grid: [
            {
              width: 0,
              value: 12,
            },
          ],
          layout: [
            {
              width: 0,
              value: 12,
            },
          ],
          products: [
            {
              width: 0,
              value: 12,
            },
          ],
        },
        product: {
          template: 'vertical',
          price: {
            template: 'min-max',
          },
          title: {
            lines: 2,
          },
          description: {
            lines: 2,
          },
          variants: {
            display: false,
            template: 'text',
          },
          image: {
            aspectRatio: 1,
            lazy: false,
            lazyOffset: 0,
            multiple: false,
          },
        },
        position: 'left',
        overlay: true,
        suggestions: {
          display: true,
          limit: 8,
          template: 'vertical',
        },
        productMatches: {
          display: false,
          limit: 7,
        },
        layout: [
          ['suggestions', 'shopify-collection_999'],
          ['shopify-blog_998'],
        ],
        products: {
          limit: 7,
          item: {
            template: 'vertical',
            price: {
              template: 'min-max',
            },
            title: {
              lines: 2,
            },
            description: {
              lines: 2,
            },
            variants: {
              display: false,
              template: 'text',
            },
            image: {
              aspectRatio: 1,
              lazy: false,
              lazyOffset: 0,
              multiple: false,
            },
          },
        },
        content: {
          'shopify-blog_998': {
            title: 'Blogs',
            limit: 5,
            item: {
              template: 'horizontal',
              title: {
                lines: 2,
              },
              description: {
                lines: 2,
              },
              image: {
                aspectRatio: 1,
                lazy: false,
                lazyOffset: 0,
              },
            },
          },
          'shopify-collection_999': {
            limit: 6,
            item: {
              template: 'horizontal',
              title: {
                lines: 2,
              },
              description: {
                lines: 2,
              },
              image: {
                aspectRatio: 1,
                lazy: false,
                lazyOffset: 0,
              },
            },
            title: 'Collections',
          },
        },
      },
      desktop: {
        "breakpoints":{
           "grid":[
              {
                 "width":0,
                 "value":3
              }
           ],
           "layout":[
              {
                 "width":0,
                 "value":"4|8"
              }
           ],
           "products":[
              {
                 "width":0,
                 "value":4
              }
           ],
           "shopify-blog_998":[
            {
               "width":0,
               "value": 3
            }
         ]  
        },
        "productMatches":{
           "display":true,
           "limit":4
        },
        "products":{
           "limit":4,
           "item":{
              "template":"vertical",
              "price":{
                 "template":"min-max"
              },
              "title":{
                 "lines":2
              },
              "description":{
                 "lines":2
              },
              "variants":{
                 "display":false,
                 "template":"text"
              },
              "image":{
                 "aspectRatio":1,
                 "lazy":false,
                 "lazyOffset":0,
                 "multiple":false
              }
           }
        },
        "position":"right",
        "layout":[
           [
              "suggestions",
              "shopify-collection_999",
              "shopify-page_997"
           ],
           [
              "products",
              "shopify-blog_998"
           ],
        ],
        "product":{
           "template":"vertical",
           "price":{
              "template":"min-max"
           },
           "title":{
              "lines":2
           },
           "description":{
              "lines":2
           },
           "variants":{
              "display":false,
              "template":"text"
           },
           "image":{
              "aspectRatio":1,
              "lazy":false,
              "lazyOffset":0,
              "multiple":false
           }
        },
        "suggestions":{
           "display":true,
           "limit":4,
           "template":"vertical"
        },
        "overlay":false,
        "content":{
           "shopify-collection_999":{
              "title":"Collections",
              "limit":3,
              "item":{
                 "template":"horizontal",
                 "title":{
                    "lines":2
                 },
                 "description":{
                    "lines":2
                 },
                 "image":{
                    "aspectRatio":1,
                    "lazy":false,
                    "lazyOffset":0
                 }
              }
           },
           "shopify-page_997":{
              "title":"Shopify Pages",
              "limit":3,
              "item":{
                 "template":"horizontal",
                 "title":{
                    "lines":2
                 },
                 "description":{
                    "lines":2
                 },
                 "image":{
                    "aspectRatio":1,
                    "lazy":false,
                    "lazyOffset":0
                 }
              }
           },
           "shopify-blog_998":{
              "title":"Blogs",
              "limit":4,
              "item":{
                 "template":"vertical",
                 "title":{
                    "lines":2 
                 },
                 "description":{
                    "lines":2
                 },
                 "image":{
                    "aspectRatio":0.5,
                    "lazy":false,
                    "lazyOffset":0
                 }
              }
           }
        },
        "template":"dropdown"
     },
    },
    search: {
      // contentTabs: ['shopify-blog_998'],
      disableAutoRequest: false,
      facets: {
        position: 'left',
        sticky: false,
        accordion: false,
        hidable: true,
        filters: {
          brand: {
            type: 'text',
            label: 'Brand',
            initiallyCollapsed: false,
            maxItemsCount: 6,
            precision: 0,
          },
          color: {
            type: 'text',
            label: 'Color',
            initiallyCollapsed: false,
            maxItemsCount: 6,
            precision: 0,
          },
          size: {
            type: 'text',
            label: 'Size',
            initiallyCollapsed: false,
            maxItemsCount: 6,
            precision: 0,
          },
          price: {
            type: 'price',
            label: 'Price',
            initiallyCollapsed: false,
            maxItemsCount: 6,
            precision: 0,
          },
          category: {
            type: 'category',
            label: 'Category',
            initiallyCollapsed: false,
            maxItemsCount: 6,
            precision: 0,
          },
        },
      },
      zeroResultsType: 'trending',
      fallbackEnabled: true,
      includeRules: false,
      scrollTop: {
        enabled: true,
        selector: '',
        offset: 0,
      },
      sorting: {
        options: [
          {
            field: 'default',
            order: 'default',
            label: 'Popularity',
          },
          {
            field: 'price',
            order: 'asc',
            label: 'Price: Low to high',
          },
          {
            field: 'price',
            order: 'desc',
            label: 'Price: High to low',
          },
          {
            field: 'created_at',
            order: 'desc',
            label: "What's new",
          },
        ],
      },
      pagination: {
        type: 'lazy',
        autoLoadTimes: 2,
        step: 2,
      },
      product: {
        template: 'vertical',
        price: {
          template: 'min-max',
        },
        title: {
          lines: 3,
        },
        description: {
          lines: 3,
        },
        variants: {
          display: true,
          template: 'text',
        },
        image: {
          aspectRatio: 1,
          lazy: true,
          lazyOffset: 0,
          multiple: false,
        },
      },
      breakpoints: {
        grid: [
          {
            width: 400,
            value: 6,
          },
          {
            width: 600,
            value: 4,
          },
          {
            width: 1000,
            value: 3,
          },
        ],
        layout: [
          {
            width: 0,
            value: 'fit|auto',
          },
        ],
      },
      defaultRequestParams: {
        limit: 24,
      },
    },
    content: {
      'shopify-blog_998': {
        defaultRequestParams: {
          limit: 5,
        },
        title: 'Blogs',
        pagination: {
          type: 'static',
          autoLoadTimes: 2,
          step: 2,
        },

        scrollTop: {
          enabled: false,
          selector: '',
          offset: 10,
        },

        item: {
          template: 'vertical',
          title: {
            lines: 2,
          },
          description: {
            lines: 2,
          },
          image: {
            aspectRatio: 1,
            lazy: false,
            lazyOffset: 0,
          },
        },

        breakpoints: {
          grid: [
            {
              width: 0,
              value: 4,
            },
          ],
        },
      },
    },
    recommendations: {},
  },
  merchantName: 'findify-staging.myshopify.com',
  mjs_version: '7.1.0',
};

export default config;
