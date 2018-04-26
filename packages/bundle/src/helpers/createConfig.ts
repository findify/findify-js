import { createRecord } from '@findify/react-connect';

export default class Config extends createRecord('Config'){
  onUpdate: (res) => void

  constructor(config, onUpdate) {
    super(config);
    this.onUpdate = onUpdate;
  }

  setIn = (...args) => {
    const upd = super.setIn(...args);
    this.onUpdate(upd);
    return upd;
  }

  set = (...args) => {
    const upd = super.set(...args);
    this.onUpdate(upd);
    return upd;
  }
}
