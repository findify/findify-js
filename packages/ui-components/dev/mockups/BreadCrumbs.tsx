import * as React from 'react';
import { compose, withState } from 'recompose';
import config from '../data/config';

const props = {
  filters: [],
  onChange: console.log,
  total: 20,
  q: 'something',
  config: {
    facets: config.facets,
    templates: {
      results: 'Showing %s results for "<strong>%s</strong>"',
    },
  },
};

export default compose(
  withState('initialData', 'setData', props),
)(({ Component, initialData, setData }: any) => (
  <div style={{ margin: 50, width: 600, position: 'relative' }}>
    <Component
      {...initialData}
      onChange={index =>
        setData({
          ...initialData,
          filters: initialData.filters.filter((_, i) => index !== i),
        })}
    />
  </div>
));
