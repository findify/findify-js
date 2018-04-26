import { Map, List } from 'immutable';

const iterate = (iterator, state, path = List()) => {
  iterator.forEach((value, key) => {
    const _path = path.push(key);
    if (value === null) state.deleteIn(_path);
    if (Map.isMap(value)) return iterate(value, state, _path);
    return state.setIn(_path, value);
  })
}
export default (prev, next) => prev.withMutations(s => iterate(next, s));
