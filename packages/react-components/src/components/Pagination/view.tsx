import React from 'react';
import cx from 'classnames';

import Button from 'components/Button';
import Icon from 'components/Icon';

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
