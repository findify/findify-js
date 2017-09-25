import * as React from 'react';
import * as cx from 'classnames';
import { withHandlers } from 'recompose';
import Icon from 'internals/Icon';

const styles = require('./styles.css');

export const SearchInput = withHandlers({
  onChange: ({ onChange }: any) => e => onChange(e.target.value),
})(({ onChange, value, placeholder }: any) => (
  <div className={styles.wrap}>
    <Icon name="search" className={styles.icon} />
    <input
      placeholder={placeholder}
      type="search"
      className={styles.input}
      onChange={onChange}
      defaultValue={value}
    />
  </div>
));
