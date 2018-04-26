import { Record, Map } from 'immutable';

const key = '__immutable';
const empty = Map();

export default (name) => class ExtendableRecord extends Record({ [key]: void 0 }, name){
  constructor(immutable){
    super({ [key]: immutable });
    return this;
  };

  get(...args) {
    return (super.get as any)(key, empty).get(...args)
  }

  set(...args) {
    const _immutable = (super.get as any)(key, empty);
    const upd = _immutable.set(...args)
    return super.set(key, upd)
  }

  update(...args) {
    const _immutable = (super.get as any)(key, empty);
    const upd = _immutable.update(...args);
    return super.set(key, upd);
  }

  equals(...args) {
    const _immutable = (super.get as any)(key, empty);
    return _immutable.equals(...args);
  }

  hashCode() {
    const _immutable = (super.get as any)(key, empty);
    return _immutable.hashCode();
  }

  toJS(){
    const _immutable = (super.get as any)(key, empty);
    return _immutable.toJS();
  }

  toObject(){
    return (super.get as any)(key, empty).toObject();
  }

  filter(...args) {
    const _immutable = (super.get as any)(key, empty);
    return _immutable.filter(...args);
  }
}
