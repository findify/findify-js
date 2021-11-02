/**
 * @module components/Banner
 */

import { createElement, memo } from 'react';
import { ThemedSFCProps } from 'types';
import styles from 'components/Banner/styles.css';
import { useBanner } from '@findify/react-connect';

const BannerComponent = ({ href, ...rest }) =>
  createElement(href ? 'a' : 'div', { ...rest, href }); 

export default memo(({ theme = styles }: ThemedSFCProps) => {
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
});
