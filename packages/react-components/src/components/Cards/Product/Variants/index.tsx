import useTranslations from 'helpers/useTranslations';
import { List } from 'immutable';
import styles from 'components/Cards/Product/Variants/styles.css';

export default ({ item, config, theme = styles }) => {
  const translate = useTranslations();
  return (
    <div
      className={theme.variants}
      display-if={
        config.getIn(['variants', 'display']) &&
        item.get('variants', List()).size > 1
      }
    >
      {translate(
        'product.availableInVariants',
        item.get('variants', List()).size
      )}
    </div>
  );
};
