/**
 * @module components/Pagination
 */
import range from 'lodash/range';
import { memo } from 'react';
import cx from 'classnames';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { Immutable } from '@findify/store-configuration';
import { usePagination } from '@findify/react-connect';

import styles from 'components/Pagination/styles.css';
import useTranslations from 'helpers/useTranslations';

const getRange = ({ current, total, step }) => {
  const min = current - step;
  const max = current + step + 1;
  return range(min < 1 ? 1 : min, max > total ? total + 1 : max);
};

export default memo<{ theme?: any }>(({ theme = styles }) => {
  const {
    pages,
    current,
    getPageProps,
    config,
  } = usePagination<Immutable.SearchConfig>();
  const translate = useTranslations();

  if (!pages) return null;

  const step = config.getIn(['pagination', 'step']);
  const total = pages.size + 1;
  const showFirst = current > step + 1;
  const showLast = current < total - step;
  const showFirstDots = current > step + 2;
  const showLastDots = current < total - step - 1;
  const showPrev = current > step;
  const showNext = total - step > current;
  const visiblePages = getRange({ current, total, step });

  return (
    <div
      className={theme.root}
      role="navigation"
      aria-label={translate('pagination.label')}
    >
      <Button
        display-if={showPrev}
        {...getPageProps(current - 1)}
        className={theme.prev}
      >
        <Icon name="ArrowLeft" title={translate('pagination.previous')} />
        {translate('pagination.previous')}
      </Button>
      <Button
        display-if={showFirst}
        {...getPageProps(1)}
        className={theme.first}
        aria-label={translate('pagination.goTo', 1)}
      >
        1
      </Button>
      <Button display-if={showFirstDots} className={theme.dots} tabIndex={-1}>
        ...
      </Button>
      {visiblePages.map((page) => (
        <Button
          {...getPageProps(page)}
          className={cx(theme.page, current === page && theme.active)}
          aria-label={translate('pagination.goTo', page)}
        >
          {page}
        </Button>
      ))}
      <Button display-if={showLastDots} className={theme.dots} tabIndex={-1}>
        ...
      </Button>
      <Button
        display-if={showLast}
        {...getPageProps(total)}
        className={theme.last}
        aria-label={translate('pagination.goTo', total)}
      >
        {total}
      </Button>
      <Button
        display-if={showNext}
        {...getPageProps(current + 1)}
        className={theme.next}
      >
        {translate('pagination.next')}
        <Icon name="ArrowRight" title={translate('pagination.next')} />
      </Button>
    </div>
  );
});
