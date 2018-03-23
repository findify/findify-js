import React from 'react';
import MapArray from 'components/common/MapArray';
import { compose, withPropsOnChange } from 'recompose';
import pure from 'helpers/pure';

const Item = compose(
  withPropsOnChange(['mapping'], ({ name, type, mapping, item, config }) => {
    const _type = config.getIn(['facets', 'types', name]) || item.get('type');
    const facetConfig = config.getIn(['facets', _type]);
    return {
      Content: mapping[_type],
      config: config.merge(facetConfig)
    }
  }),
  pure,
)(({ theme, item, config, Content }: any) =>
  <div className={theme.breadcrumb}>
    <Content item={item} theme={theme} config={config} />
    <button onClick={item.toggle}>x</button>
  </div>
);

export default mapping => ({ item, children, theme, config }) =>
<MapArray
  array={item.get('values')}
  name={item.get('name')}
  type={item.get('type')}
  theme={theme}
  factory={Item}
  mapping={mapping}
  config={config} />
