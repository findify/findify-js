import { Config } from '@findify/store-configuration';

const config: Config = {
  key: '3f50502d-4c0f-4d90-be7b-d1db0f1ad953',
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
  collections: [],
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
      "Oh no! Your search for <span class=\"findify-query\"></span> did not match any products.<br/>But don't give up, we're here to help you find what you're looking for.",
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
    'autocomplete.viewAll': 'View all results for',
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
        overlay: false,
        suggestions: {
          display: true,
          template: 'vertical',
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
          template: 'horizontal',
        },
        productMatches: {
          display: true,
        },
      },
    },
    search: {
      disableAutoRequest: false,
      facets: {
        position: 'right',
        sticky: true,
        accordion: true,
        hidable: true,
        filters: {
          brand: {
            type: 'text',
            label: 'Brand',
            initiallyCollapsed: true,
            maxItemsCount: 6,
            precision: 0,
          },
          color: {
            type: 'color',
            label: 'Color',
            initiallyCollapsed: true,
            maxItemsCount: 6,
            precision: 0,
          },
          size: {
            type: 'text',
            label: 'Size',
            initiallyCollapsed: true,
            maxItemsCount: 6,
            precision: 0,
          },
          price: {
            type: 'price',
            label: 'Price',
            initiallyCollapsed: true,
            maxItemsCount: 6,
            precision: 0,
          },
          category: {
            type: 'category',
            label: 'Category',
            initiallyCollapsed: true,
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
          {
            field: 'shopify_images_url',
            order: 'desc',
            label: 'Test Sorting',
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
          template: 'to-max',
        },
        title: {
          lines: 3,
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
          template: 'to-max',
        },
        title: {
          lines: 3,
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
  merchantName: 'findify-dev-store.myshopify.com',
  mjs_version: '7.0.7',
  components: {
    uW8t: function (m, e, r) {
      Object.defineProperty(e, '__esModule', {
        value: true,
      });

      function _interop(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};

          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc =
                  Object.defineProperty && Object.getOwnPropertyDescriptor
                    ? Object.getOwnPropertyDescriptor(obj, key)
                    : {};

                if (desc.get || desc.set) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
          }

          newObj.default = obj;
          return newObj;
        }
      }

      function __imp(p, n) {
        try {
          return _interop(r(p));
        } catch (e) {
          console.error('[Devtools]: Module "' + n + '" was not found!');
        }
      }

      var _i0 = __imp('JgyH', 'classnames');

      var _i1 = __imp('9SzA', 'components/common/Image');

      var _i2 = __imp('oklL', 'components/Cards/Product/Rating');

      var _i3 = __imp('4jvE', 'components/Cards/Product/Price');

      var _i4 = __imp('iF0m', 'components/Cards/Product/Title');

      var _i5 = __imp('/K0v', 'components/Cards/Product/Description');

      var _i6 = __imp('Pr0S', 'components/Cards/Product/Variants');

      var _i7 = __imp('RkLw', 'components/Cards/Product/styles.css');

      var _i8 = __imp('ObWi', 'components/Cards/Product/Stickers');

      var _i9 = __imp('gNLg', 'immutable');

      var _i10 = __imp('/UHw', 'helpers/trackProductPosition');

      var _i11 = __imp('APSE', 'react/jsx-runtime');

      var _jsx = _i11['jsx'];
      var _jsxs = _i11['jsxs'];

      /**
       * @module components/Cards/Product
       */
      var cx = _i0.default;
      var Image = _i1.default;
      var Rating = _i2.default;
      var Price = _i3.default;
      var Title = _i4.default;
      var Description = _i5.default;
      var Variants = _i6.default;
      var styles = _i7.default;
      var DiscountSticker = _i8['DiscountSticker'];
      var OutOfStockSticker = _i8['OutOfStockSticker'];
      var List = _i9['List'];
      var trackProductPosition = _i10.default;
      console.log('Product card updated 2');

      e.default = function (_ref) {
        var item = _ref.item,
          _ref$theme = _ref.theme,
          theme = _ref$theme === void 0 ? styles : _ref$theme,
          className = _ref.className,
          config = _ref.config,
          _ref$Container = _ref.Container,
          Container = _ref$Container === void 0 ? 'div' : _ref$Container;
        var container = trackProductPosition(item);
        return; /*#__PURE__*/
        _jsxs(Container, {
          ref: container,
          className: cx(theme.root, theme[config.get('template')], className),
          children: [
            /*#__PURE__*/
            _jsxs('div', {
              className: theme.content,
              children: [
                !!item.getIn(['reviews', 'count']) ||
                !!item.getIn(['reviews', 'total_reviews']) /*#__PURE__*/
                  ? _jsx(Rating, {
                      className: theme.rating,
                      value: item.getIn(['reviews', 'average_score']),
                      count:
                        item.getIn(['reviews', 'count']) ||
                        item.getIn(['reviews', 'total_reviews']),
                    })
                  : null /*#__PURE__*/,
                _jsx(Variants, {
                  config: config,
                  item: item,
                }),
                !!item.get('title') /*#__PURE__*/
                  ? _jsx(Title, {
                      theme: theme,
                      onClick: item.onClick,
                      href: item.get('product_url'),
                      text: item.get('title'),
                    })
                  : null,
                !!item.get('description') /*#__PURE__*/
                  ? _jsx(Description, {
                      theme: theme,
                      text: item.get('description'),
                    })
                  : null /*#__PURE__*/,
                _jsx('div', {
                  className: theme.divider,
                }),
                !!item.get('price') /*#__PURE__*/
                  ? _jsx(Price, {
                      className: theme.priceWrapper,
                      item: item,
                    })
                  : null,
                item.getIn(['stickers', 'out-of-stock']) /*#__PURE__*/
                  ? _jsx(OutOfStockSticker, {
                      config: config,
                    })
                  : null,
              ],
            }) /*#__PURE__*/,
            _jsxs('div', {
              className: theme.image,
              onClick: item.onClick,
              children: [
                /*#__PURE__*/
                _jsx(Image, {
                  aspectRatio: config.getIn(['image', 'aspectRatio']),
                  thumbnail: item.get('thumbnail_url'),
                  src: item.get('image_url') || item.get('thumbnail_url'),
                  alt: item.get('title'),
                  lazy: config.getIn(['image', 'lazy']),
                  offset: config.getIn(['image', 'lazyOffset']),
                }),
                config.getIn(['stickers', 'discount']) &&
                item.get('discount', List()).size &&
                item.getIn(['stickers', 'discount']) /*#__PURE__*/
                  ? _jsx(DiscountSticker, {
                      config: config,
                      className: theme.discountSticker,
                      discount: item.get('discount'),
                    })
                  : null,
              ],
            }),
          ],
        });
      };
    },
  },
};

export default config;
