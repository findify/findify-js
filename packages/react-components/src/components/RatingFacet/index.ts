import { compose, withStateHandlers, withProps, setDisplayName } from 'recompose';
import withTheme from 'helpers/withTheme';
import template from 'helpers/template';

import view from './view';
import styles from './styles.css';

const createKey = (...args) => args.join('_')
export default compose(
  setDisplayName('RatingFacet'),

  withTheme(styles),

  withProps(({ facet, config }) => ({
    items: facet.get('values')
  }))
)(view);
