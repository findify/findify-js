declare namespace __root {
  let emit: any; // Fire global event
  let listen: any; // Listen for events
  let addListeners: any; // Add array of listeners to combine them
  let config: any; // Merchant configuration (Immutable)
  let analytics: any; // Analytics instance
  let widgets: any; // Widgets manager (list, attach, detach, find)
  let invalidate: () => void; // Will invalidate module,
  let utils: any; // Additional helpers
  let sentry: any; // Sentry module
}

declare namespace __webpack_require__ {
  let p: string;
  let l: (x: string, c: unknown, t: string) => any;
  let chunks: any[];
  let e: any;
  let invalidate: any;
}

declare namespace NodeJS {
  interface Global {
    __FINDIFY_PATH__: string;
    __findify_initialized: boolean;
    findify: keyof typeof __root | null | Record<string, any>;
    findifyCreateFeature: any;
    FindifyAnalytics: any;
  }
}

interface Window {
  crypto: any;
  msCrypto: any;
  findifyJsonp: any[];
}

declare let __MERCHANT_CONFIG_URL__: any; // Path to configuration file
declare let __MERCHANT_API_KEY__: any; // Api Key
declare let __MERCHANT_VERSION__: any; // Bundle version
declare let __MERCHANT_POLYFILL__: any; // Should use polyfill or not
declare let __FINFIDY_PATH__: any; // Should use polyfill or not
declare let __MERCHANT_CSS__: any; // Path to CSS file(could be custom css)
declare let __ENVIRONMENT__: any; // Environment
declare let __CONFIG__: any;
declare let __PUBLIC_PATH__: any;
declare let __SENTRY_ENABLED__: any;
