/**
 * @module components/Banner
 */

import React from 'react';
import { ThemedSFCProps, IBanner } from 'types';

/** Props that Banner component accepts */
export interface IBannerProps extends ThemedSFCProps {
  /** Banner being shown */
  banner: IBanner;
  [x: string]: any;
}

const BannerView: React.SFC<IBannerProps> =  ({ banner, theme, ...rest }: IBannerProps) =>
<a
  display-if={banner && !banner.isEmpty()}
  href={banner.getIn(['products', 'targetUrl'])}
  className={theme.root}>
  <img
    src={banner.getIn(['products', 'imageUrl'])}
    alt={banner.getIn(['products', 'title'])}
    className={theme.image} />
</a>


export default BannerView;
