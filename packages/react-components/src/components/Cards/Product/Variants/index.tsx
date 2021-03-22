import useTheme from 'helpers/useTheme';
import useTranslations from 'helpers/useTranslations';
import { List } from 'immutable';
import styles from './styles.css';

export default ({ theme, item, config }) => {
  const _theme = useTheme(theme, styles);
  const t = useTranslations();
  return (
    <div
      className={_theme.variants}
      display-if={
        config.getIn(['product', 'variants', 'display']) &&
        item.get('variants', List()).size > 1
      }
    >
      {t('Available in %s variants', item.get('variants', List()).size)}
    </div>
  );
};
