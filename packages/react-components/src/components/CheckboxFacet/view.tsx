/**
 * @module components/CheckboxFacet
 */

import React, { ChangeEvent } from 'react';
import cx from 'classnames';

import MapArray from 'components/common/MapArray';
import Item from 'components/CheckboxFacet/Item';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import Loadable from 'react-loadable';

import { IFacetValue, ThemedSFCProps, MJSConfiguration, IFacet } from 'types';
import { List } from 'immutable'
import chunks from 'helpers/chunks';

/** Props that CheckboxFacet accepts */
export interface ICheckboxFacetProps extends ThemedSFCProps {
  /** List of facet values available for toggling */
  items: List<IFacetValue>;

  facet: IFacet;

  /** MJS Configuration */
  config: MJSConfiguration;
  /** Search string for filtering facet values */
  search?: string;
  /** Flag shows whether search functionality is enabled */
  isExpanded?: boolean;
  /** Flag to show if facet is opened on mobile */
  isMobile?: boolean;
  /** Callback invoked on search input change */
  onSearch: (evt: ChangeEvent<HTMLInputElement>) => any;
  /** Callback invoked on request to expand list completely */
  onToggle: (evt: Event) => any;

  hidden: boolean
}

const VirtualizedList = Loadable({
  loader: chunks.components.virtualizedList,
  loading: () => null
})

const CheckboxFacetView =  ({
  theme,
  items,
  config,
  search,
  isExpanded,
  onSearch,
  onToggle,
  isMobile,
  facet,
  hidden,
}: ICheckboxFacetProps) => console.log(hidden) || (
  <div
    className={cx(theme.root, { [theme.mobile]: isMobile })}
    id={`facet-${facet.get('name')}`}
    role="region"
    hidden={hidden}
  >

    <div className={theme.search} display-if={isExpanded}>
      <input
        placeholder={config.getIn(['i18n', 'search']) as string}
        className={theme.input}
        onChange={onSearch}
        value={search}/>
      <Icon name='Search' className={theme.icon} />
    </div>

    <section role="list">
      <MapArray
        display-if={config.get('pullSelected')}
        array={items.filter(i => i.get('selected'))}
        factory={Item}
        theme={theme} />

      <VirtualizedList
        display-if={isExpanded}
        factory={(props) => Item({ ...props, onItemClick: () => onSearch('') })}
        theme={theme}
        config={config} 
        className={theme.expandedList}
        height={config.get('expandedHeight')}
        array={
          config.get('pullSelected')
            ? items.filter(i => !i.get('selected'))
            : items
        }
      />

      <MapArray
        display-if={!isExpanded}
        array={
          config.get('pullSelected')
            ? items.filter(i => !i.get('selected'))
            : items
        }
        factory={Item}
        theme={theme}
          limit={config.get('maxItemsCount')} />
    </section>

    <Button
      className={theme.expand}
      onClick={onToggle}
      display-if={items.size > (config.get('maxItemsCount') as number)}>
      <Text primary uppercase>
        <Icon name={isExpanded ? 'Minus' : 'Plus'} />
        { isExpanded ? config.getIn(['i18n', 'less']) : config.getIn(['i18n', 'more']) }
      </Text>
    </Button>

  </div>
)

export default CheckboxFacetView
