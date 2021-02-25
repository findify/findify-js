/**
 * @module layouts/ZeroResults
 */
import React from "react";
 import { compose, withProps, setDisplayName } from 'recompose';
import { connectItems, connectQuery } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';
import withColumns from 'helpers/withColumns';
import template from 'helpers/template';
import escape from 'lodash/escape';

import view from 'layouts/ZeroResults/view';
import styles from 'layouts/ZeroResults/styles.css';

export default compose(
  setDisplayName('ZeroResults'),
  withTheme(styles),

  connectItems,

  withProps(({ config, q }) => ({
    title: template(config.getIn(
      ['i18n',
       q && q !== '' ?
       'noResultsFound' :
       'noResultEmptyQuery'
      ],
      'We can\'t seem to find any products that match your search for "%s"')
    )(escape(q)),
  })),

  withColumns(),
)(view);
