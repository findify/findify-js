import { compose, withPropsOnChange } from 'recompose';
import { is } from 'immutable';

export default compose(
  withPropsOnChange(
    (prev: any, next) => !is(prev.items, next.items),
    () => {
      if (!window) return;
      window.scrollTo(window.scrollX, window.scrollY - 1);
      window.scrollTo(window.scrollX, window.scrollY + 1);
      return;
    }
  )
)
