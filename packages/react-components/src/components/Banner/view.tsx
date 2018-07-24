/**
 * @module components/Banner
 */

import React from 'react';
import { ThemedSFCProps, IBanner } from 'types';
import { branch, renderComponent } from 'recompose';

/** Props that Banner component accepts */
export interface IBannerProps extends ThemedSFCProps {
  /** Banner being shown */
  banner: IBanner;
  [x: string]: any;
}

const BannerComponent = branch<{ href: any, [x: string]: any }>(
  ({ href }) => !!href,
  renderComponent('a'),
  renderComponent('div')
)(null);

const BannerView: React.SFC<IBannerProps> =  ({ banner, theme, ...rest }: IBannerProps) =>
<BannerComponent
  display-if={banner && !banner.isEmpty()}
  href={banner.getIn(['products', 'targetUrl'])}
  className={theme.root}>
  <img
    src={banner.getIn(['products', 'imageUrl'])}
    alt={banner.getIn(['products', 'title'])}
    className={theme.image} />
</BannerComponent>


export default BannerView;
