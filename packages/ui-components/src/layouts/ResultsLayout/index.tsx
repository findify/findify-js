import * as React from 'react';
import * as cx from 'classnames';
import { compose, defaultProps, withPropsOnChange } from 'recompose';
import sizeMe from 'react-sizeme';
import { Grid } from 'widgets/Grid';
import { BreadCrumbs } from 'widgets/BreadCrumbs';
import { Sorting } from 'widgets/Sorting';
import { Pagination } from 'widgets/Pagination';
import { ProductsList } from 'lists/ProductsList';
import { FacetsLayout } from '../FacetsLayout';
import { Button } from 'internals/Button';
import { Banner } from 'internals/Banner';
import { PoweredBy } from 'internals/PoweredBy';
import { LoadNext, LoadPrev } from 'internals/InfiniteLoader';
import withHooks from 'helpers/withHooks';
import withConfig from 'helpers/withConfig';
import { calculateLayoutColumns } from 'helpers/columnsSize';

const styles = require('./styles.css');

export const ResultsLayout = compose(
  withConfig({
    view: {
      pagination: true,
      infinite: false,
    },
  }),
  defaultProps({
    showFacets: true,
    columns: {
      facets: 3,
      products: 9,
    },
  }),
  withPropsOnChange(['isMobile'], ({ isMobile }) => ({
    showMobileHeader: !!isMobile,
    showFacets: !isMobile,
    showBreadcrumbs: !isMobile,
  })),
  withHooks('results')
)(
  ({
    onFacetsChange,
    onProductClick,
    onPageChange,
    onSortChange,
    onBreadCrumbRemove,
    onMobileFacetsOpen,
    onBannerClick,
    onPoweredByClick,
    onLoadPrev,
    onLoadNext,
    onClearAll,

    config,
    isMobile,
    showMobileHeader,
    showFacets,
    showBreadcrumbs,
    type,
    isLoading,
    columns,

    response,
  }: any) => (
    <div className={styles.root}>
      {showBreadcrumbs && (
        <BreadCrumbs
          {...response.meta}
          className={styles.breadcrumbs}
          onChange={onBreadCrumbRemove}
          displayQuery={type !== 'collection'}
          config={{
            ...config.breadcrumbs,
            facets: config.facets,
            currency: config.currency,
          }}
        />
      )}

      {!showMobileHeader && (
        <Sorting
          className={styles.sort}
          value={!!response.meta.sort.length && response.meta.sort[0]}
          onChange={onSortChange}
          options={config.sorting.options}
          config={config.sorting}
        />
      )}

      {showMobileHeader && (
        <Grid columns="6|6">
          <Button
            onClick={onMobileFacetsOpen}
            className={styles.mobileFacetsButton}
            columnClass={styles.paddingRight}
          >
            {config.facets.i18n.showMobileFacets}
            {response.meta.filters &&
              !!response.meta.filters.length &&
              ` (${response.meta.filters.length})`}
          </Button>

          <Sorting
            isMobile={isMobile}
            columnClass={styles.paddingLeft}
            className={cx(styles.sort, styles.mobileSort)}
            value={!!response.meta.sort.length && response.meta.sort[0]}
            onChange={onSortChange}
            options={config.sorting.options}
            config={config.sorting}
          />
        </Grid>
      )}

      <Grid
        columns={showFacets ? `${columns.facets}|${columns.products}` : '12'}
      >
        {showFacets && (
          <FacetsLayout
            {...{
              isMobile,
              config,
              response,
              onFacetsChange,
              onClearAll,
              columnClass: styles.facets,
            }}
          />
        )}

        <div className={styles.products}>
          {response.banner &&
            response.banner.products && (
              <Banner {...response.banner.products} onClick={onBannerClick} />
            )}

          {!!config.view.infinite && (
            <LoadPrev
              config={config.loadMore}
              items={response.items}
              meta={response.meta}
              isLoading={isLoading}
              onClick={onLoadPrev}
            />
          )}

          {
            <ProductsList
              config={{
                ...config,
                ...config.productsGrid,
              }}
              columnClass={styles.product}
              items={response.items}
              onProductClick={onProductClick}
            />
          }

          {!!config.view.pagination &&
            !!response.meta.total &&
            response.meta.total > response.meta.limit && (
              <Pagination
                className={styles.pagination}
                onChange={onPageChange}
                style={{ textAlign: 'center' }}
                config={config.pagination}
                total={Math.ceil(response.meta.total / response.meta.limit)}
                current={
                  Math.ceil(response.meta.offset / response.meta.limit) + 1
                }
              />
            )}

          {!!config.view.infinite && (
            <LoadNext
              config={config.loadMore}
              isMobile={isMobile}
              isLoading={isLoading}
              meta={response.meta}
              onChange={onLoadNext}
            />
          )}

          {!!config.poweredByFindify && (
            <PoweredBy onClick={onPoweredByClick} />
          )}
        </div>
      </Grid>
    </div>
  )
);
