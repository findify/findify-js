import createConnect from './createConnect';

export default createConnect({
  field: 'meta:sort',
  mapProps: ({ sort }) => sort && sort[0], // field: string, order: string
  handlers: {
    onChangeSort: ({ update }) => (field?: string, order?: string) =>
      !field || field === 'default'
      ? update('sort')
      : update('sort', [{ field, order }])
  }
})
