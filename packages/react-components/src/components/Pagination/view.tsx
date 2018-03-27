import React from 'react';
import cx from 'classnames';

import Button from 'components/Button';

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
}) => (
  <div className={theme.root}>
    <button display-if={showPrev} {...getPageProps(current - 1)} className={theme.prev}>
      { config.getIn(['pagination', 'i18n', 'previous'], 'previous') }
    </button>
    <button display-if={showFirst} {...getPageProps(1)} className={theme.first}>
      1
    </button>
    <button display-if={showFirstDots} className={theme.dots}>
      ...
    </button>
    {
      visiblePages.map(page =>
        <button {...getPageProps(page)} className={cx(theme.page, current === page && theme.active)}>
          { page }
        </button>
      )
    }
    <button display-if={showLastDots} className={theme.dots}>
      ...
    </button>
    <button display-if={showLast} {...getPageProps(total)} className={theme.last}>
      {total}
    </button>
    <button display-if={showNext} {...getPageProps(current +1)} className={theme.next}>
      { config.getIn(['pagination', 'i18n', 'next'], 'next') }
    </button>
  </div>
)
