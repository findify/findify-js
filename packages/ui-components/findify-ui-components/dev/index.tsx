import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { withMockup } from './helpers/withMockup';
import '../src/styles.global.css';

const render = (widgets = require('../src/index')) => {
  const root = document.getElementById('root');

  ReactDOM.render(
    <AppContainer>
      <div className="frame-content">
        {Object.keys(widgets).map(key => withMockup(key)(widgets[key]))}
      </div>
    </AppContainer>,
    root,
  );
};

if (
  ['complete', 'loaded', 'interactive'].includes(document.readyState) &&
  document.body
) {
  render();
} else {
  document.addEventListener('DOMContentLoaded', () => render(), false);
}

if (module.hot) {
  module.hot.accept('../src/index', () => {
    render(require('../src/index'));
  });
}
