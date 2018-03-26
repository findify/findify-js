import { createElement } from 'react';

import arrow from './icons/arrow.svg';

const icons = {
  arrow
}

export default ({ name, width = 16, height = 16, className }) =>
  createElement(icons[name], { width, height, className })

