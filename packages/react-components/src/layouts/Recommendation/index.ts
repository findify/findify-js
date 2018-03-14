import { createElement } from 'react';
import { connectConfig } from '@findify/react-connect';
import { hot } from 'react-hot-loader';

import Grid from './Grid';
import Slider from './Slider';

const Recommendation = connectConfig(({ config }) => {
  const template = config.get('template');
  if (template === 'grid') return createElement(Grid);
  if (template === 'slider') return createElement(Slider);
  return null;
});

export default hot(module)(Recommendation);
