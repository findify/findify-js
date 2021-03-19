/**
 * @module components/search/MobileSorting
 */
import { compose, setDisplayName, withProps, withHandlers } from 'recompose';
import { connectSort } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';
import { is } from 'immutable';
import pure from 'helpers/pure';

import view from 'components/search/MobileSorting/view';
import styles from 'components/search/MobileSorting/styles.css';

export default compose(
  pure,
  setDisplayName('MobileSorting'),
  withTheme(styles),
  connectSort,
  withProps(({ config, meta }) => {
    const selected = meta.getIn(['sort', 0]);
    const labels = config.getIn(['sorting', 'i18n', 'options']);
    const items = config
      .getIn(['sorting', 'options'])
      .map((i) =>
        i
          .set(
            'label',
            labels.get(
              [i.get('field'), i.get('order')].filter((i) => i).join('|')
            )
          )
          .set(
            'selected',
            !!selected
              ? is(i.get('order'), selected.get('order')) &&
                  is(i.get('field'), selected.get('field'))
              : i.get('field') === 'default'
          )
      );
    return { items };
  }),

  withHandlers({
    setSorting: ({ items, onChangeSort }) => (index) =>
      onChangeSort(
        items.getIn([index, 'field'], 'default'),
        items.getIn([index, 'order'], '')
      ),
  })
)(view);
