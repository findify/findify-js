import { unescape } from 'lodash';
import formatCurrency from 'helpers/formatCurrency';

const identity = i => i;

const createLabel = (from, to, config, fx) =>
  (from && to && `${fx(from)} - ${fx(to)}`) ||
  (from && !to && `${fx(from)} ${unescape(config.getIn(['i18n', 'up']))}`) ||
  (!from && to && `${unescape(config.getIn(['i18n', 'up']))} ${fx(to)}`);

export default ({ item, config }) => createLabel(
  item.get('from'),
  item.get('to'),
  config,
  item.get('name') === 'price'
    && formatCurrency(config.get('currency').toJS())
    || identity
)
