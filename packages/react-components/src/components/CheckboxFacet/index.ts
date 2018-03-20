import { compose, setDisplayName, withStateHandlers, withProps } from 'recompose';
import withTheme from 'helpers/withTheme';

import view from './view';
import styles from './styles.css';

export default compose(
  setDisplayName('CheckboxFacet'),

  withTheme(styles),

  withStateHandlers(
    { search: false, isExpanded: false },
    {
      onSearch: (s) => e => ({ ...s, search: e.target.value }),
      onToggle: (s) => () => ({ ...s, isExpanded: !s.isExpanded })
    }
  ),

  withProps(({ search, isExpanded, facet }) => ({
    items: isExpanded && search
      ? facet.get('values').filter(i => i.get('value').includes(search))
      : facet.get('values')
  }))
)(view);
