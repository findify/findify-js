function createEvent(name, payload?) {
  return !payload
    ? {
        name,
      } as any
    : {
        name,
        payload,
      } as any;
}

export { createEvent };
