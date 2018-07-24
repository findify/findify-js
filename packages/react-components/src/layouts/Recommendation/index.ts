/**
 * @module layouts/Recommendation
 */

import { createElement } from 'react';
import { connectConfig } from '@findify/react-connect';

import Grid from 'layouts/Recommendation/Grid';
import Slider from 'layouts/Recommendation/Slider';
import { hot } from 'react-hot-loader';

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

export default hot(module)(Recommendation);
