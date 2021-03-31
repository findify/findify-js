/**
 * @module components/Banner
 */

import { createElement } from 'react';
import { ThemedSFCProps, IBanner } from 'types';
import styles from 'components/Banner/styles.css';
import { useBanner } from '@findify/react-connect';

/** Props that Banner component accepts */
export interface IBannerProps extends ThemedSFCProps {
  /** Banner being shown */
  banner: IBanner;
  [x: string]: any;
}

const BannerComponent = ({ href, ...rest }) =>
  createElement(href ? 'a' : 'div', rest);

export default ({ theme = styles }: IBannerProps) => {
  const { banner } = useBanner();
  return (
    <BannerComponent
      display-if={banner && !banner.isEmpty()}
      href={banner.getIn(['products', 'targetUrl'])}
      role="banner"
      className={theme.root}
    >
      <img
        src={banner.getIn(['products', 'imageUrl'])}
        alt={banner.getIn(['products', 'title'])}
        className={theme.image}
      />
    </BannerComponent>
  );
};
