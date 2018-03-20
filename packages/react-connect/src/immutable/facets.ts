import { Map, List, fromJS, isImmutable } from 'immutable';
import createRecord from './createRecord';
import { preventEvents } from '../utils/preventEvents';

const getFacetValue = (_this, type) => {
  if (type === 'range') {
    return _this.filter((_, k) => k === 'from' || k === 'to')
  };
  return _this.get('value');
}

const updateFilters = (filterName: string, value: any, isSelected:boolean) =>
(f: Map<any, any> = Map()) =>
  f.withMutations(filters => {
    if (isSelected) {
      const index = filters.get(filterName).indexOf(value);
      return filters.removeIn([filterName, index]);
    }
    if (filters.has(filterName)) {
      return filters.set(filterName, filters.get(filterName).push(value));
    }
    return filters.set(filterName, fromJS([value]));
  })

export class Facet extends createRecord('Facet'){
  updater: any;

  constructor(facet, updater){
    super(facet.update('values', values =>
      values.map(v => new FacetValue(v, updater, facet))
    ));
    this.updater = updater;
  };

  resetValues = (e) => {
    preventEvents(e);
    this.updater('filters', f => f && f.remove(this.get('name')))
    return this;
  }

  setValue = (value) => {
    if (!value) return this;
    this.updater('filters', updateFilters(this.get('name'), fromJS(value), false));
    return this;
  }
}

export class FacetValue extends createRecord('FacetValue'){
  updater: any;
  index: any;
  type: any;

  constructor(value, updater, facet){
    super(value);
    this.updater = updater;
    this.index = facet.get('name');
    this.type = facet.get('type');
  }

  toggle = (e) => {
    preventEvents(e);
    const value = getFacetValue(this, this.type);
    this.updater('filters', updateFilters(this.index, value, this.get('selected')));
    return this;
  }
}
