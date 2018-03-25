import createConnect from './createConnect';

export default createConnect({
  field: 'meta:sort',
  mapProps: (props) => props && props.sort && props.sort[0], // field: string, order: string
  handlers: {
    onChangeSort: ({ update }) => (field?: string, order?: string) =>
      !field || field === 'default'
      ? update('sort')
      : update('sort', [{ field, order }])
  }
})
