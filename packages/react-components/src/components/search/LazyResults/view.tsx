/**
 * @module components/search/LazyResults
 */
import { useConfig } from '@findify/react-connect';
import MapArray from 'components/common/MapArray';
import Grid from 'components/common/Grid';
import ProductCard from 'components/Cards/Product';
import Button from 'components/Button';
import Text from 'components/Text';
import { ArrayLike } from 'components/common/MapArray';
import useTranslations from 'helpers/useTranslations';

import styles from 'components/search/LazyResults/styles.css';
import useLazy from 'helpers/useLazy';

export default ({ theme = styles, card = ProductCard }) => {
  const {
    container,
    onLoadNext,
    onLoadPrev,
    displayPrevButton,
    displayNextButton,
    items,
  } = useLazy();
  const { config } = useConfig();
  const t = useTranslations();
  return (
    <div
      ref={container}
      className={theme.root}
      role="main"
      aria-label={t('Search results')}
      aria-live="polite"
      tabIndex={0}
    >
      <Button
        display-if={displayPrevButton}
        className={theme.prevButton}
        onClick={onLoadPrev}
      >
        <Text primary lowercase>
          {t('Load previous')}
        </Text>
      </Button>
      <Grid
        role="main"
        aria-label={t('Search results')}
        wrapperComponent="ul"
        columnComponent="li"
        columns={config.getIn(['breakpoints', 'grid'], {
          400: 6,
          600: 4,
          1000: 3,
        })}
        gutter={12}
      >
        {MapArray({
          config: config.get('product'),
          array: items as ArrayLike,
          factory: card,
        })}
      </Grid>
      <Button
        display-if={displayNextButton}
        className={theme.nextButton}
        onClick={onLoadNext}
      >
        <Text primary lowercase>
          {t('Load more')}
        </Text>
      </Button>
    </div>
  );
};
