/**
 * @module layouts/Recommendation
 */

import { createElement } from 'react';
import { useConfig } from '@findify/react-connect';

import Grid from 'layouts/Recommendation/Grid';
import Slider from 'layouts/Recommendation/Slider';

/**
 * HOC that decides, which style recommendation to use,
 * based on configuration
 */
const Recommendation = () => {
  const { config } = useConfig();
  const template = config.get('template');
  if (template === 'swiper' || template === 'slider') return createElement(Slider);
  if (template === 'grid') return createElement(Grid);
  return null;
};

export default process.env.HOT
  ? require('react-hot-loader').hot(module)(Recommendation)
  : Recommendation;
