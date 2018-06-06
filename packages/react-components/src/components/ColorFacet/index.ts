/**
 * @module components/ColorFacet
 */
import React from 'react';
import { compose, setDisplayName, withStateHandlers, withProps } from 'recompose';
import withTheme from 'helpers/withTheme';

import view from 'components/ColorFacet/view';
import styles from 'components/ColorFacet/styles.css';

export default compose(
  setDisplayName('ColorFacet'),

  withTheme(styles),

  withProps(({ facet }) => ({
    items: facet.get('values')
  }))
)(view);
