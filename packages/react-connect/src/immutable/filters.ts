import createRecord from './createRecord';
import { preventEvents } from '../utils/preventEvents';
import { List } from 'immutable';

const getFacetValue = (_this, type) => {
  if (type === 'range') {
    return _this.filter((_, k) => k === 'from' || k === 'to')
  };
  if (type === 'category') {
    return List([_this.get('value')]);
  };
  return _this.get('value');
}

export class Filter extends createRecord('Filter'){
  updater: any;
  queried: any;

  constructor(filter, updater){
    super(filter.update('values', values =>
      values.map(v => new FilterValue(
        v.withMutations(i => i
          .set('type', filter.get('type'))
          .set('name', filter.get('name'))
        ),
        updater,
        filter
      ))
    ));
    this.updater = updater;
  };

  resetValues = (e) => {
    preventEvents(e);
    const filterName = this.get('name');
    this.updater('filters', f => f.remove(filterName))
    return this;
  }
}

export class FilterValue extends createRecord('FilterValue'){
  updater: any;
  index: any;

  constructor(value, updater, filter){
    super(value);
    this.updater = updater;
    this.index = filter.get('name');
  }

  toggle = (e) => {
    preventEvents(e);
    const filterName = this.index;
    const value = getFacetValue(this, this.get('type'));
    this.updater('filters', (f) =>
      f.withMutations((filters) => {
        const filter = filters.get(filterName);
        const index = filter.indexOf(value);
        return !~index ? filters.remove(filterName) : filters.removeIn([filterName, index]);
      })
    );
    return this;
  }
}
