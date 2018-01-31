import createConnect from './createConnect';

export default createConnect({
  feature: 'autocomplete',
  field: 'suggestions',
  handlers: {
    onClick: ({ change }) => (value) => change('q', value)
  }
})
