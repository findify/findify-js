/**
 * @module components/autocomplete/Tip
 */

import React from 'react'
import classnames from 'classnames'

import styles from 'components/autocomplete/Tip/styles.css';
import { List } from 'immutable'
import { ThemedSFCProps, ClassnamedProps, WidgetAwareProps, SuggestionsConnectedProps } from 'types/index';

/** List of props that Tip accepts */
interface ITipProps extends ThemedSFCProps, ClassnamedProps, WidgetAwareProps, SuggestionsConnectedProps {
  /** Custom title to display in a Tip */
  title: string;
}

const TipView: React.SFC<ITipProps> = ({
  suggestions,
  className,
  title,
  theme,
  getSuggestionProps,
  widgetKey
}: ITipProps) => {
  const suggestionProps = suggestions && suggestions.size > 0 && getSuggestionProps(0, widgetKey) || { onClick: () => {} }
  return (
    <div
      display-if={suggestions && suggestions.size > 0}
      className={classnames(theme.tip, className)}
      onClick={suggestionProps.onClick}
      >
      {title}
      {' '}
      {
        <span className={theme.highlight}>{suggestions.getIn([0, 'value'])}</span>
      }
    </div>
  )
}

export default TipView;
