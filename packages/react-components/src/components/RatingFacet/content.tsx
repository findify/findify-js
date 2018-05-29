/**
 * @module components/RatingFacet
 */
import cx from 'classnames'
import React from 'react';
import Icon from 'components/Icon';

export default ({ item, theme, config }) =>
<>
  {
    [...Array(item.get('from') + 1).keys()]
    .map((_, i) => <Icon className={theme.star} name='Star' key={'fill-' + i} />)
  }
  {
    [...Array(5 - item.get('from') - 1).keys()]
    .map((_, i) => <Icon className={cx(theme.star, theme.unfilled)} name='Star' key={'unfill-' + i} />)
  }
</>
