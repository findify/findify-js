/**
 * @module components/autocomplete/Tip
 */

import { useCallback } from 'react';
import styles from 'components/autocomplete/Tip/styles.css';
import classnames from 'classnames';
import { useQuery } from '@findify/react-connect';
import { ThemedSFCProps } from 'types';
import { emit } from 'helpers/emmiter';

/** List of props that Tip accepts */
export interface ITipProps extends ThemedSFCProps {
  /** Custom title to display in a Tip */
  widgetKey: string;
  title: string;
  zeroResultsTitle: string;
}

export default ({
  className,
  title,
  zeroResultsTitle,
  theme = styles,
  widgetKey,
}: ITipProps) => {
  const { query } = useQuery();
  const onClick = useCallback(
    () => emit('search', widgetKey, !query.get('q') ? '' : query.get('q')),
    [query]
  );
  return (
    <>
      <div
        display-if={query.get('q')}
        className={classnames(theme.tip, className)}
        onClick={onClick}
      >
        {title} {<span className={theme.highlight}>{query.get('q')}</span>}
      </div>
      <div
        display-if={!query.get('q')}
        className={classnames(theme.tip, className)}
        onClick={onClick}
      >
        {zeroResultsTitle}
      </div>
    </>
  );
};
