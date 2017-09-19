import * as React from 'react';
import {
  branch,
  compose,
  renderComponent,
  renderNothing,
  withHandlers,
  withProps,
  withPropsOnChange,
} from 'recompose';
import * as cx from 'classnames';
import Icon from 'internals/Icon';

import { mapTypeToFacet } from 'helpers/mapTypeToFacet';
import formatRange from 'helpers/formatRange';

const styles = require('./styles.css');

const FacetPreview = compose(
  withPropsOnChange(['type'], ({ config, facet }) => ({
    type:
      (config.facets.types && config.facets.types[facet.name]) || facet.type,
  })),
  withPropsOnChange(['values'], ({ values, type, config }: any) => {
    const selectedItems = values.filter(item => item.selected).map(
      item =>
        type === 'range'
          ? formatRange({
              ...item,
              config: { ...config.facets.range, currency: config.currency },
            })
          : item.value,
    );

    return {
      hasSelectedItems: !!selectedItems && !!selectedItems.length,
      selectedItems: selectedItems.join(', '),
    };
  }),
  withHandlers({
    onReset: ({ onReset, name, type }) => e => onReset(type, name),
    onSelect: ({ name, setSelectedFacet }) => () => setSelectedFacet(name),
  }),
)(
  ({
    label,
    onSelect,
    onReset,
    hasSelectedItems,
    selectedItems,
    config,
  }: any) => (
    <button className={styles.preview} onClick={onSelect}>
      <div className={styles.previewContainer}>
        <div className={styles.previewContent}>
          <h5 className={styles.previewTitle}>{label}</h5>
          {!!selectedItems && (
            <div className={styles.selectedItems}>{selectedItems}</div>
          )}
        </div>
        <div className={styles.previewActions}>
          {hasSelectedItems && (
            <span className={styles.previewReset} onClick={onReset}>
              {config.facets.i18n.reset}
            </span>
          )}
          <Icon name="chevron-right" className={styles.previewIcon} />
        </div>
      </div>
    </button>
  ),
);

const FacetBody = withPropsOnChange(['type'], ({ config, facet }) => {
  const type =
    (config.facets.types && config.facets.types[facet.name]) || facet.type;
  return {
    type,
    factory: mapTypeToFacet(type),
    config: {
      ...config.facets[type],
      currency: config.currency,
    },
  };
})(({ facet, type, factory, ...rest }: any) => (
  <div className={styles.body}>
    {factory({ ...rest, ...facet, isMobile: true })}
  </div>
));

export const Facet: any = compose(
  branch(
    ({ selectedFacet }) => !selectedFacet,
    renderComponent(FacetPreview),
    branch(
      ({ selectedFacet, name }) => selectedFacet === name,
      renderComponent(FacetBody),
      renderNothing,
    ),
  ),
)(renderNothing);
