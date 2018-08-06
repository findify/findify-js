import { Map, List, fromJS, isImmutable } from 'immutable';
import createRecord from './createRecord';
import { preventEvents } from '../utils/preventEvents';

const getFacetValue = (_this, type) => {
  if (type === 'range') {
    return _this.filter((_, k) => k === 'from' || k === 'to')
  };
  return _this.get('value');
}

const updateFilters = (filterName: string, _value: any, isSelected:boolean, type) =>
(f: Map<any, any> = Map()) =>
  f.withMutations(filters => {
    const isCategory = type === 'category';
    const value = isCategory ? List([_value]) : _value;
    const [key, n] = filterName.split(/(?=\d+)/);

    if (isSelected) {
      const index = filters.get(filterName).indexOf(value);
      
      if (!isCategory) return filters.removeIn([filterName, index]);
  
      filters.forEach((_, _fName) => {
        if (!_fName.includes(key) || Number(_fName.split(/(?=\d+)/)[1]) < Number(n)) return;
        return filters.remove(_fName);
      });
  
      return filters;
    }

    if (filters.has(filterName) || (isCategory && filters.find((_, k) => k.includes(key)))) {
      /** Direct set value for category facet coz
       *  just one category could be selected in the same time 
       */
      if (isCategory) {
        filters.forEach((_, _fName) => {
          if (!_fName.includes(key) || Number(_fName.split(/(?=\d+)/)[1]) < Number(n)) return;
          return filters.remove(_fName);
        });
        return filters.set(filterName, fromJS([value]));
      };
  
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
    const name = this.get('name');
    if (this.get('type') === 'category') {
      this.updater('filters', f => f && f.filter((v, k) => !k.includes(name)))
    } else {
      this.updater('filters', f => f && f.remove(name))
    }
    return this;
  }

  setValue = (value) => {
    if (!value) return this;
    this.updater('filters', updateFilters(this.get('name'), fromJS(value), false, this.get('type')));
    return this;
  }
}

export class FacetValue extends createRecord('FacetValue'){
  updater: any;
  index: any;
  type: any;
  cursor: any;

  constructor(value, updater, facet){
    super(value.update('children', children => children &&
      /** Patch children facets in category facet */
      children.map(v => new FacetValue(v, updater, facet))
    ));
    
    this.updater = updater;
    this.index = value.get('name');
    this.type = facet.get('type');
  }

  toggle = (e) => {
    preventEvents(e);
    const value = getFacetValue(this, this.type);
    this.updater('filters', updateFilters(this.index, value, this.get('selected'), this.type));
    return this;
  }
}
