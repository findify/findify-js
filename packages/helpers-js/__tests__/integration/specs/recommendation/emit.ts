function validations() {
  return [
    {
      event: {
        name: 'request',
      },
      message: /"slot" param is required/,
    },
    {
      event: {
        name: 'request',
        payload: {},
      },
      message: /"slot" param is required/,
    },
  ];
}

export { validations };
