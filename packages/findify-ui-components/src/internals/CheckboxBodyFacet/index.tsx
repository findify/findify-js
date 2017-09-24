import * as React from 'react';
import {
  compose,
  defaultProps,
  setDisplayName,
  withHandlers,
  withProps,
  withPropsOnChange,
  withState,
  pure,
} from 'recompose';
import * as cx from 'classnames';

import { ExpandButton } from 'internals/ExpandButton';
import { SearchInput } from 'internals/SearchInput';
import { ListRenderer } from './ListRenderer';

const styles = require('./styles.css');

export const CheckboxBodyFacet: any = compose(
  setDisplayName('CheckboxBodyFacet'),
  pure,
  defaultProps({
    showExpander: false,
    disableSlice: false,
  }),
  withState('search', 'setSearch', ''),
  withState(
    'expanded',
    'setExpanded',
    ({ config }) => !!config.initiallyExpanded,
  ),
  withPropsOnChange(['values'], ({ values }) => ({
    selectedItems: values.filter(item => item.selected),
  })),
  withPropsOnChange(
    ['values', 'search'],
    ({ values, search, showExpander }) => {
      if (!showExpander) {
        return {
          notSelectedItems: values.filter(item => !item.selected),
        };
      }
      const regexp = new RegExp(search, 'ig');
      return {
        notSelectedItems: values.filter(
          item => !item.selected && item.value.match(regexp),
        ),
      };
    },
  ),
  withProps((props: any) => ({
    hasSelected: !!props.selectedItems.length,
    hasNotSelected: !!props.notSelectedItems.length,
    showMoreButton:
      props.showExpander &&
      props.notSelectedItems.length > props.config.maxItemsCount,
    showSearch: props.showExpander && props.expanded,
    showStaticContent:
      (props.showExpander &&
        props.notSelectedItems.length < props.config.maxItemsCount) ||
      !props.expanded,
  })),
  withHandlers({
    toggleExpand: ({ expanded, setExpanded }) => e => {
      if (e) e.preventDefault();
      return setExpanded(!expanded);
    },
    onSearchChange: ({ setSearch }) => query => setSearch(query),
  }),
)(({ selectedItems, notSelectedItems, search, expanded, isMobile,
  onChange, toggleExpand, onSearchChange,
  disableSlice, showSearch, hasSelected, hasNotSelected, showStaticContent, showMoreButton, ...rest }: any) => (
  <div className={styles.wrap}>
    {showSearch && (
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder={rest.config.i18n.search}
      />
    )}
    {hasSelected && (
      <ListRenderer
        {...rest}
        items={selectedItems}
        onChange={onChange}
        className={styles.selectedItems}
        isStatic
      />
    )}
    {hasNotSelected && (
      <ListRenderer
        {...rest}
        items={notSelectedItems}
        onChange={onChange}
        slice={
          !isMobile && !disableSlice && !expanded && rest.config.maxItemsCount
        }
        isMobile={isMobile}
        isStatic={!isMobile && showStaticContent}
      />
    )}
    {!isMobile &&
      showMoreButton && (
        <ExpandButton
          expanded={expanded}
          onClick={toggleExpand}
          label={expanded ? rest.config.i18n.less : rest.config.i18n.more}
        />
      )}
  </div>
));
