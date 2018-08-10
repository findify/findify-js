import { compose, withHandlers, withPropsOnChange, setDisplayName } from 'recompose';
import { connectBundle } from 'helpers/bundle';
import view from 'components/Cards/Product/BundleAction/view';
import styles from 'components/Cards/Product/BundleAction/styles.css';
import withTheme from 'helpers/withTheme';

export default compose(
  setDisplayName('BundleAction'),
  withTheme(styles),
  connectBundle,
  withPropsOnChange(['inBundle'], ({ inBundle, item}) => ({
    selected: inBundle.includes(item)
  })),
  withHandlers({
    onClick: ({ inBundle, updateBundle, item }) => e => {
      e.preventDefault();
      e.stopPropagation();
      const index = inBundle.indexOf(item);
      return updateBundle(!!~index ? inBundle.delete(index) : inBundle.push(item));
    },
  })
)(view)
