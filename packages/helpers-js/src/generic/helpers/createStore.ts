import * as FindifySDK from 'findify-sdk';
import { isExists } from '../utils/isExists';
import { configureReduxStore } from '../helpers/configureReduxStore';

function createStore(c, makeStore) {
  if (!isExists(c.config)) {
    throw new Error('Please, provide configuration object');
  }

  if (!isExists(c.config.key)) {
    throw new Error('"key" param is required');
  }

  if (c.config.user && !isExists(c.config.user.uid)) {
    throw new Error('"user.uid" param is required');
  }

  if (c.config.user && !isExists(c.config.user.sid)) {
    throw new Error('"user.sid" param is required');
  }

  const sdk = FindifySDK.init(c.config);
  const reduxStore = configureReduxStore(c.rootReducer, c.rootSaga);

  const methods = makeStore(reduxStore, sdk);

  return {
    emit(event) {
      if (!isExists(event)) {
        throw new Error('Please, provide event you want to emit');
      }

      if (!isExists(event.name)) {
        throw new Error('Please, provide event "name"');
      }

      if (
        event.name === c.eventsNames.request &&
        !isExists(c.config.user) &&
        (!isExists(event.payload) || !isExists(event.payload.user))
      ) {
        throw new Error(
          '`user` param should be provided either at request or at library config',
        );
      }

      if (
        event.name === c.eventsNames.request &&
        (isExists(event.payload) && isExists(event.payload.user))
      ) {
        if (!isExists(event.payload.user.uid)) {
          throw new Error('"user.uid" param is required');
        }

        if (!isExists(event.payload.user.sid)) {
          throw new Error('"user.sid" param is required');
        }
      }

      return methods.emit.call(this, event);
    },
    subscribe(listener) {
      if (!isExists(listener)) {
        throw new Error('Please, provide listener function');
      }

      if (typeof listener !== 'function') {
        throw new Error('Listener should be a function');
      }

      return methods.subscribe.call(this, listener);
    },
    get(name) {
      if (!isExists(name)) {
        throw new Error('Please, provide state name');
      }

      if (!isExists(c.stateNames[name])) {
        throw new Error('Event not found');
      }

      return methods.get.call(this, name);
    },
  };
}

export { createStore };
