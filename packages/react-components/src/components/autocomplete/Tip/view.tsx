/**
 * @module components/autocomplete/Tip
 */

import React, { useCallback } from 'react'
import classnames from 'classnames'
import { useQuery } from '@findify/react-connect';
import { ThemedSFCProps, ClassnamedProps, WidgetAwareProps, SuggestionsConnectedProps } from 'types';
import { emit } from 'helpers/emmiter';

/** List of props that Tip accepts */
export interface ITipProps extends ThemedSFCProps, ClassnamedProps, WidgetAwareProps, SuggestionsConnectedProps {
  /** Custom title to display in a Tip */
  title: string;
  zeroResultsTitle: string;
}

const TipView: React.SFC<ITipProps> = ({
  className,
  title,
  zeroResultsTitle,
  theme,
  widgetKey
}: ITipProps) => {
  const {query} = useQuery();
  const onClick = useCallback(() =>
    emit('search', widgetKey, !query.get('q') ? '' : query.get('q')),
    [query]
  );
  return (
    <>
      <div
        display-if={!!query.get('q')}
        className={classnames(theme.tip, className)}
        onClick={onClick}
        >
        {title}
        {' '}
        {
          <span className={theme.highlight}>{query.get('q')}</span>
        }
      </div>
      <div display-if={!query.get('q')} className={classnames(theme.tip, className)} onClick={onClick}>
        { zeroResultsTitle }
      </div>
    </>
  )
}

export default TipView;
