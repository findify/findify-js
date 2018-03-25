import { connectSort } from '@findify/react-connect';
import { compose, withPropsOnChange, setDisplayName, withHandlers } from 'recompose';
import withTheme from 'helpers/withTheme';

import view from './view';
import styles from './styles.css';

export default compose(
  setDisplayName('Sorting'),
  withTheme(styles),
  connectSort,
  withPropsOnChange(['config'], ({ config, sort }) => {
    const items = config.getIn(['sorting', 'options']);
    const labels = config.getIn(['sorting', 'i18n', 'options']);
    return {
      items: items.map(i =>
        i.set('label', labels.get([i.get('field'), i.get('order')].filter(i => i).join('|')))
      )
    }}
  ),
  withHandlers({
    onChangeSort: ({ onChangeSort }) => item => 
      item.get('field') === 'default'
      ? onChangeSort()
      : onChangeSort(item.get('field'), item.get('order'))
  }),
)(view);
