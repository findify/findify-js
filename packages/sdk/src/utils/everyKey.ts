import * as every from 'lodash/every';

function everyKey(c, key) {
  return every(c, item => typeof item[key] !== 'undefined');
}

export { everyKey };
