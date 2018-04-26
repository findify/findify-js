import React from 'react';
import MapArray from 'components/common/MapArray';
import { compose, withPropsOnChange } from 'recompose';
import pure from 'helpers/pure';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';

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
  <Button className={theme.breadcrumb} onClick={item.toggle}>
    <Text secondary uppercase className={theme.title}>
      <Content item={item} theme={theme} config={config} />
    </Text>
    <Icon className={theme.cross} name='XDark' />
  </Button>
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
