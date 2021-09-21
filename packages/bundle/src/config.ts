import { Config } from '@findify/store-configuration';

const config: Config = {
  sentryDisabled: true,
  key: 'c09c0768-0287-4794-9171-38f896a9f8c1',
  merchantId: 8533,
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
  collections: [],
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
    'autocomplete.placeholder': 'What are you looking for?',
    'range.up': '&amp; up',
    'range.under': 'Under',
  },
  features: {
    autocomplete: {
      instant: false,
      handleFormSubmit: true,
      enableTrendingSearches: true,
      renderIn: 'parent',
      defaultRequestParams: {
        limits: {
          suggestions: 10,
          products: 10,
          'shopify-collection_985': 10,
          'shopify-blog_984': 10,
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
        overlay: false,
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
          ['suggestions', 'shopify-blog_984'],
          ['shopify-collection_985'],
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
          'shopify-blog_984': {
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
          'shopify-collection_985': {
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
        template: 'dropdown',
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
              value: '3|9',
            },
          ],
          products: [
            {
              width: 0,
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
        position: 'right',
        overlay: false,
        suggestions: {
          display: true,
          limit: 6,
          template: 'vertical',
        },
        productMatches: {
          display: true,
          limit: 4,
        },
        layout: [['suggestions', 'shopify-collection_985'], ['products']],
        products: {
          limit: 4,
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
          'shopify-collection_985': {
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
          'shopify-blog_984': {
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
        type: 'static',
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
    },
    recommendations: {},
  },
  merchantName: 'test-content-search-store.myshopify.com',
  mjs_version: '7.0.33',
};

export default config;
