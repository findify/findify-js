export default {
  /** Views */
  views: {
    search: () =>
      import(
        /* webpackChunkName: "search" */ '@findify/react-components/src/layouts/Search'
      ),
    autocomplete: () =>
      import(
        /* webpackChunkName: "autocomplete" */ '@findify/react-components/src/layouts/Autocomplete'
      ),
    recommendation: () =>
      import(
        /* webpackChunkName: "recommendation" */ '@findify/react-components/src/layouts/Recommendation'
      ),
    zeroResults: () =>
      import(
        /* webpackChunkName: "search" */ '@findify/react-components/src/layouts/ZeroResults'
      ),
    custom: () => import('@findify/react-components/src/layouts/Custom'),
    content: () => import('@findify/react-components/src/layouts/Content'),
    tabs: () => import('@findify/react-components/src/layouts/Tabs'),
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
    swiper: () => import('components/Swiper/view'),
  },
};
