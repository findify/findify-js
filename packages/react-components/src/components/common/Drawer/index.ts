/**
 * @module components/common/Drawer
 */
import React from 'react';
import {
  compose,
  setDisplayName,
} from 'recompose'
import withTheme from 'helpers/withTheme'
import view from 'components/common/Drawer/view';

import theme from 'components/common/Drawer/style.css';

export default compose(
  setDisplayName('Drawer'),
  withTheme(theme),
)(view)
