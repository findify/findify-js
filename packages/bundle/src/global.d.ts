declare module __root {
  let emit: any; // Fire global event
  let listen: any; // Listen for events
  let addListeners: any; // Add array of listeners to combine them
  let config: any; // Merchant configuration (Immutable)
  let analytics: any; // Analytics instance
  let widgets: any; // Widgets manager (list, attach, detach, find)
}

declare module __webpack_require__ {
  let p: string;
}
