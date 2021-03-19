/**
 * @module components/search/MobileActions
 */
import { connectSort, connectQuery } from '@findify/react-connect';
import { compose, withHandlers, withPropsOnChange } from 'recompose';
import withEvents from 'helpers/withEvents';
import withTheme from 'helpers/withTheme';
import { withDrawer } from 'helpers/withDrawer';
import MobileFacets from 'components/search/MobileFacets';
import MobileSorting from 'components/search/MobileSorting';

import view from 'components/search/MobileActions/view';
import styles from 'components/search/MobileActions/styles.css';

const transform = {
  from: { transform: `translate3d(-100%, 0, 0)` },
  to: { transform: `translate3d(0%, 0, 0)` },
};
export default compose(
  withTheme(styles),
  connectSort,
  connectQuery,
  withEvents(),
  withDrawer('Filters', MobileFacets, transform),
  withDrawer('Sorting', MobileSorting, transform),
  withEvents({
    showMobileFacets: ({ showModal }) => () => showModal('Filters'),
    showMobileSort: ({ showModal }) => () => showModal('Sorting'),
    hideMobileFacets: ({ hideModal }) => () => hideModal('Filters'),
    hideMobileSort: ({ hideModal }) => () => hideModal('Sorting'),
  }),
  withHandlers({
    showFacets: ({ emit }) => () => emit('showMobileFacets'),
    showSort: ({ emit }) => () => emit('showMobileSort'),
  }),
  withPropsOnChange(['selected'], ({ selected, config }) => ({
    sorting: config.getIn([
      'sorting',
      'i18n',
      'options',
      (!!selected &&
        [selected.get('field'), selected.get('order')]
          .filter((k) => !!k)
          .join('|')) ||
        'default',
    ]),
  })),
  withPropsOnChange(
    ['query'],
    ({ query }) =>
      query.get('filters') && {
        total: query.get('filters').reduce(
          // The workaround to not sum the nested category filters
          (acc, filter, key) =>
            acc + (/category[2-9]/.test(key) ? 0 : filter.size),
          0
        ),
      }
  )
)(view);
