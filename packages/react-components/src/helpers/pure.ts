import { compose, shouldUpdate, setDisplayName } from 'recompose';
import { is, isImmutable } from 'immutable';

export default compose(
  setDisplayName('Pure'),
  shouldUpdate((prev, next) =>
    !Object.keys(next).every(key => is(next[key], prev[key]))
  )
)
