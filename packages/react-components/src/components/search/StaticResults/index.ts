/**
 * @module components/search/StaticResults
 */

import { compose, setDisplayName, withPropsOnChange } from 'recompose';
import sizeMe from 'react-sizeme';
import { connectConfig } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';

import view from 'components/search/StaticResults/view';
import styles from 'components/search/StaticResults/styles.css';

/**
 * This function is used to calculate products to show in a line of a Slider according to its width
 * @param width Width of slider
 * @returns Number of items to show in a Slider
 */
const countProductsToShow = width => {
  if (width > 1000) return 2;
  if (width > 800) return 3;
  if (width > 600) return 4;
  if (width > 400) return 6;
  return 12;
};

export default compose(
  setDisplayName('StaticResults'),

  withTheme(styles),

  connectConfig,

  sizeMe(),

  withPropsOnChange(['size'], ({ size, config }) => ({
    columns: String(config.get('columns') || countProductsToShow(size.width))
  }))
)(view);
