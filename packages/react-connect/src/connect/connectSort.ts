import createConnect from './createConnect';

/**
 * Used to extract sorting information from Search API response and provide the handler,
 * to modify it further in components
 */
export default createConnect({
  field: 'meta:sort',
  mapProps: (props) => ({
    selected: props && props.get(0),  // field: string, order: string
  }),
  handlers: {
    onChangeSort: ({ update }) => (field?: string, order?: string) =>
      !field
      ? update('sort')
      : update('sort', [{ field, order }])
  }
})
