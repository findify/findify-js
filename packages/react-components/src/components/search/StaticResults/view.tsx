/**
 * @module components/search/StaticResults
 */

import React from 'react';
import ItemsList from 'components/ItemsList';
import Grid from 'components/common/Grid';
import PoweredBy from 'components/PoweredBy';
import Pagination from 'components/Pagination';
import { ThemedSFCProps, MJSConfiguration } from 'types/index';

/** Props that StaticResults accepts */
interface IStaticResultsProps extends ThemedSFCProps {
  /** MJS Configuration */
  config: MJSConfiguration;
  /** Number of columns for StaticResults */
  columns: number;
};

const StaticResultsView = ({ columns, theme, config }: IStaticResultsProps) =>
<div className={theme.root}>
  <ItemsList wrapper={Grid} columns={columns} config={config} />
  <Pagination />
  <PoweredBy />
</div>

export default StaticResultsView;
