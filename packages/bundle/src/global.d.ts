declare module __root {
  let emit: any; // Fire global event
  let listen: any; // Listen for events
  let addListeners: any; // Add array of listeners to combine them
  let config: any; // Merchant configuration (Immutable)
  let analytics: any; // Analytics instance
  let widgets: any; // Widgets manager (list, attach, detach, find)
  let setup: { // Merchant setup
    __MERCHANT_CONFIG_URL__: any,
    __MERCHANT_API_KEY__: any,
    __MERCHANT_VERSION__: any,
    __MERCHANT_POLYFILL__: any,
    __MERCHANT_CSS__: any,
    __ENVIRONMENT__: any
  }
}

declare module __webpack_require__ {
  let p: string;
}

declare type __MERCHANT_CONFIG_URL__ = any;
declare type  __MERCHANT_API_KEY__ = any
declare type  __MERCHANT_VERSION__ = any
declare type  __MERCHANT_POLYFILL__ = any
declare type  __MERCHANT_CSS__ = any
declare type  __ENVIRONMENT__ = any
