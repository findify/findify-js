/**
 * @module components/Breadcrumbs
 */

import MapArray from 'components/common/MapArray';
import { compose, withPropsOnChange } from 'recompose';
import pure from 'helpers/pure';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';

import { FilterType, ThemedSFCProps, IFacet, MJSConfiguration } from 'types';
import { useMemo } from 'react';

/** Filter mapping type */
export type FilterMapping = { [x in FilterType]: React.SFC<any> };

export interface IFilterProps {
  /** Filter value */
  item: any;
  /** Filter mapping */
  mapping: FilterMapping;
  /** Filter type */
  type: FilterType;
  /** Filter name */
  name: string;
}

const Item = ({ mapping, theme, item, config: _config }: any) => {
  const [Content, config] = useMemo(() => {
    const _type = _config.getIn(['facets', 'types', name]) || item.get('type');
    const facetConfig = _config.getIn(['facets', _type]);
    return [mapping[_type], _config.merge(facetConfig)];
  }, [mapping]);

  return (
    <Button className={theme.breadcrumb} onClick={item.toggle}>
      <Text secondary uppercase className={theme.title}>
        <Content item={item} config={config} />
      </Text>
      <Icon className={theme.cross} name="XDark" title="Remove filter" />
    </Button>
  );
};

/** List of props that component returned by createBreadcrumb accepts */
export interface IFilterListProps extends ThemedSFCProps {
  /** Filter to create a component for */
  item: IFacet;
  /** MJS configuration */
  config: MJSConfiguration;
}

export default (mapping: FilterMapping) => ({
  item,
  theme,
  config,
}: IFilterListProps) => (
  <MapArray
    array={item.get('values')}
    name={item.get('name')}
    type={item.get('type')}
    theme={theme}
    factory={Item}
    mapping={mapping}
    config={config}
  />
);
