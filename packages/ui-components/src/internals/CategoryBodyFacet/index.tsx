import * as React from 'react';
import { compose, withState, withHandlers, mapProps, pure } from 'recompose';
import * as cx from 'classnames';
import { compact, get } from 'lodash';
import { ExpandButton } from 'internals/ExpandButton';
import { List } from 'immutable';

const styles = require('./styles.css');

import { createCursor } from './cursor';
import { Tree } from './Tree';

const mapArrayToFacetsCreator = (children, selected) => (
  array,
  forceUnselect?,
) =>
  array.map((position, index) => {
    const selector = array
      .takeWhile((_, i) => i <= index)
      .map(p => `[${p}]`)
      .join('.children');
    try {
      const { children: _, ...facet } = get(children, selector);
      if (forceUnselect) return { ...facet, selected: false };
      return index === array.size - 1 ? { ...facet, selected } : facet;
    } catch (e) {
      return;
    }
  });

const getLost = cursor => {
  let size = cursor.size;
  return cursor.size > 2
    ? cursor.takeWhile(k => {
        size--;
        return size > 1;
      })
    : List([]);
};

export const CategoryBodyFacet = compose(
  mapProps(({ values: children, ...rest }) => ({
    ...rest,
    ...createCursor({ children }, List([]), 0),
    track: List([]),
    children,
  })),
  withState(
    'isExpanded',
    'setExpanded',
    ({ config, isMobile }) => isMobile || !!config.initiallyExpanded,
  ),
  withHandlers({
    toggleExpander: ({ isExpanded, setExpanded }) => e => {
      if (e) e.preventDefault();
      return setExpanded(!isExpanded);
    },
    onChange: ({ children, onChange, cursor }) => ({ track, selected }) => {
      const mapArray = mapArrayToFacetsCreator(children, selected);
      const allTracks = getLost(cursor).concat(track); // Holy Sh*t, we loosing tracks when skipping lvl
      const facets = mapArray(track);
      return onChange(
        mapArray(cursor, true)
          .concat(mapArray(allTracks))
          .filter(v => !!v)
          .toArray(),
      );
    },
  }),
)((props: any) => (
  <div>
    <Tree className={styles.wrap} {...props} isRoot selected has_children />
    {!props.isMobile &&
      props.childrenCount > props.config.maxItemsCount && (
        <ExpandButton
          expanded={props.isExpanded}
          onClick={props.toggleExpander}
          label={
            props.isExpanded ? props.config.i18n.less : props.config.i18n.more
          }
        />
      )}
  </div>
));
