export default {
  /** Views */
  views: {
    search: () => import(/* webpackChunkName: "search" */ 'layouts/Search'),
    autocomplete: () =>
      import(/* webpackChunkName: "autocomplete" */ 'layouts/Autocomplete'),
    recommendation: () =>
      import(/* webpackChunkName: "recommendation" */ 'layouts/Recommendation'),
    zeroResults: () =>
      import(/* webpackChunkName: "search" */ 'layouts/ZeroResults'),
    custom: () => import('layouts/Custom'),
    content: () => import('layouts/Content'),
    tabs: () => import('layouts/Tabs'),
  },

  /** Autocomplete */
  autocomplete: {
    sidebar: () => import('layouts/Autocomplete/Sidebar'),
    dropdown: () => import('layouts/Autocomplete/Dropdown'),
    fullscreenWithInput: () =>
      import('layouts/Autocomplete/FullscreenWithInput'),
  },

  components: {
    virtualizedList: () => import('components/common/VirtualizedList/view'),
    drawer: () => import('components/common/Drawer'),
    dropdown: () => import('components/Dropdown/view'),
    swiper: () => import('components/Swiper/loader'),
    rangeSlider: () => import('react-slider'),
  },
};
