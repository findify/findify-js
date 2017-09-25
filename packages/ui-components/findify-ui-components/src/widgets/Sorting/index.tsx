import * as React from 'react';
import Dropdown from 'react-dropdown';
import { compact } from 'lodash';
import {
  compose,
  flattenProp,
  setDisplayName,
  withHandlers,
  withProps,
  withState,
} from 'recompose';
import * as cx from 'classnames';
import withConfig from 'helpers/withConfig';

const styles = require('./styles.css');

const createValue = option => compact([option.field, option.order]).join('|');

export const Sorting: any = compose(
  setDisplayName('Sorting'),
  flattenProp('value'),
  withConfig({
    i18n: {
      options: {},
    },
  }),
  withHandlers({
    onChange: ({ onChange }) => ({ value }) => {
      const [field, order] = value.split('|');
      onChange({ field, order });
    },
  }),
  withProps(({ config, value, options }) => {
    const opts = options.map(option => {
      const value = createValue(option);
      return { value, label: config.i18n.options[value] || option };
    });
    return {
      options: opts,
      value:
        (!!value && opts.find(o => o.value === createValue(value))) || opts[0],
    };
  }),
)(({ config, options, onChange, value, style, className, isMobile }: any) => (
  <div
    className={cx(styles.root, className, isMobile && styles.mobile)}
    style={style}
  >
    {!isMobile &&
      config.i18n.title && <p className={styles.title}>{config.i18n.title}</p>}
    <Dropdown
      baseClassName={styles.dropdown}
      onChange={onChange}
      options={options}
      value={value}
    />
  </div>
));
