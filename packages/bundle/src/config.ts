export default process.env.NODE_ENV !== 'development'
? __CONFIG__
: {
       // Merchant API KEY
       "key": "680d373d-06b3-442b-bebc-d35a5b0868b3",

       // Show/Hide "Powered by findify badge"
       "poweredByFindify": true,

       hidableFacets: true,

       // Specific platform code
       "platform": {
           "shopify": true,
           // "bigcommerce": true
       },

       // Merchant status - will disable features, but send analytics
       "status": "live",

       analytics: {
           'view-page': false
       },

       // If window width gte than this number - view will be changed
       "mobileBreakpoint": 700,

       // History setup
       "location": {
           // Define search url, autocomplete will redirect to this URL
           "searchUrl": "/pages/search-results",

           // Search query prefix eq(?findify_q)
           "prefix": "findify"
       },

       // Element:Feature
       "selectors": {
           "input[name='fq']": "autocomplete",
           "#findify_results": "search",
           "#home-findify-rec-2": "recommendations",
           "#product-findify-rec-1": "recommendations",
           "#category-findify-rec-1": "recommendations",
           "#product-findify-rec-4": "recommendations",
           "#product-findify-rec-2": "recommendations",
           "#cart-findify-rec-1": "recommendations",
           "#cart-findify-rec-2": "recommendations",
           "#cart-findify-rec-3": "recommendations",
           "#home-findify-rec-3": "recommendations",
           "#product-findify-rec-5": "recommendations"
       },

       // Currency setup
       "currency": {
           "code": "GBP"
           // symbol: '$',
           // thousandsSeparator: ',',
           // decimalSeparator: '.',
           // symbolOnLeft: true,
           // spaceBetweenAmountAndSymbol: false,
           // decimalDigits: 2
       },

       // Features configuration will be pulled and marged with the root lvl
       "features": {
           "autocomplete": {
               // Disable listening for closest form submit
               "disableFormSubmit": false,

               "trendingSearchesDisabled": false,

               // Where it should be rended: parent|self|body
               "renderIn": "parent",

               // dropdown: to invoke usual dropdown behaviour
               // sidebar: to use sidebar as search component
               // fullscreen: to use fullscreen view for searching
               "viewType": "dropdown",
               "mobileViewType": "sidebar",
               // Order of content
               "viewOrder": ["SearchSuggestions", "ProductMatches"],

               // Where to align autocomplete: left|right|undefined
               "position": undefined,

               // Will be added to all requests eq: Agent.defaults(meta)
               "meta": {
                   "item_limit": 4,
                   "suggestion_limit": 10
               },

               // Product setup
               "product": {
                   "title": {
                       "display": true,
                       "lines": 3
                   },
                   "price": {
                     "display": true,
                   },
                   "i18n": {
                       "colorsAvailable": "Colours available"
                   },
                   "image": {
                       // Image aspect ratio
                       "aspectRatio": 1.2
                   },
                   "stickers": {
                     "display": false,
                   }
               },
               "i18n": {
                   "suggestionsTitle": "Suggestions",
                   "productMatchesTitle": "Product matches",
                   "tipResults": "View all results for query",
                   "tipTrending": "Sorry, we can't find any suggestions. Press enter to search for",
                   "viewMore": "View all",
                   "trendingSearches": "Trending searches",
                   "trendingProducts": "Trending products"
               },
               "showOverlay": true,
           },

           "search": {
               // Fallback recommendation type
               "zeroResultsType": "trending",

               // Search results setup
               "view": {
                   "pagination": false,
                   "infinite": true,
                   "stickyFilters": false
               },

               // Should scroll to value after new data was received
               "scrollTop": 0,
               "cssSelector": ".site-header",

               // Will be added to all requests eq: Agent.defaults(meta)
               "meta": {
                   "limit": 24
               },

               // Product setup
               "product": {
                   "price": {
                     "display": true
                   },
                   "title": {
                       "display": true,
                       "lines": 3
                   },
                   "reviews": {
                     "display": true,
                   },
                   "i18n": {
                       "productVariantsAvailable": "Available in %s variants",
                   },
                   "variants": {
                     "display": true
                   },
                   "image": {
                     "aspectRatio": .75
                   },
                   "stickers": {
                     "display": true,
                   }
               },
               "sorting": {
                   "options": [{
                       "field": "default",
                       "order": ""
                   }, {
                       "field": "price",
                       "order": "desc"
                   }, {
                       "field": "price",
                       "order": "asc"
                   }, {
                       "field": "created_at",
                       "order": "desc"
                   }],
                   "i18n": {
                       "title": "Sort by",
                       "options": {
                           "default": "Popularity",
                           "price|desc": "Price: High to low",
                           "price|asc": "Price: Low to high",
                           "created_at|desc": "What's new"
                       }
                   }
               },

               "pagination": {
                   "step": 2,
                   "i18n": {
                       "previous": "Prev",
                       "next": "Next"
                   }
               },

               "loadMore": {
                   "lazyLoadCount": 2,
                   "i18n": {
                       "loadMore": "Load more",
                       "loadPrev": "Load previous"
                   }
               },

               "i18n": {
                   "sorryNoResults": "Sorry!",
                   "noResultsFound": "We can't seem to find any products that match your search for <span class=\"findify_q\">\"%s\"</span>",
                   "noResultEmptyQuery": "We can't seem to find any products that match your search",
                   "tryOneOfThese": "Try one of these instead:",
                   "checkOutPopularProducts": "Or check out some of these popular products"
               },

               "breadcrumbs": {
                   "i18n": {
                       "showingEmpty": "Showing %s results",
                       "showing": "Showing %s results for",
                       "noQuery": "Showing all products. Use filters to refine your search.",
                       "partialMatch": "Showing results that partially match instead.",
                       "zeroResultsFor": "0 results for"
                   }
               },

               // Facets setup
               "facets": {
                   "initiallyClosed": true,
                   // Map Facet name to facet type
                   "types": {
                       "price": "price",
                       "reviews.average_score": "rating",
                       "color": "color"
                   },
                   "labels": {
                       "custom_fields.cf_accessory_colour": "Accessory Colour",
                       "custom_fields.cf_accessory_fibre": "Accessory Fibre",
                       "custom_fields.cf_accessory_length": "Accessory Length",
                       "custom_fields.cf_accessory_material": "Accessory Material",
                       "custom_fields.cf_accessory_size": "Accessory Size",
                       "custom_fields.cf_accessory_type": "Accessory Type",
                       "custom_fields.cf_book_pattern_for": "Book For",
                       "custom_fields.cf_accessory_style": "Accessory Style",
                       "custom_fields.cf_accessory_width": "Accessory Width",
                       "custom_fields.cf_book_type": "Book Type",
                       "custom_fields.cf_button_collection": "Button Collection",
                       "custom_fields.cf_kit_collection": "Kit Collection",
                       "price": "Price",
                       "custom_fields.cf_kit_type": "Kit Type",
                       "custom_fields.cf_minerva_category": "Minerva Category",
                       "custom_fields.cf_needle_collection": "Needle Collection",
                       "seller": "Seller",
                       "condition": "Condition",
                       "custom_fields.barcode": "Barcode",
                       "custom_fields.cf_needle_size": "Needle Size",
                       "custom_fields.cf_needle_weight": "Needle Weight",
                       "custom_fields.cf_pattern_collection": "Pattern Collection",
                       "custom_fields.cf_pattern_pattern_for": "Pattern For",
                       "custom_fields.cf_pattern_type": "Pattern Type",
                       "custom_fields.cf_thread_colour": "Thread Colour",
                       "custom_fields.cf_thread_type": "Thread Type",
                       "custom_fields.cf_yarn_collection": "Yarn Collection",
                       "custom_fields.pattern_difficulty": "pattern_difficulty",
                       "custom_fields.new_brand": "Brand",
                       "custom_fields.cf_thread_collection": "Thread Collection",
                       "custom_fields.cf_thread_length": "Thread Length",
                       "custom_fields.cf_thread_yarn_thickness": "Thread Thickness",
                       "custom_fields.cf_pattern_style": "Pattern Style",
                       "custom_fields.cf_kit_colour": "Kit Colour",
                       "custom_fields.cf_kit_size": "Kit Size",
                       "custom_fields.custom_created_at": "Created At",
                       "color": "Colour",
                       "size": "Size",
                       "custom_fields.cf_needle_length": "Needle Length",
                       "custom_fields.cf_needle_material": "Needle Material",
                       "custom_fields.cf_pattern_yarn_thickness": "Pattern By Yarn Thickness",
                       "custom_fields.cf_thread_fibre": "Thread Fibre",
                       "custom_fields.cf_accessory_collection": "Accessory Collection",
                       "custom_fields.cf_yarn_fibre": "Yarn Fibre",
                       "custom_fields.cf_accessory_shape": "Accessory Shape",
                       "custom_fields.cf_accessory_weight": "Accessory Weight",
                       "custom_fields.cf_book_collection": "Book Collection",
                       "custom_fields.cf_book_style": "Book Style",
                       "custom_fields.cf_book_yarn_thickness": "Book By Yarn Thickness",
                       "custom_fields.cf_button_colour": "Button Colour",
                       "custom_fields.cf_button_material": "Button Material",
                       "custom_fields.сf_button_shape": "Button Shape",
                       "custom_fields.cf_button_size": "Button Size",
                       "custom_fields.cf_button_type": "Button Type",
                       "custom_fields.cf_kit_style": "Kit Style",
                       "custom_fields.cf_kit_pattern_for": "Kit For",
                       "tags": "Tags",
                       "reviews.average_score": "Avg. customer rating",
                       "brand": "Vendor",
                       "discount": "Discount",
                       "custom_fields.cf_minerva_subcategory": "Minerva Sub Category",
                       "custom_fields.cf_sale_tag": "Sale Tag",
                       "custom_fields.cf_yarn_length": "Yarn Length",
                       "custom_fields.cf_yarn_weight": "Yarn Weight",
                       "custom_fields.cf_yarn_type": "Yarn Type",
                       "custom_fields.cf_yarn_colour": "Yarn Colour",
                       "custom_fields.old_colors": "Old Colors",
                       "custom_fields.seasonal_collection": "seasonal_collection",
                       "custom_fields.length": "Length",
                       "custom_fields.cf_needle_type": "Needle Type",
                       "custom_fields.cf_pattern_size": "Pattern Size",
                       "custom_fields.cf_yarn_thickness": "Yarn Thickness",
                       "availability": "availability",
                       "created_at": "created_at",
                       "sku": "sku",
                       "category": "Category",
                       "material": "Material",
                       "custom_fields.variant_image_url": "Variant Image Url",
                       "id": "id",
                       "custom_fields.select pattern format": "Select Pattern Format",
                       "custom_fields.width": "Width",
                       "custom_fields.cf_needle_colour": "Needle Colour",
                       "description": "description",
                       "title": "title",
                       "category.category1": "category.category1",
                       "category.category2": "category.category2",
                       "category.category3": "category.category3",
                       "category.category4": "category.category4",
                       "variants_ids": "variants_ids",
                       "image_url": "image_url",
                       "thumbnail_url": "thumbnail_url",
                       "product_url": "product_url",
                       "category_str": "category_str",
                       "short_description": "short description"
                   },
                   "category": {
                       // Should be expanded by default or not
                       // "initiallyClosed": false,
                       "i18n": {
                           "goBackTitle": "All Categories",
                           "more": "More",
                           "less": "Less"
                       }
                   },
                   "text": {
                       // How many item to show when collapsed
                       "maxItemsCount": 6,
                       // "initiallyClosed": false,
                       "i18n": {
                           "more": "More",
                           "less": "Less",
                           "search": "Search"
                       }
                   },
                   "price": {
                       "i18n": {
                           "submit": "go",
                           "under": "Under",
                           "up": "&amp; up"
                       }
                   },
                   "rating": {
                       "i18n": {
                           "submit": "go",
                           "under": "Under",
                           "up": "&amp; up"
                       }
                   },
                   "range": {
                       "i18n": {
                           "submit": "go",
                           "under": "Under",
                           "up": "&amp; up"
                       }
                   },
                   "i18n": {
                       "showMobileFacets": "Filters",
                       "more": "More",
                       "less": "Less",
                       "resetAll": "Clear all",
                       "reset": "Clear",
                       "done": "Done",
                       "showResults": "See results",
                       "hideFilters": "Exit filters",
                       "ok": "Ok",
                       "backToFilters": "Back to menu",
                       "search": "Search",
                       "filters": "Filters",
                       "clearAll": 'Clear all'
                   },
                   "color": {
                       "mapping": {
                           "dark yellow": "#FF0",
                           "beige": "#E9E1D6",
                           "black": "#111",
                           "cream": "#F5EFD3",
                           "dark brown": "#7E6645",
                           "dark green": "#466534",
                           "dark grey": "#777",
                           "dark orange": "#ff7f00",
                           "dark pink": "#ff6eb4",
                           "dark purple": "#8b4789",
                           "dark red": "#cd0000",
                           "gold": "#FED466",
                           "ivory": "#FCFFEE",
                           "light green": "#C8DCBC",
                           "light orange": "#FFB973",
                           "light pink": "#ffb6c1",
                           "light purple": "#c9b1f9",
                           "medium blue": "#BAC6DE",
                           "medium brown": "#cd661d",
                           "light yellow": "#FFFFBF",
                           "white": "#FFF",
                           "clear": "#F9F9F9",
                           "light red": "#ff4c4c",
                           "medium green": "#7EAD63",
                           "medium grey": "#7f7f7f",
                           "medium orange": "#FF8000",
                           "medium purple": "#8E89C9",
                           "medium red": "#FF2626",
                           "medium yellow": "#FFFF73",
                           "multicolor": "multicolor",
                           "navy blue": "#3F5585",
                           "other": "#000",
                           "pink": "#FFC0CB",
                           "silver": "#EEE",
                           "teal": "#008080",
                           "turquoise": "#03B8AF",
                           "wine": "#600"
                       }
                   }
               }
           },
           "recommendations": {
               "#home-findify-rec-2": {
                   "enabled": true,
                   "slot": "home-findify-rec-2",
                   "type": "trending",
                   "template": "slider",
                   "limit": 10,
                   "multipleIds": false,
                   "minResultsToShow": 4,
                   "product": {
                       "title": {
                           "display": true,
                           "lines": 3
                       },
                       "rating": {
                           "display": true
                       },
                       "description": {
                           "display": false
                       },
                       "price": {
                           "display": true
                       },
                       "stickers": {
                           "display": true
                       },
                       "variants": {
                           "display": false
                       },
                       "availability": {
                           "display": false
                       },
                       "i18n": {
                           "colorsAvailable": "Colours available"
                       }
                   },
                   "title": "Our Most Popular Products"
               },
               "#product-findify-rec-1": {
                   "enabled": true,
                   "slot": "product-findify-rec-1",
                   "type": "latest",
                   "template": "slider",
                   "limit": 10,
                   "multipleIds": false,
                   "minResultsToShow": 3,
                   "product": {
                       "title": {
                           "display": true,
                           "lines": 3
                       },
                       "rating": {
                           "display": true
                       },
                       "description": {
                           "display": false
                       },
                       "price": {
                           "display": true
                       },
                       "stickers": {
                           "display": true
                       },
                       "variants": {
                           "display": false
                       },
                       "availability": {
                           "display": false
                       },
                       "i18n": {
                           "colorsAvailable": "Colours available"
                       }
                   },
                   "title": "Recently Viewed Products"
               },
               "#category-findify-rec-1": {
                   "enabled": true,
                   "slot": "category-findify-rec-1",
                   "type": "latest",
                   "template": "slider",
                   "limit": 10,
                   "multipleIds": false,
                   "minResultsToShow": 3,
                   "product": {
                       "title": {
                           "display": true,
                           "lines": 3
                       },
                       "rating": {
                           "display": true
                       },
                       "description": {
                           "display": false
                       },
                       "price": {
                           "display": true
                       },
                       "stickers": {
                           "display": true
                       },
                       "variants": {
                           "display": false
                       },
                       "availability": {
                           "display": false
                       },
                       "i18n": {
                           "colorsAvailable": "Colours available"
                       }
                   },
                   "title": "Recently Viewed Products"
               },
               "#product-findify-rec-4": {
                   "enabled": true,
                   "slot": "product-findify-rec-4",
                   "type": "purchasedTogether",
                   "template": "slider",
                   "limit": 10,
                   "multipleIds": false,
                   "minResultsToShow": 3,
                   "product": {
                       "title": {
                           "display": true,
                           "lines": 3
                       },
                       "rating": {
                           "display": true
                       },
                       "description": {
                           "display": false
                       },
                       "price": {
                           "display": true
                       },
                       "stickers": {
                           "display": true
                       },
                       "variants": {
                           "display": false
                       },
                       "availability": {
                           "display": false
                       },
                       "i18n": {
                           "colorsAvailable": "Colours available"
                       }
                   },
                   "title": "Frequently Bought Together"
               },
               "#product-findify-rec-2": {
                   "enabled": true,
                   "slot": "product-findify-rec-2",
                   "type": "viewed",
                   "template": "slider",
                   "limit": 10,
                   "multipleIds": false,
                   "minResultsToShow": 3,
                   "product": {
                       "title": {
                           "display": true,
                           "lines": 3
                       },
                       "rating": {
                           "display": true
                       },
                       "description": {
                           "display": false
                       },
                       "price": {
                           "display": true
                       },
                       "stickers": {
                           "display": true
                       },
                       "variants": {
                           "display": false
                       },
                       "availability": {
                           "display": false
                       },
                       "i18n": {
                           "colorsAvailable": "Colours available"
                       }
                   },
                   "title": "Customers Who Viewed This Also Viewed"
               },
               "#cart-findify-rec-1": {
                   "enabled": true,
                   "slot": "cart-findify-rec-1",
                   "type": "latest",
                   "template": "slider",
                   "limit": 10,
                   "multipleIds": false,
                   "minResultsToShow": 3,
                   "product": {
                       "title": {
                           "display": true,
                           "lines": 3
                       },
                       "rating": {
                           "display": true
                       },
                       "description": {
                           "display": false
                       },
                       "price": {
                           "display": true
                       },
                       "stickers": {
                           "display": true
                       },
                       "variants": {
                           "display": false
                       },
                       "availability": {
                           "display": false
                       },
                       "i18n": {
                           "colorsAvailable": "Colours available"
                       }
                   },
                   "title": "Recently Viewed Products"
               },
               "#cart-findify-rec-2": {
                   "enabled": true,
                   "slot": "cart-findify-rec-2",
                   "type": "trending",
                   "template": "slider",
                   "limit": 10,
                   "multipleIds": false,
                   "minResultsToShow": 3,
                   "product": {
                       "title": {
                           "display": true,
                           "lines": 3
                       },
                       "rating": {
                           "display": true
                       },
                       "description": {
                           "display": false
                       },
                       "price": {
                           "display": true
                       },
                       "stickers": {
                           "display": true
                       },
                       "variants": {
                           "display": false
                       },
                       "availability": {
                           "display": false
                       },
                       "i18n": {
                           "colorsAvailable": "Colours available"
                       }
                   },
                   "title": "Our Most Popular Products"
               },
               "#cart-findify-rec-3": {
                   "enabled": true,
                   "slot": "cart-findify-rec-3",
                   "type": "purchasedTogether",
                   "template": "slider",
                   "limit": 10,
                   "multipleIds": true,
                   "minResultsToShow": 3,
                   "product": {
                       "title": {
                           "display": true,
                           "lines": 3
                       },
                       "rating": {
                           "display": true
                       },
                       "description": {
                           "display": false
                       },
                       "price": {
                           "display": true
                       },
                       "stickers": {
                           "display": true
                       },
                       "variants": {
                           "display": false
                       },
                       "availability": {
                           "display": false
                       },
                       "i18n": {
                           "colorsAvailable": "Colours available"
                       }
                   },
                   "title": "Frequently Bought Together"
               },
               "#home-findify-rec-3": {
                   "enabled": true,
                   "slot": "home-findify-rec-3",
                   "type": "newest",
                   "template": "slider",
                   "limit": 10,
                   "multipleIds": false,
                   "minResultsToShow": 4,
                   "product": {
                       "title": {
                           "display": true,
                           "lines": 3
                       },
                       "rating": {
                           "display": true
                       },
                       "description": {
                           "display": false
                       },
                       "price": {
                           "display": true
                       },
                       "stickers": {
                           "display": true
                       },
                       "variants": {
                           "display": false
                       },
                       "availability": {
                           "display": false
                       },
                       "i18n": {
                           "colorsAvailable": "Colours available"
                       }
                   },
                   "title": "Newest Arrivals"
               },
               "#product-findify-rec-5": {
                   "enabled": true,
                   "slot": "product-findify-rec-5",
                   "type": "trending",
                   "template": "slider",
                   "limit": 999,
                   "multipleIds": false,
                   "minResultsToShow": 1,
                   "product": {
                       "title": {
                           "display": true,
                           "lines": 3
                       },
                       "rating": {
                           "display": true
                       },
                       "description": {
                           "display": false
                       },
                       "price": {
                           "display": true
                       },
                       "stickers": {
                           "display": true
                       },
                       "variants": {
                           "display": false
                       },
                       "availability": {
                           "display": false
                       },
                       "i18n": {
                           "colorsAvailable": "Colours available"
                       }
                   },
                   "title": "Related Patterns"
               }
           }
       },
       "stickers": {
           "out-of-stock": {
               "template": "Temporarily out of stock"
           }
       },
       "frameDisabled": true,
       "useSimpleLoader": false,
       "collections": ["collections/baseball", "collections/wendy-on-sale", "collections/accessories-on-sale", "collections/merino-yarn", "collections/needles-on-sale", "collections/peter-pan-yarn", "collections/chunky-yarn", "collections/schoppel-wolle-yarn", "collections/2-ply-yarn", "collections/dmc-yarn", "collections/robin-yarn", "collections/sirdar-yarn", "collections/wendy-yarn", "collections/cotton-yarn", "collections/hayfield-yarn", "collections/mohair-yarn", "collections/rico-yarn", "collections/sublime-yarn", "collections/wool-yarn", "collections/myboshi-yarn", "collections/king-cole-yarn", "collections/silk-yarn", "collections/fashion-yarn", "collections/twilleys-of-stamford", "collections/king-cole-on-sale", "collections/aran-yarn", "collections/yarn-on-sale", "collections/nylon-yarn", "collections/polyester-yarn", "collections/linen-yarn", "collections/budget-yarn", "collections/bamboo-yarn", "collections/sparkly-yarn", "collections/scarf-yarn", "collections/variegated-yarn", "collections/sock-yarn", "collections/natural-fibres-yarn", "collections/luxury-yarn", "collections/summer-yarn", "collections/felting-yarn", "collections/crochet-yarn", "collections/colour-packs", "collections/acrylic-yarn", "collections/cashmere-yarn", "collections/llama-yarn", "collections/go-handmade-patterns", "collections/king-cole-patterns", "collections/baby-yarn", "collections/2-ply-patterns", "collections/chunky-patterns", "collections/erika-knight-patterns", "collections/peter-pan-patterns", "collections/sirdar-patterns", "collections/sublime-patterns", "collections/wendy-patterns", "collections/womans-weekly-exclusive-patterns", "collections/welcome10", "collections/lace-patterns", "collections/super-chunky-patterns", "collections/baby-patterns", "collections/childrens-patterns", "collections/home-patterns", "collections/aran-patterns", "collections/3-ply-patterns", "collections/dk-patterns-1", "collections/4-ply-patterns", "collections/mens-patterns", "collections/ladies-patterns", "collections/vintage-patterns", "collections/all-patterns-books", "collections/boye-needles-hooks", "collections/case-needles-hooks", "collections/clover-needles-hooks", "collections/hobby-gift-needles-hooks", "collections/knit-pro-needles-hooks", "collections/pony-needles-hooks", "collections/single-point-needles", "collections/double-point-needles", "collections/crochet-hooks", "collections/cable-needles", "collections/needle-and-hook-sets", "collections/intermediate-patterns-1", "collections/circular-needles", "collections/free-patterns", "collections/beginner-patterns", "collections/bamboo-needles", "collections/advanced-patterns", "collections/addi-needles-hooks", "collections/prym-needles-hooks", "collections/interchangeable-needles", "collections/toy-patterns", "collections/free-knitting-patterns", "collections/storage-bags", "collections/crochet-kits", "collections/needles-hooks", "collections/knitting-kits", "collections/kitazine", "collections/needle-cases", "collections/yarn-holders", "collections/motifs", "collections/patches", "collections/sale", "collections/knitting-patterns-all", "collections/free-crochet-patterns", "collections/wood-needles-hooks", "collections/knitting-buttons", "collections/ribbons-trims", "collections/storage-boxes", "collections/metal-needles-hooks", "collections/plastic-needles-hooks", "collections/knitting-storage", "collections/patterns", "collections/dmc-patterns", "collections/knitting-books", "collections/stylecraft-on-sale", "collections/hayfield-on-sale", "collections/prym-on-sale", "collections/patterns-on-sale", "collections/hooks-on-sale", "collections/alpaca-yarn", "collections/erika-knight-yarn", "collections/lang-yarn", "collections/loweth-yarn", "collections/hayfield-patterns", "collections/pets-patterns", "collections/crochet-threads", "collections/yellow-yarn", "collections/white-yarn", "collections/purple-yarn", "collections/pink-yarn", "collections/red-yarn", "collections/orange-yarn", "collections/multicoloured-yarn", "collections/grey-yarn", "collections/green-yarn", "collections/cream-yarn", "collections/brown-yarn", "collections/blue-yarn", "collections/black-yarn", "collections/knooking", "collections/go-handmade-products", "collections/craft-factory-on-sale", "collections/wendy-products", "collections/sublime-products", "collections/stylecraft-products", "collections/sirdar-products", "collections/king-cole-products", "collections/hayfield-products", "collections/dmc-products", "collections/robin-products", "collections/rico-products", "collections/peter-pan-products", "collections/loweth-products", "collections/erika-knight-products", "collections/sirdar-on-sale", "collections/hobby-gift-on-sale", "collections/sale-50-percent-off", "collections/sale-40-percent-off", "collections/sale-30-percent-off", "collections/sale-20-percent-off", "collections/sale-10-percent-off", "collections/yarn", "collections/christmas", "collections/stylecraft-yarn", "collections/super-chunky-and-chunky-yarns", "collections/all-accessories", "collections/stylecraft-patterns", "collections/super-chunky-yarn", "collections/dk-yarn", "collections/3-ply-yarn", "collections/4-ply-yarn", "collections/lace-yarn", "collections/crochet", "collections/knitting"]
   };
