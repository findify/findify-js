/**
 * @module components/autocomplete/Tip
 */

import React, { useCallback } from 'react'
import classnames from 'classnames'
import { useQuery } from '@findify/react-connect';
import styles from 'components/autocomplete/Tip/styles.css';
import { List } from 'immutable'
import { ThemedSFCProps, ClassnamedProps, WidgetAwareProps, SuggestionsConnectedProps } from 'types';
import { emit } from 'helpers/emmiter';

/** List of props that Tip accepts */
export interface ITipProps extends ThemedSFCProps, ClassnamedProps, WidgetAwareProps, SuggestionsConnectedProps {
  /** Custom title to display in a Tip */
  title: string;
}

const TipView: React.SFC<ITipProps> = ({
  className,
  title,
  theme,
  widgetKey
}: ITipProps) => {
  const {query} = useQuery();
  const onClick = useCallback(() =>
    emit('search', widgetKey, query.get('q')),
    [query]
  );
  return (
    <div
      display-if={query.get('q')}
      className={classnames(theme.tip, className)}
      onClick={onClick}
      >
      {title}
      {' '}
      {
        <span className={theme.highlight}>{query.get('q')}</span>
      }
    </div>
  )
}

export default TipView;
