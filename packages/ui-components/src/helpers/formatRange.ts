import { unescape } from 'lodash';

export default ({ from, to, config: { currency, i18n } }) =>
  (from && to && `${from} - ${to}`) ||
  (from && !to && `${from} ${unescape(i18n.up)}`) ||
  (!from && to && `${unescape(i18n.under)} ${to}`);
