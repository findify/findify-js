import { Record, Map } from 'immutable';

export const key: '__immutable' = '__immutable';
const empty = Map();

// Typescript complained about creating declaration files here when using [key], so I had to hardcode it
// Types will still be checked properly as static property 'key' is of type '__immutable' and not string
export default (name) => class ExtendableRecord extends Record({ '__immutable': void 0 }, name){
  static key = key;

  constructor(immutable){
    super({ [ExtendableRecord.key]: immutable });
    return this;
  };

  get(...args) {
    return (super.get as any)(ExtendableRecord.key, empty).get(...args)
  }

  set(...args) {
    const _immutable = (super.get as any)(ExtendableRecord.key, empty);
    const upd = _immutable.set(...args)
    return super.set(ExtendableRecord.key, upd)
  }

  update(...args) {
    const _immutable = (super.get as any)(ExtendableRecord.key, empty);
    const upd = _immutable.update(...args);
    return super.set(ExtendableRecord.key, upd);
  }

  equals(...args) {
    const _immutable = (super.get as any)(ExtendableRecord.key, empty);
    return _immutable.equals(...args);
  }

  hashCode() {
    const _immutable = (super.get as any)(ExtendableRecord.key, empty);
    return _immutable.hashCode();
  }

  toJS(){
    const _immutable = (super.get as any)(ExtendableRecord.key, empty);
    return _immutable.toJS();
  }

  toObject(){
    return (super.get as any)(ExtendableRecord.key, empty).toObject();
  }

  filter(...args) {
    const _immutable = (super.get as any)(ExtendableRecord.key, empty);
    return _immutable.filter(...args);
  }
}
