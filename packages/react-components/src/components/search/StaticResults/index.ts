import { compose, setDisplayName, withPropsOnChange } from 'recompose';
import sizeMe from 'react-sizeme';
import { connectConfig } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';

import view from 'components/search/StaticResults/view';
import styles from 'components/search/StaticResults/styles.css';

const countProductsToShow = width => {
  if (width > 1000) return 12;
  if (width > 800) return 6;
  if (width > 600) return 4;
  if (width > 400) return 3;
  return 2;
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
