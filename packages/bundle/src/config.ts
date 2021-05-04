import { Config } from '@findify/store-configuration';

const config: Config = {
  key: '9a3fbd99-4382-4c51-885f-69ee76e89c6f',
  merchantId: 621,
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
    '#product-findify-rec-6': 'recommendation',
    '#custom-findify-rec-1': 'recommendation',
    '#product-findify-rec-7': 'recommendation',
    '#product-findify-rec-8': 'recommendation',
    '#home-findify-rec-1': 'recommendation',
    '#cart-findify-rec-3': 'recommendation',
  },
  currency: {
    code: 'SEK',
    decimalDigits: 2,
    decimalSeparator: ',',
    spaceBetweenAmountAndSymbol: true,
    symbol: 'kr',
    symbolOnLeft: false,
    thousandsSeparator: '.',
  },
  collections: ['collections/test-col-2000', 'collections/nested-categories'],
  stickers: {
    discount: false,
    outOfStock: false,
  },
  colorMapping: {
    white: '#awfawf',
    Blue: '#00a',
    awfawf: '',
    awfawffff: '#123123',
    awfawfawfawff: '#awfaw',
  },
  translations: {
    'suggestions.accessibleTitle':
      'Use up and down arrows to review and enter to select.',
    'product.availableInVariants': 'Available in %s variants',
    'facets.less': 'Less',
    'facets.more': 'More',
    'facets.allCategories': 'All Categories',
    'facets.expanded': 'Expanded',
    'facets.collapsed': 'Collapsed',
    'facets.submit': 'go',
    'facets.filters': 'Filters',
    'facets.clearAll': 'Clear all',
    'facets.back': 'Back to menu',
    'facets.done': 'Done',
    'facets.seeResults': 'See results',
    'pagination.previous': 'Prev',
    'pagination.goTo': 'Go to page',
    'pagination.next': 'Next',
    'actions.showFilters': 'Filters',
    'actions.sorting': 'Sort by',
    'actions.back': 'Back to menu',
    'actions.seeResults': 'See results',
    'actions.sortBy': 'Sort by',
    'search.title': 'Search Results',
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
      "Oh no! Your search for <span class=\"findify-query\"></span> did not match any products.<br/>But don't give up, we're here to help you find what you're looking for.",
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
    'autocomplete.placeholder': 'What are you looking for?',
  },
  features: {
    autocomplete: {
      renderIn: 'body',
      instant: false,
      handleFormSubmit: false,
      enableTrendingSearches: true,
      mobile: {
        template: 'sidebar',
        position: 'left',
        breakpoints: {
          grid: {
            '200': 3,
          },
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
        },
        overlay: true,
        suggestions: {
          display: true,
        },
        productMatches: {
          display: true,
        },
      },
      desktop: {
        template: 'sidebar',
        breakpoints: {
          grid: {
            '200': 4,
          },
        },
        product: {
          template: 'horizontal',
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
        },
        position: 'right',
        overlay: true,
        suggestions: {
          display: true,
        },
        productMatches: {
          display: true,
        },
      },
    },
    search: {
      disableAutoRequest: false,
      facets: {
        position: 'left',
        sticky: false,
        accordion: false,
        hidable: true,
        filters: {
          'custom_fields.color_variants': {
            type: 'text',
            label: 'color_variants',
            initiallyCollapsed: false,
            maxItemsCount: 6,
            precision: 0,
          },
          'custom_fields.type': {
            type: 'text',
            label: 'type',
            initiallyCollapsed: false,
            maxItemsCount: 6,
            precision: 0,
          },
          'custom_fields.price': {
            type: 'text',
            label: 'price',
            initiallyCollapsed: false,
            maxItemsCount: 6,
            precision: 0,
          },
          'custom_fields.size': {
            type: 'text',
            label: 'size',
            initiallyCollapsed: false,
            maxItemsCount: 6,
            precision: 0,
          },
          category: {
            type: 'category',
            label: 'category',
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
        },
      },
      breakpoints: {
        grid: {
          '400': 6,
          '600': 4,
          '1000': 3,
        },
      },
      defaultRequestParams: {
        limit: 24,
      },
    },
    content: {
      pagination: {
        type: 'lazy',
        autoLoadTimes: 2,
        step: 2,
      },
      scrollTop: {
        enabled: true,
        selector: '',
        offset: 0,
      },
      disableAutoRequest: false,
      defaultRequestParams: {
        limit: 24,
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
        },
      },
      breakpoints: {
        grid: {
          '400': 6,
          '600': 4,
          '1000': 3,
        },
      },
    },
    recommendations: {
      'product-findify-rec-6': {
        disableAutoRequest: false,
        breakpoints: {
          grid: {
            '400': 6,
            '600': 4,
            '1000': 3,
          },
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
          },
        },
        defaultRequestParams: {},
        enabled: true,
        slot: 'product-findify-rec-6',
        type: 'trending',
        template: 'slider',
        limit: 10,
        minResultsToShow: 1,
        title: 'asdf',
        multipleIds: true,
      },
      'custom-findify-rec-1': {
        disableAutoRequest: false,
        breakpoints: {
          grid: {
            '400': 6,
            '600': 4,
            '1000': 3,
          },
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
          },
        },
        defaultRequestParams: {},
        enabled: true,
        slot: 'custom-findify-rec-1',
        type: 'trending',
        template: 'slider',
        limit: 10,
        minResultsToShow: 1,
        title: 'trending',
        multipleIds: true,
      },
      'product-findify-rec-7': {
        disableAutoRequest: false,
        breakpoints: {
          grid: {
            '400': 6,
            '600': 4,
            '1000': 3,
          },
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
          },
        },
        defaultRequestParams: {},
        enabled: true,
        slot: 'product-findify-rec-7',
        type: 'trending',
        template: 'slider',
        limit: 10,
        minResultsToShow: 1,
        title: 'fdsa',
        multipleIds: true,
      },
      'product-findify-rec-8': {
        disableAutoRequest: false,
        breakpoints: {
          grid: {
            '400': 6,
            '600': 4,
            '1000': 3,
          },
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
          },
        },
        defaultRequestParams: {},
        enabled: true,
        slot: 'product-findify-rec-8',
        type: 'viewedBought',
        template: 'slider',
        limit: 10,
        minResultsToShow: 1,
        title: 'asedf',
        multipleIds: true,
      },
      'home-findify-rec-1': {
        disableAutoRequest: false,
        breakpoints: {
          grid: {
            '400': 6,
            '600': 4,
            '1000': 3,
          },
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
          },
        },
        defaultRequestParams: {},
        enabled: true,
        slot: 'home-findify-rec-1',
        type: 'viewed',
        template: 'slider',
        limit: 11,
        minResultsToShow: 3,
        title: 'Products you recently viewed',
        multipleIds: true,
      },
      'cart-findify-rec-3': {
        disableAutoRequest: false,
        breakpoints: {
          grid: {
            '400': 6,
            '600': 4,
            '1000': 3,
          },
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
          },
        },
        defaultRequestParams: {},
        enabled: true,
        slot: 'cart-findify-rec-3',
        type: 'purchasedTogether',
        template: 'slider',
        limit: 10,
        minResultsToShow: 2,
        title: 'Freq purch together: another widget',
        multipleIds: true,
      },
    },
  },
  merchantName: 'marek-test-store.myshopify.com',
  mjs_version: '7.0.0',
};

export default config;
