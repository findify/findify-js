/**
 * @module components/CategoryFacet
 */
import {
  compose,
  setDisplayName,
  withStateHandlers,
  withProps,
} from 'recompose';
import withTheme from 'helpers/withTheme';

import view from 'components/CategoryFacet/view';
import styles from 'components/CategoryFacet/styles.css';

export default compose(
  setDisplayName('CategoryFacet'),

  withTheme(styles),

  withStateHandlers(({ isExpanded }) => ({ isExpanded }), {
    onToggle: (s) => () => ({ ...s, isExpanded: !s.isExpanded }),
  }),

  withProps(({ facet, isExpanded }) => ({
    items: facet.get('values'),
    total: facet.get('values').reduce((acc, v) => acc + v.get('count'), 0),
  }))
)(view);
