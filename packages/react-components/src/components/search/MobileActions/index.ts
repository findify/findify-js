import { connectSort } from '@findify/react-connect';
import { compose, withHandlers, withPropsOnChange } from 'recompose';
import withEvents from 'helpers/withEvents';
import withTheme from 'helpers/withTheme';

import view from './view';
import styles from "./styles.css";

export default compose(
  withTheme(styles),
  connectSort,
  withEvents(),
  withHandlers({
    showFacets: ({ emit }) => () => emit('toggleMobileFacets'),
    showSort: ({ emit }) => () => emit('toggleMobileSort')
  }),
  withPropsOnChange(['selected'], ({ selected, config }) => ({
    sorting: config.getIn(['sorting', 'i18n', 'options', selected
      && [selected.get('field'), selected.get('order')].join('|')
      || 'default'
    ])
  }))
)(view);
