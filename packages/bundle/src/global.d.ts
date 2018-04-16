declare module __root {
  let emit: any; // Fire global event
  let listen: any; // Listen for events
  let addListeners: any; // Add array of listeners to combine them
  let config: any; // Merchant configuration (Immutable)
  let analytics: any; // Analytics instance
  let widgets: any; // Widgets manager (list, attach, detach, find)
  let invalidate: (id:string) => void; // Will invalidate module
}

declare module __webpack_require__ {
  let p: string;
}

declare var __MERCHANT_CONFIG_URL__: any; // Path to configuration file
declare var __MERCHANT_API_KEY__: any; // Api Key
declare var __MERCHANT_VERSION__: any; // Bundle version
declare var __MERCHANT_POLYFILL__: any; // Should use polyfill or not
declare var __MERCHANT_CSS__: any; // Path to CSS file(could be custom css)
declare var __ENVIRONMENT__: any; // Environment
declare var __CONFIG__: any;
declare var __PUBLIC_PATH__: any;
