import 'core-js/es6/symbol';
import { Record } from 'immutable';

const key = '__immutable';

export default (name) => class ExtendableRecord extends Record({ [key]: void 0 }, name){
  constructor(immutable){
    super({ [key]: immutable });
    return this;
  };

  get(...args) {
    return super.get(key).get(...args)
  }

  set(...args) {
    const _immutable = super.get(key);
    const upd = _immutable.set(...args)
    return super.set(key, upd)
  }

  update(...args) {
    const _immutable = super.get(key);
    const upd = _immutable.update(...args);
    return super.set(key, upd);
  }

  equals(...args) {
    const _immutable = super.get(key);
    return _immutable.equals(...args);
  }

  hashCode() {
    const _immutable = super.get(key);
    return _immutable.hashCode();
  }

  toJS(){
    const _immutable = super.get(key);
    return _immutable.toJS();
  }

  toObject(){
    return super.get(key).toObject();
  }
}
