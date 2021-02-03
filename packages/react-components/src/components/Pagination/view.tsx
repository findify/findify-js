/**
 * @module components/Pagination
 */

import React, { useCallback, useMemo } from 'react';
import cx from 'classnames';

import Button from 'components/Button';
import Icon from 'components/Icon';
import { ThemedSFCProps, MJSConfiguration } from 'types';

/** Props that Pagination view accepts */
export interface IPaginationProps extends ThemedSFCProps {
  /** MJS Configuration */
  config: MJSConfiguration;
  /** Current page */
  current: number;
  /** Total amount of pages */
  total: number;
  /** Whether to show previous page button */
  showPrev: boolean;
  /** Whether to show first page button */
  showFirst: boolean;
  /** Whether to show dots on the left to current page */
  showFirstDots: boolean;
  /** Whether to show dots on the right to current page */
  showLastDots: boolean;
  /** Show last page */
  showLast: boolean;
  /** Show next page button */
  showNext: boolean;
  /** Array of visible page numbers */
  visiblePages: number[]
  /** Function returning props for each page button */
  getPageProps: (pageNumber: number) => {[x: string]: any}
}

export default ({
  theme,
  config,
  current,
  getPageProps,
  total,
  meta,
  showPrev,
  showFirst,
  showFirstDots,
  showLastDots,
  showLast,
  showNext,

  visiblePages,
}: IPaginationProps) => {
  const query = useMemo(() => window && window.findify.utils.getQuery(), [meta]);

  const getHref = useCallback((page) => {
    if (!window || !window.findify) return;
    return (
      document.location.origin +
      document.location.pathname +
      window.findify.utils.buildQuery({ ...query, offset: (page - 1) * meta.get('limit') })
    )
  }, [query, meta]);

  return (
    <div className={theme.root} role="navigation" aria-label="Pagination Navigation">
      <Button
        href={getHref(current - 1)}
        display-if={showPrev}
        {...getPageProps(current - 1)}
        className={theme.prev}
      >
        <Icon name='ArrowLeft' />
        {config.getIn(['pagination', 'i18n', 'previous'], 'previous')}
      </Button>
      <Button
        display-if={showFirst}
        href={getHref(1)}
        {...getPageProps(1)}
        className={theme.first}
        aria-label={`${config.getIn(['a11y', 'goToPage'])} 1`}
      >
        1
    </Button>
      <Button display-if={showFirstDots} className={theme.dots} tabIndex={-1}>
        ...
    </Button>
      {
        visiblePages.map(page =>
          <Button
            href={getHref(page)}
            {...getPageProps(page)}
            className={cx(theme.page, current === page && theme.active)}
            aria-label={`${config.getIn(['a11y', 'goToPage'])} ${page}`}
          >
            {page}
          </Button>
        )
      }
      <Button display-if={showLastDots} className={theme.dots} tabIndex={-1}>
        ...
    </Button>
      <Button
        display-if={showLast}
        href={getHref(total)}
        {...getPageProps(total)}
        className={theme.last}
        aria-label={`${config.getIn(['a11y', 'goToPage'])} ${total}`}
      >
        {total}
      </Button>
      <Button
        display-if={showNext}
        href={getHref(current + 1)}
        {...getPageProps(current + 1)}
        className={theme.next}
      >
        {config.getIn(['pagination', 'i18n', 'next'], 'next')}
        <Icon name='ArrowRight' />
      </Button>
    </div>
  )
}
