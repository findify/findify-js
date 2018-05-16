/**
 * @module components/CheckboxFacet
 */

import React from 'react';
import { compose, setDisplayName, withStateHandlers, withProps } from 'recompose';
import withTheme from 'helpers/withTheme';

import view from 'components/CheckboxFacet/view';
import styles from 'components/CheckboxFacet/styles.css';

export default compose(
  setDisplayName('CheckboxFacet'),

  withTheme(styles),

  withStateHandlers(
    ({ isExpanded }) => ({ isExpanded, search: '' }),
    {
      onSearch: (s) => (e: React.FormEvent<HTMLInputElement> | string) => ({ ...s, search: e.target ? e.target.value : e }),
      onToggle: (s) => () => ({ ...s, isExpanded: !s.isExpanded })
    }
  ),

  withProps(({ search, isExpanded, facet, theme }) => {
    if (isExpanded && search) {
      const regexp = new RegExp(search, 'gi');
      return { items: facet.get('values').filter(i => regexp.test(i.get('value'))) }
    }
    return { items: facet.get('values') };
  })

)(view);
