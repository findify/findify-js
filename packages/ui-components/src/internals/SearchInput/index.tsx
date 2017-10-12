import * as React from 'react';
import * as cx from 'classnames';
import { withHandlers } from 'recompose';
import Icon from 'internals/Icon';

const styles = require('./styles.css');

export interface OwnProps {
  value: string;
  placeholder: string;
  onChange?: (value: string) => void;
}

export interface Handlers {
  onChange(event: React.FormEvent<HTMLInputElement>): void;
}

export type Props = OwnProps & Handlers;

export const SearchInput = withHandlers<Props, Handlers>({
  onChange: ({ onChange }: OwnProps) => e => onChange(e.target.value),
})(({ onChange, value, placeholder }: Props) => (
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
