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
    <Button display-if={showPrev} {...getPageProps(current - 1)}>
      { config.getIn(['i18n', 'previous'], null) }
    </Button>
    <Button display-if={showFirst} {...getPageProps(1)}>1</Button>
    <Button display-if={showFirstDots}>...</Button>
    {
      visiblePages.map(page =>
        <Button {...getPageProps(page)} active={current === page}>
          { page }
        </Button>
      )
    }
    <Button display-if={showLastDots}>...</Button>
    <Button display-if={showLast} {...getPageProps(total)}>{total}</Button>
    <Button display-if={showNext} {...getPageProps(current +1)}>
      { config.getIn(['i18n', 'next'], null) }
    </Button>
  </div>
)
