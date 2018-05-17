/**
 * @module components/Pagination
 */

import React from 'react';
import cx from 'classnames';

import Button from 'components/Button';
import Icon from 'components/Icon';
import { ThemedSFCProps, MJSConfiguration } from 'types';

/** Props that Pagination view accepts */
interface IPaginationProps extends ThemedSFCProps {
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

  showPrev,
  showFirst,
  showFirstDots,
  showLastDots,
  showLast,
  showNext,

  visiblePages,
}: IPaginationProps) => (
  <div className={theme.root}>
    <Button display-if={showPrev} {...getPageProps(current - 1)} className={theme.prev}>
      <Icon name='ArrowLeft' />
      { config.getIn(['pagination', 'i18n', 'previous'], 'previous') }
    </Button>
    <Button display-if={showFirst} {...getPageProps(1)} className={theme.first}>
      1
    </Button>
    <Button display-if={showFirstDots} className={theme.dots}>
      ...
    </Button>
    {
      visiblePages.map(page =>
        <Button {...getPageProps(page)} className={cx(theme.page, current === page && theme.active)}>
          { page }
        </Button>
      )
    }
    <Button display-if={showLastDots} className={theme.dots}>
      ...
    </Button>
    <Button display-if={showLast} {...getPageProps(total)} className={theme.last}>
      {total}
    </Button>
    <Button display-if={showNext} {...getPageProps(current +1)} className={theme.next}>
      { config.getIn(['pagination', 'i18n', 'next'], 'next') }
      <Icon name='ArrowRight' />
    </Button>
  </div>
)
