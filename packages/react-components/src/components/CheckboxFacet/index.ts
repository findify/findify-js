import { compose, setDisplayName, withStateHandlers, withProps } from 'recompose';
import withTheme from 'helpers/withTheme';

import view from './view';
import styles from './styles.css';

export default compose(
  setDisplayName('CheckboxFacet'),

  withTheme(styles),

  withStateHandlers(
    ({ isExpanded }) => ({ isExpanded, search: false }),
    {
      onSearch: (s) => e => ({ ...s, search: e.target.value }),
      onToggle: (s) => () => ({ ...s, isExpanded: !s.isExpanded })
    }
  ),

  withProps(({ search, isExpanded, facet }) => {
    if (isExpanded && search) {
      const regexp = new RegExp(search, 'gi');
      return { items: facet.get('values').filter(i => regexp.test(i.get('value'))) }
    }
    return { items: facet.get('values') };
  })

)(view);
