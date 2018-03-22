import React from 'react';
import formatCurrency from 'helpers/formatCurrency';
import { unescape } from 'lodash';

const identity = i => i;

const createLabel = (from, to, config, fx) =>
  (from && to && `${fx(from)} - ${fx(to)}`) ||
  (from && !to && `${fx(from)} ${unescape(config.getIn(['i18n', 'up']))}`) ||
  (!from && to && `${unescape(config.getIn(['i18n', 'up']))} ${fx(to)}`);

export default ({ item, theme, style, config }) =>
<button style={style} className={theme.item} onClick={item.toggle}>
  {
    createLabel(
      item.get('from'),
      item.get('to'),
      config,
      item.get('name') === 'price'
        && formatCurrency(config.get('currency').toJS())
        || identity
    )
  }
</button>
