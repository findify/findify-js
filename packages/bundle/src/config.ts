export default {
    "api": {
        "key": "2e963f3e-38bd-4c00-9636-c00e48945eb7"
    },
    "sentryDisabled": false,
    "platform": {
        "shopify": true
    },
    "mjs_version": "5.3.18",
    "analyticsjs_version": "3.0.5",
    "status": "live",
    "mobileBreakpoint": 767,
    "location": {
        "searchUrl": "/pages/search-results",
        "prefix": "findify"
    },
    "selectors": {
        "input[name='q']": "autocomplete",
        "#findify_results": "search",
        "#home-findify-rec-1": "recommendation",
        "#home-findify-rec-2": "recommendation",
        "#product-findify-rec-2": "recommendation",
        "#cart-findify-rec-1": "recommendation",
        "#home-findify-rec-3": "recommendation",
        "#category-findify-rec-1": "recommendation",
        "#home-findify-rec-4": "recommendation",
        "#cart-findify-rec-3": "recommendation",
        "#cart-findify-rec-2": "recommendation",
        "#product-findify-rec-4": "recommendation"
    },
    "currency": {
        "code": "USD",
        "thousand": ",",
        "decimal": ".",
        "precision": 2,
        "symbol": "$",
        "symbolOnLeft": true
    },
    "poweredByFindify": false,
    "view": {
        "pagination": false,
        "infinite": true
    },
    "features": {
        "autocomplete": {
            "renderIn": "body",
            // "isMobileSimple": true,
            "viewType": "simple",
            "view": {
                simple: true,
                fullsize: false,
                sidebar: false
            },
            "disableFormSubmit": true,
            "position": "left",
            "meta": {
                "item_limit": 4,
                "suggestion_limit": 10
            },
            "product": {
                "title": {
                    "lines": 3
                },
                "i18n": {
                    "colorsAvailable": "Colors available"
                }
            },
            "i18n": {
                "suggestionsTitle": "Search suggestions",
                "productMatchesTitle": "Product matches",
                "tipTitle": "Press enter to search"
            }
        },
        "search": {
            "disableScroll": false,
            "scrollOffset": 0,
            "meta": {
                "limit": 24
            },
            "product": {
                "title": {
                    "lines": 3
                },
                "i18n": {
                    "colorsAvailable": "Colors available"
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
            "zeroResultsType": "trending",
            "i18n": {
                "noResult": "Oh no! Your search for <span class=\"findify-query\"></span> did not match any products.<br/>But don't give up, we're here to help you find what you're looking for."
            },
            "breadcrumbs": {
                "i18n": {
                    "showing": "Showing %s results for",
                    "noQuery": "Showing all products. Use filters to refine your search.",
                    "partialMatch": "Showing results that partially match instead.",
                    "zeroResultsFor": "0 results for"
                }
            },
            "facets": {
                "types": {
                    "price": "price",
                    "reviews.average_score": "rating",
                    "color": "color"
                },
                "labels": {
                    "custom_fields.company": "Studio",
                    "price": "Price",
                    "tags": "tags",
                    "brand": "Production by",
                    "reviews.average_score": "Avg. customer rating",
                    "material": "Material",
                    "condition": "condition",
                    "seller": "seller",
                    "custom_fields.remove": "Remove",
                    "custom_fields.barcode": "Barcode",
                    "custom_fields.tagline": "Tagline",
                    "sku": "sku",
                    "category": "Category",
                    "color": "Color",
                    "custom_fields.status": "Status",
                    "availability": "availability",
                    "discount": "discount",
                    "id": "id",
                    "image_url": "image_url",
                    "thumbnail_url": "thumbnail_url",
                    "product_url": "product_url",
                    "category_str": "category_str",
                    "description": "description",
                    "category.category1": "category.category1",
                    "category.category2": "category.category2",
                    "category.category3": "category.category3",
                    "variants_ids": "variants_ids",
                    "title": "title",
                    "short_description": "short description",
                    "category.category4": "category.category4",
                    "size": "Size",
                    "custom_fields.genre": "Genre",
                    "custom_fields.language": "Language"
                },
                "category": {
                    "maxItemsCount": 6,
                    "initiallyExpanded": false,
                    "rowHeight": 20,
                    "i18n": {
                        "goBackTitle": "All Categories",
                        "more": "More",
                        "less": "Less"
                    }
                },
                "text": {
                    "maxItemsCount": 6,
                    "initiallyExpanded": false,
                    "rowHeight": 20,
                    "i18n": {
                        "more": "More",
                        "less": "Less",
                        "search": "Search"
                    }
                },
                "price": {
                    "rowHeight": 20,
                    "i18n": {
                        "submit": "go",
                        "under": "Under",
                        "up": "&amp; up"
                    }
                },
                "rating": {
                    "rowHeight": 20,
                    "i18n": {
                        "submit": "go",
                        "under": "Under",
                        "up": "&amp; up"
                    }
                },
                "range": {
                    "rowHeight": 20,
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
                    "showResults": "See results",
                    "hideFilters": "Exit filters",
                    "ok": "Ok",
                    "backToFilters": "Back to menu",
                    "search": "Search"
                },
                "color": {
                    "mapping": {
                        "blue": "#818",
                        "tigra": "no-repeat center/100% url(https://cdn.shopify.com/s/files/1/1132/2808/files/animalprint40x40.jpg?2145911707392861163)"
                    }
                }
            }
        },
        "recommendations": {
            "#home-findify-rec-1": {
                "enabled": true,
                "slot": "home-findify-rec-1",
                "type": "latest",
                "template": "slider",
                "limit": 10,
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
                        "display": true
                    },
                    "price": {
                        "display": false
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
                        "colorsAvailable": "Colors available"
                    }
                },
                "title": "Products you recently viewed"
            },
            "#home-findify-rec-2": {
                "enabled": true,
                "slot": "home-findify-rec-2",
                "type": "trending",
                "template": "grid",
                "limit": 10,
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
                        "display": true
                    },
                    "price": {
                        "display": false
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
                        "colorsAvailable": "Colors available"
                    }
                },
                "title": "Hot sellers"
            },
            "#product-findify-rec-2": {
                "enabled": true,
                "slot": "product-findify-rec-2",
                "type": "viewed",
                "template": "slider",
                "limit": 10,
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
                        "display": true
                    },
                    "price": {
                        "display": false
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
                        "colorsAvailable": "Colors available"
                    }
                },
                "title": "Customers who viewed this also viewed"
            },
            "#cart-findify-rec-1": {
                "enabled": true,
                "slot": "cart-findify-rec-1",
                "type": "latest",
                "template": "slider",
                "limit": 10,
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
                        "display": true
                    },
                    "price": {
                        "display": false
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
                        "colorsAvailable": "Colors available"
                    }
                },
                "title": "Products you recently viewed"
            },
            "#home-findify-rec-3": {
                "enabled": true,
                "slot": "home-findify-rec-3",
                "type": "newest",
                "template": "slider",
                "limit": 10,
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
                        "display": true
                    },
                    "price": {
                        "display": false
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
                        "colorsAvailable": "Colors available"
                    }
                },
                "title": "Newest products"
            },
            "#category-findify-rec-1": {
                "enabled": true,
                "slot": "category-findify-rec-1",
                "type": "latest",
                "template": "slider",
                "limit": 10,
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
                        "display": true
                    },
                    "price": {
                        "display": false
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
                        "colorsAvailable": "Colors available"
                    }
                },
                "title": "Products you recently viewed"
            },
            "#home-findify-rec-4": {
                "enabled": true,
                "slot": "home-findify-rec-4",
                "type": "trending",
                "template": "slider",
                "limit": 10,
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
                        "display": true
                    },
                    "price": {
                        "display": false
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
                        "colorsAvailable": "Colors available"
                    }
                },
                "title": "title one"
            },
            "#cart-findify-rec-3": {
                "enabled": true,
                "slot": "cart-findify-rec-3",
                "type": "purchasedTogether",
                "template": "slider",
                "limit": 10,
                "multipleIds": true,
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
                        "display": true
                    },
                    "price": {
                        "display": false
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
                        "colorsAvailable": "Colors available"
                    }
                },
                "title": "Frequently purchased together"
            },
            "#cart-findify-rec-2": {
                "enabled": true,
                "slot": "cart-findify-rec-2",
                "type": "trending",
                "template": "grid",
                "limit": 10,
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
                        "display": true
                    },
                    "price": {
                        "display": false
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
                        "colorsAvailable": "Colors available"
                    }
                },
                "title": "Hot sellers!"
            },
            "#product-findify-rec-4": {
                "enabled": true,
                "slot": "product-findify-rec-4",
                "type": "purchasedTogether",
                "template": "slider",
                "limit": 10,
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
                        "display": true
                    },
                    "price": {
                        "display": false
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
                        "colorsAvailable": "Colors available"
                    }
                },
                "title": "Frequently purchased together"
            }
        }
    },
    "stickers": {
        "out-of-stock": {
            "template": "Temporarily out of stock"
        },
        "discount": {
            "position": "top-right",
            "template": {
                "single": "woohooo %s% off",
                "multiple": "Up to %s% off"
            },
            "styles": {
                "background": "#e7a1a0",
                "color": "#FFFFFF",
                "opacity": "1",
                "fontFamily": "'Source Sans Pro', sans-serif;",
                "fontSize": "16",
                "fontWeight": "600",
                "textTransform": "none"
            }
        },
        "free-shipping": {
            "position": "top-right",
            "template": {
                "single": "%s% off",
                "multiple": "Up to %s% off"
            },
            "styles": {
                "background": "#2baed8",
                "color": "#ffffff",
                "opacity": "1",
                "fontFamily": "Palatino, 'Palatino Linotype', 'Palatino LT STD', 'Book Antiqua', Georgia, serif;",
                "fontSize": "14",
                "fontWeight": "600",
                "textTransform": "none"
            }
        }
    },
    "frameDisabled": true,
    "useSimpleLoader": false,
    "collections": ["collections/natural-fiber", "collections/crime", "test"]
};
