/**
 * @module components/Breadcrumbs
 */

import MapArray from 'components/common/MapArray';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';

import { FilterType, ThemedSFCProps, IFacet, MJSConfiguration } from 'types';
import { useMemo } from 'react';
import { Immutable } from '@findify/store-configuration';

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

  config: Immutable.SearchConfig;

  theme: any;
}

const Item = ({
  mapping,
  theme,
  item,
  name,
  config: _config,
}: IFilterProps) => {
  const [Content, config] = useMemo(() => {
    const facetConfig = _config.getIn(['facets', 'filters', name]);
    const _type = facetConfig?.get('type') || item.get('type');
    return [mapping[_type], _config.merge(facetConfig)];
  }, [mapping]);

  return (
    <Button className={theme.breadcrumb} onClick={item.toggle}>
      <Text secondary uppercase className={theme.title}>
        <Content item={item} config={config} theme={theme} />
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
    factory={Item}
    theme={theme}
    mapping={mapping}
    config={config}
  />
);
