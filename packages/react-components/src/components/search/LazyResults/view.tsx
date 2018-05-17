/**
 * @module components/search/LazyResults
 */

import React from 'react';
import MapArray from 'components/common/MapArray';
import Grid from 'components/common/Grid';
import ProductCard from 'components/Cards/Product'
import Button from 'components/Button';
import Text from 'components/Text';
import { ThemedSFCProps, IProduct, MJSConfiguration } from 'types';
import { List } from 'immutable';
import { ArrayLike } from 'components/common/MapArray';

/** Props that LazyResultsView accepts */
interface ILazyResultsProps extends ThemedSFCProps {
  /** List of Products */
  items: List<IProduct>;
  /** MJS Configuration */
  config: MJSConfiguration;
  /** Number of columns in a grid */
  columns: number;
  /** Method to load next page */
  onLoadNext: () => any;
  /** Method to load previous page */
  onLoadPrev: () => any;
  /** Flag whether to display next button */
  displayNextButton: boolean;
  /** Flag whether to display previous button */
  displayPrevButton: boolean;
  /** Rest of the props get passed down to ProductCard */
  [x: string]: any
}

const LazyResultsView = ({
  items,
  config,
  theme,
  columns,
  onLoadNext,
  onLoadPrev,
  displayNextButton,
  displayPrevButton,
  ...rest
}: ILazyResultsProps) =>
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
        array: (items as ArrayLike),
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

export default LazyResultsView;
