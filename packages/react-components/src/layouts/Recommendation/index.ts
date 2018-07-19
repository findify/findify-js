/**
 * @module layouts/Recommendation
 */

import { createElement } from 'react';
import { connectConfig } from '@findify/react-connect';

import Grid from 'layouts/Recommendation/Grid';
import Slider from 'layouts/Recommendation/Slider';


/**
 * HOC that decides, which style recommendation to use,
 * based on configuration
 */
const Recommendation = connectConfig(({ config }) => {
  const template = config.get('template');
  if (template === 'grid') return createElement(Grid);
  if (template === 'slider') return createElement(Slider);
  return null;
});

export default process.env.HOT ? require('react-hot-loader').hot(module)(Recommendation) : Recommendation;
