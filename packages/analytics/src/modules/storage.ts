import * as store from 'store';
import * as expire from 'store/plugins/expire';

store.addPlugin(expire);

const symbols = '0123456789acbdefghijklmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ';

const keys = {
  visitKey: '_findify_visit',
  uniqKey: '_findify_uniq',
  ctKey: '_findify_ct',
  cartKey: '_findify_cart',
};

function generateId() {
  let str = '';
  for (let i = 0; i < 16; i++) {
    str += symbols[(Math.random() * symbols.length) | 0];
  }
  return str;
}

const { uniqKey, visitKey, cartKey, ctKey } = keys;

function read(name: string): any {
  return store.get(name);
}

function write(name: string, value?: any, permanent?: boolean) {
  const ttl = permanent ? 1000 * 3600 * 24 * 365 * 30 : 1000 * 60 * 30;
  if (!value) return store.remove(name);
  return store.set(name, value, new Date().getTime() + ttl);
}

function createUid() {
  const id = generateId();
  write(uniqKey, id, true);
  return id;
}

function createSid() {
  const id = generateId();
  write(visitKey, generateId());
  return id;
}

const persist = !!(read(uniqKey) && read(visitKey));

export default {
  get uid() {
    return read(uniqKey) || createUid();
  },
  get sid() {
    return read(visitKey) || createSid();
  },
  get cart() {
    return read(cartKey);
  },
  set cart(data) {
    write(cartKey, data);
  },
  get exist() {
    return !!(read(uniqKey) && read(visitKey));
  },

  persist,

  memoize(type, request) {
    const data = read(ctKey);
    write(ctKey, { ...data, [type]: request });
  },

  get memorized() {
    const data = read(ctKey);
    if (!data) {
      return {};
    }
    write(ctKey);
    return data;
  },
};
