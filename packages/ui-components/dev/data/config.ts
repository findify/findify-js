export default {
  results: {
    columns: 3,
  },

  productsGrid: {
    columns: 3,
  },

  product: {
    currency: 'USD',
    image: {
      query: {},
    },
    title: {
      lines: 3,
    },
    description: {
      lines: 3,
    },
  },

  productsCarousel: {
    productsToShow: 5,
  },

  stickers: {
    discount: {
      position: 'bottom-right',
      template: {
        single: '%s% off',
        multiple: 'Up to %s% off',
      },
      styles: {
        fontFamily: "'Source Sans Pro', sans-serif",
        fontSize: '12',
        fontWeight: '600',
        textTransform: 'none',
        color: '#ffffff',
        background: '#D83751',
        opacity: '0.9',
      },
    },
    'free-shipping': {
      position: 'top-center',
      template: {
        single: 'Free shipping',
        multiple: 'Free shipping',
      },
      styles: {
        fontFamily: "'Source Sans Pro', sans-serif",
        fontSize: '12',
        fontWeight: '600',
        textTransform: 'none',
        color: '#ffffff',
        background: '#D83751',
        opacity: '0.9',
      },
    },
  },

  sorting: {
    options: [
      {
        field: 'default',
        order: '',
      },
      {
        field: 'price',
        order: 'desc',
      },
      {
        field: 'price',
        order: 'asc',
      },
      {
        field: 'created_at',
        order: 'desc',
      },
    ],
    i18n: {
      title: 'Sort by',
      options: {
        default: 'Popularity',
        'price|desc': 'Price: High to low',
        'price|asc': 'Price: Low to high',
        'created_at|desc': "What's new",
      },
    },
  },

  autocomplete: {
    direction: 'ltr',
    i18n: {
      suggestionsTitle: '...',
      productMatchesTitle: '...',
      tipTitle: '...',
    },
  },

  facets: {
    range: {
      currency: 'USD',
      i18n: {
        submit: 'Apply',
      },
    },

    category: {
      maxItemsCount: 3,
      rowHeight: 20,
      i18n: {
        goBackTitle: 'All categories',
        more: 'Show more',
        less: 'Less',
      },
    },

    checkbox: {
      maxItemsCount: 3,
      rowHeight: 20,
      i18n: {
        search: 'All categories',
        more: 'Show more',
        less: 'Less',
      },
    },

    types: {
      'custom_fields.manufacturer': 'color',
    },

    labels: {
      category: 'Hund',
      'custom_fields.manufacturer': 'Manufacturer',
      price: 'Price',
      'custom_fields.hundkategori': 'Hundkategori',
      'custom_fields.livsstadium': 'Livsstadium',
      'custom_fields.rasstorlekarflerval': 'Rasstorlekarflerval',
      'custom_fields.standardnetto': 'Standardnetto',
      'custom_fields.tuggbenmaterial': 'Tuggbenmaterial',
      'custom_fields.leksaksort': 'Leksaksort',
      'custom_fields.konsistens': 'Konsistens',
      'custom_fields.leksakstorlek': 'Leksakstorlek',
      'custom_fields.matplats_storlek': 'Matplats Storlek',
      'custom_fields.koppelmaterial': 'Koppelmaterial',
      'custom_fields.tuggtyp': 'Tuggtyp',
    },

    i18n: {
      more: 'Show more',
      less: 'Less',
      search: 'Search',
      reset: 'Reset filter',
      showResults: 'Show results',
      hideFilters: 'Hide filters',
      backToFilters: 'Back to filters',
      ok: 'Apply',
    },
  },

  pagination: {
    i18n: {
      previous: 'previous',
      next: 'next',
    },
  },

  breadcrumbs: {
    i18n: {
      title: 'Showing ${ total } results for ${ query }:',
    },
  },
};
