import React from 'react'
import Drawer from 'components/common/Drawer'
import Icon from 'components/Icon'
import Suggestions from 'components/autocomplete/SearchSuggestions'
import * as emmiter from 'helpers/emmiter';
import cx from 'classnames';

export default ({ config, theme, meta, suggestions, innerRef, position, ...rest }) =>
<div display-if={suggestions && suggestions.size > 0} className={theme.wrapper}>
  <div
    className={theme.root}
    data-findify-autocomplete={true}>
    <div className={theme.container}>
      <h4 className={cx(theme.typeTitle, theme.suggestionsTitle)}>
        { config.getIn(['i18n', 'suggestionsTitle']) }
      </h4>
      <Suggestions
        className={theme.searchSuggestions}
        widgetKey={config.get('widgetKey')}
        {...rest} />
    </div>
  </div>
</div>
