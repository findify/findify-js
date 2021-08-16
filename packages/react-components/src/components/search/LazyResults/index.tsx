/**
 * @module components/search/LazyResults
 */
import { useConfig, usePagination } from '@findify/react-connect';
import MapArray from 'components/common/MapArray';
import Grid from 'components/common/Grid';
import ProductCard from 'components/Cards/Product';
import Button from 'components/Button';
import Text from 'components/Text';
import { ArrayLike } from 'components/common/MapArray';
import useTranslations from 'helpers/useTranslations';

import styles from 'components/search/LazyResults/styles.css';
import useLazy from 'helpers/useLazy';
import { Immutable } from '@findify/store-configuration';

export default ({ theme = styles, card = ProductCard }) => {
  const {
    container,
    onLoadNext,
    onLoadPrev,
    displayPrevButton,
    displayNextButton,
    items,
  } = useLazy();
  const { config } = useConfig<Immutable.SearchConfig>();
  const { getPageProps, current } = usePagination();
  const translate = useTranslations();
  return (
    <div
      ref={container}
      className={theme.root}
      role="main"
      aria-label={translate('search.title')}
      aria-live="polite"
      tabIndex={0}
    >
      <div className={theme.buttonContainer} display-if={displayPrevButton}>
        <Button
          className={theme.prevButton}
          onClick={onLoadPrev}
          href={getPageProps(current - 1)?.href}
        >
          <Text primary lowercase>
            {translate('search.loadPrev')}
          </Text>
        </Button>
      </div>
      <Grid
        role="main"
        wrapperComponent="ul"
        columnComponent="li"
        aria-label={translate('search.title')}
        columns={config.getIn(['breakpoints', 'grid'])}
        gutter={12}
      >
        {MapArray({
          config: config.get('product'),
          array: items as ArrayLike,
          factory: card,
        })}
      </Grid>
      <div className={theme.buttonContainer} display-if={displayNextButton}>
        <Button
          className={theme.nextButton}
          onClick={onLoadNext}
          href={getPageProps(current + 1)?.href}
        >
          <Text primary lowercase>
            {translate('search.loadMore')}
          </Text>
        </Button>
      </div>
    </div>
  );
};
