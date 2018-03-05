declare module __root {
  let emit: any; // Fire global event
  let listen: any; // Listen for events
  let config: any; // Merchant configuration (Immutable)
  let analytics: any; // Analytics instance
  let entities: any; // Entities manager (list, attach, detach, find)
}

declare module __webpack_require__ {
  let p: string;
}
