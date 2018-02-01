export const isObject = (value) => {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

export const isFunction = (value) => {
  if (!isObject(value)) return false;
  return typeof value === "function";
}

// From https://github.com/reactjs/react-redux/blob/master/src/utils/shallowEqual.js
export function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  const hasOwn = Object.prototype.hasOwnProperty;
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}
