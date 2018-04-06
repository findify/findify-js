import React from 'react';
import MapArray from 'components/common/MapArray';
import Grid from 'components/common/Grid';
import ProductCard from 'components/productcard/ProductCard'
import Button from 'components/Button';
import Text from 'components/Text';

export default ({
  items,
  config,
  theme,
  columns,
  onLoadNext,
  onLoadPrev,
  displayNextButton,
  displayPrevButton,
  ...rest
}) =>
<div className={theme.root}>
  <Button display-if={displayPrevButton} className={theme.prevButton} onClick={onLoadPrev}>
    <Text primary lowercase>
      { config.getIn(['i18n', 'loadPrev'], 'Load previous') }
    </Text>
  </Button>
  <Grid columns={columns}>
    { 
      MapArray({
        ...rest,
        config,
        array: items,
        factory: ProductCard
      })
    }
  </Grid>
  <Button display-if={displayNextButton} className={theme.nextButton} onClick={onLoadNext}>
    <Text primary lowercase>
      { config.getIn(['i18n', 'loadNext'], 'Load more') }
    </Text>
  </Button>
</div>
