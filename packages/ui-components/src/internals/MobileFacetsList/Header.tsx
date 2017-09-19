import * as React from 'react';
import {
  branch,
  compose,
  onlyUpdateForKeys,
  renderComponent,
  renderNothing,
  withHandlers,
  withProps,
  withPropsOnChange,
} from 'recompose';
import * as cx from 'classnames';
import { keys } from 'lodash';
import Icon from 'internals/Icon';

const styles = require('./styles.css');

const Button = ({ onClick, children, flat }: any) => (
  <button onClick={onClick} className={cx(styles.button, flat && styles.flat)}>
    {children}
  </button>
);

const RootHeader = compose(
  branch(
    ({ selectedFacets }: any) => !!selectedFacets.length,
    renderComponent(({ onClose, onResetAll, config }) => (
      <div className={styles.buttonsGroup}>
        <Button onClick={onResetAll}>{config.facets.i18n.resetAll}</Button>
        <div className={styles.divider} />
        <Button onClick={onClose} className={styles.light}>
          {config.facets.i18n.showResults}
        </Button>
      </div>
    )),
    renderComponent(({ onClose, config }) => (
      <Button onClick={onClose} flat>
        <Icon name="chevron-left" className={cx(styles.icon, styles.pre)} />
        {config.facets.i18n.hideFilters}
      </Button>
    )),
  ),
)(renderNothing);

const FacetHeader = branch(
  ({ changes, selectedFacet }: any) =>
    !!(changes[selectedFacet] && !!keys(changes[selectedFacet]).length),
  renderComponent(({ onCommit, config }) => (
    <Button onClick={() => onCommit()}>{config.facets.i18n.ok}</Button>
  )),
  renderComponent(({ onBackToFacets, config }) => (
    <Button onClick={onBackToFacets} flat>
      <Icon name="chevron-left" className={cx(styles.icon, styles.pre)} />
      {config.facets.i18n.backToFilters}
    </Button>
  )),
)(renderNothing);

export const FacetTitle = branch(
  ({ selectedFacet }: any) => !selectedFacet,
  renderNothing,
  renderComponent(
    compose(
      withProps(({ changes, selectedFacet, getSelected }) => ({
        showRest:
          !!(changes[selectedFacet] && !!keys(changes[selectedFacet]).length) ||
          !!getSelected(selectedFacet),
      })),
      withHandlers({
        onReset: ({ onReset, selectedFacet, facets }) => () => {
          const facetType = facets.find(facet => facet.name === selectedFacet)
            .type;
          onReset(facetType, selectedFacet);
        },
      }),
    )(({ selectedFacet, onReset, showRest, config }: any) => (
      <div className={styles.facetTitle}>
        <h5 className={styles.facetTitleName}>
          {config.facets.labels[selectedFacet]}
        </h5>
        {showRest && (
          <span className={styles.resetButton} onClick={onReset}>
            {config.facets.i18n.reset}
          </span>
        )}
      </div>
    )),
  ),
)(renderNothing);

export const Header: any = compose(
  withProps(({ facets, getSelected }) => ({
    selectedFacets: facets.filter(facet => !!getSelected(facet.name)),
  })),
  onlyUpdateForKeys([
    'selectedFacet',
    'selectedFacets',
    'changes',
    'hasNotCommittedData',
  ]),
  branch(
    ({ selectedFacet }: any) => !!selectedFacet,
    renderComponent(FacetHeader),
    renderComponent(RootHeader),
  ),
)(renderNothing);
