import { Config } from '@findify/store-configuration';

const config: Config = {
  key: 'afc48014-1778-4e72-aa47-f6160c30c565',
  merchantId: 8472,
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
    '#home-findify-rec-3': 'recommendation',
  },
  currency: {
    code: 'USD',
    decimalDigits: 2,
    decimalSeparator: '.',
    spaceBetweenAmountAndSymbol: false,
    symbol: '$',
    symbolOnLeft: true,
    thousand: ',',
  },
  collections: ['collections/test-collection'],
  stickers: {
    discount: false,
    outOfStock: false,
  },
  colorMapping: {
    Green: '#00ff00',
    Blue: '#0000ff',
    Black: '#000000',
    White: '#ffffff',
    Grey: '#cccccc',
    Red: '#ff0000',
  },
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
      "Oh no! Your search for %s did not match any products.<br/>But don't give up, we're here to help you find what you're looking for.",
    'zeroresults.noResultsFound':
      'We can\'t seem to find any products that match your search for "%s"',
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
    'autocomplete.viewAll': 'View all results',
    'autocomplete.placeholder': 'What are you looking for?',
  },
  features: {
    autocomplete: {
      instant: false,
      handleFormSubmit: true,
      enableTrendingSearches: true,
      renderIn: 'body',
      defaultRequestParams: {
        suggestion_limit: 10,
        item_limit: 4,
      },
      mobile: {
        template: 'sidebar',
        position: 'left',
        breakpoints: {
          grid: [
            {
              width: 400,
              value: 8,
            },
          ],
          layout: [
            {
              width: 0,
              value: 12,
            },
          ],
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
            display: true,
            template: 'select',
          },
          image: {
            aspectRatio: 1,
            lazy: false,
            lazyOffset: 0,
          },
        },
        overlay: false,
        suggestions: {
          display: true,
          template: 'horizontal',
        },
        productMatches: {
          display: true,
        },
      },
      desktop: {
        template: 'fullscreen',
        breakpoints: {
          grid: [
            {
              width: 1100,
              value: 2,
            },
            {
              width: 1300,
              value: 4,
            },
          ],
          layout: [
            {
              width: 0,
              value: 'fit|auto',
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
            display: true,
            template: 'select',
          },
          image: {
            aspectRatio: 1,
            lazy: false,
            lazyOffset: 0,
          },
        },
        position: 'left',
        overlay: false,
        suggestions: {
          display: true,
          template: 'vertical',
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
        sticky: true,
        accordion: true,
        hidable: true,
        filters: {
          brand: {
            type: 'text',
            label: 'Brand',
            initiallyCollapsed: true,
            maxItemsCount: 4,
            precision: 0,
          },
          color: {
            type: 'color',
            label: 'Color 2',
            initiallyCollapsed: true,
            maxItemsCount: 4,
            precision: 0,
          },
          size: {
            type: 'text',
            label: 'Size',
            initiallyCollapsed: true,
            maxItemsCount: 4,
            precision: 0,
          },
          price: {
            type: 'price',
            label: 'Price',
            initiallyCollapsed: true,
            maxItemsCount: 4,
            precision: 0,
          },
          category: {
            type: 'category',
            label: 'Category',
            initiallyCollapsed: true,
            maxItemsCount: 4,
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
          {
            field: 'shopify_images_url',
            order: 'desc',
            label: 'Test Sorting',
          },
        ],
      },
      pagination: {
        type: 'static',
        autoLoadTimes: 3,
        step: 2,
      },
      product: {
        template: 'vertical',
        price: {
          template: 'min-max',
        },
        title: {
          lines: 1,
        },
        description: {
          lines: 3,
        },
        variants: {
          display: true,
          template: 'select',
        },
        image: {
          aspectRatio: 0,
          lazy: true,
          lazyOffset: 0,
          multiple: true,
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
            value: 3,
          },
          {
            width: 1000,
            value: 4,
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
          lines: 1,
        },
        description: {
          lines: 3,
        },
        variants: {
          display: true,
          template: 'select',
        },
        image: {
          aspectRatio: 1,
          lazy: true,
          lazyOffset: 0,
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
            value: 3,
          },
          {
            width: 1000,
            value: 4,
          },
        ],
        layout: [
          {
            width: 0,
            value: 'fit|auto',
          },
        ],
      },
    },
    recommendations: {
      'home-findify-rec-3': {
        disableAutoRequest: false,
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
        slot: 'home-findify-rec-3',
        type: 'newest',
        template: 'slider',
        title: 'Newest products',
        multipleIds: true,
      },
    },
  },
  merchantName: 'findify-dev-store.myshopify.com',
  mjs_version: '7.0.8',
};

export default config;
