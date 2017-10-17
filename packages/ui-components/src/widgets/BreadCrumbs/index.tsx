import * as React from 'react';
import * as cx from 'classnames';
import template from 'helpers/template';
import withConfig from 'helpers/withConfig';
import { escape } from 'lodash';
import formatRange from 'helpers/formatRange';
import formatPrice from 'helpers/formatPrice';
import { Rating } from 'widgets/Rating';
import Icon from 'internals/Icon';
import {
  compose,
  pure,
  withHandlers,
  withProps,
  setDisplayName,
  withPropsOnChange,
  createEagerElement,
} from 'recompose';

const styles = require('./styles.css');

const getTitle = ({
  q,
  corrected_q,
  filters,
  total,
  tpl,
  query_type,
  config: { i18n },
}) => {
  if (!q && !filters.length) return i18n.noQuery;
  if (!!corrected_q) {
    return `${tpl(total)} <strong>"${escape(
      corrected_q
    )}"</strong>. ${i18n.zeroResultsFor} ${q}.`;
  }
  if (query_type === 'or') {
    return `${i18n.zeroResultsFor} <strong>"${escape(
      q
    )}"</strong>. ${i18n.partialMatch}`;
  }
  return tpl(total) + (q ? ` <strong>"${escape(q)}"</strong>:` : ':');
};

const filtersMapping = {
  default: ({ value }) => value,
  price: props => formatPrice(props),
  range: props => formatRange(props),
  rating: props => <Rating value={props.from} />,
  color: ({ value, config: { mapping } }) => {
    const isMulticolor = value === 'Multicolor';
    const classNames = [
      styles.colorFilter,
      isMulticolor && 'multiply-gradient',
    ];
    return (
      <span
        className={cx(...classNames)}
        style={{ background: !isMulticolor && mapping[value.toLowerCase()] }}
      />
    );
  },
};

const Filter: any = compose(
  pure,
  withProps(({ componentType, name, ...rest }: any) => ({
    children: (filtersMapping[componentType] || filtersMapping.default)(rest),
  })),
  withHandlers({
    onRemove: ({ onChange, ...rest }: any) => e => {
      if (e) e.preventDefault();
      return onChange(rest);
    },
  })
)(({ config, children, onRemove }: any) => (
  <div className={styles.filter}>
    <span className={styles.filterTitle}>{children}</span>
    <Icon name="cross" className={cx(styles.filterRemove)} onClick={onRemove} />
  </div>
));

export const HOC = compose(
  setDisplayName('BreadCrumbs'),
  withConfig({
    i18n: {},
    facets: {
      labels: {},
      types: {},
    },
  }),
  withPropsOnChange(['config'], ({ config: { i18n } }) => ({
    tpl: template(i18n.showing),
  })),
  withPropsOnChange(['total', 'q', 'corrected_q'], (props: any) => ({
    title: getTitle(props),
  }))
);

export const Component = ({
  config,
  filters,
  onChange,
  title,
  className,
  displayQuery,
}: any) => (
  <div className={cx(styles.wrap, className)}>
    {displayQuery && (
      <p className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
    )}
    {filters.map((filter, index) =>
      filter.values.map(item => {
        const key = [filter.name, item.value, item.from, item.to].join('_');
        return createEagerElement(Filter, {
          ...filter,
          ...item,
          key,
          index,
          onChange,
          componentType: config.facets.types[filter.name] || filter.type,
          label: config.facets.labels[filter.name],
          config: {
            ...config.facets[config.facets.types[filter.name] || filter.type],
            currency: config.currency,
          },
        });
      })
    )}
  </div>
);

export const BreadCrumbs: any = HOC(Component);
