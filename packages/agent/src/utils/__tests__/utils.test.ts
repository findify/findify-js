import { deepMerge } from '../merge';
import { getFacetType } from '../filters';
import { stateToQuery, queryToState } from '../format';

describe('DeepMerge', () => {
  it('Should merge objects', () => {
    const merged = deepMerge({a: { b: 1 }}, { a: { c: 2, b: 2 } });
    expect(merged).toEqual({ a: { b: 2, c: 2 }})
  })
})

describe('Filters', () => {
  it('Should be category', () => {
    expect(getFacetType([])).toBe('category')
  })
  it('Should be range', () => {
    expect(getFacetType({})).toBe('range')
  })
  it('Should be text', () => {
    expect(getFacetType('')).toBe('text')
  })
})

describe('Format', () => {
  const state = {
    q: '',
    filters: {
      text: ['text'],
      category: [['category', 'category1']],
      range: [{ from: 1, to: 2 }]
    }
  };

  const query = {
    q: '',
    filters: [{
      name: 'text',
      type: 'text',
      values: [{ value: 'text' }]
    }, {
      name: 'category',
      type: 'category',
      values: [{ value: ['category', 'category1'] }]
    }, {
      name: 'range',
      type: 'range',
      values: [{ value: { from: 1, to: 2 }}]
    }]
  };

  it('Should convert state to query', () => {
    expect(stateToQuery(state)).toEqual(query)
  })

  it('Should convert query to state', () => {
    expect(queryToState({ q: true, filters: true }, query)).toEqual(state)
  })
})
