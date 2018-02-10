import createRecord from './createRecord';

export class Filter extends createRecord('Filter'){
  updater: any;
  queried: any;

  constructor(value, updater){
    super(value);
    this.updater = updater;
  };

  resetValues() {
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

  resetValue(e) {
    if (e && e.preventDefault) e.preventDefault();
    const filterName = this.index;
    const value = this.get('value');
    this.updater('filters', (f) =>
      f.withMutations((filters) => {
        const filter = filters.get(filterName);
        const index = filter.indexOf(value);
        if (!~index) return;
        return filters.removeIn([filterName, index]);
      })
    );
    return this;
  }
}
