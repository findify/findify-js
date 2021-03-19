/**
 * @module components/search/MobileSorting
 */

import * as React from 'react';
import { withHandlers } from 'recompose';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import MapArray from 'components/common/MapArray';
import { ThemedSFCProps, ISortingItem, MJSConfiguration } from 'types';
import { List } from 'immutable';

/** Props that MobileSorting Item accepts */
export interface IMobileSortingItemProps extends ThemedSFCProps {
  /** Sorting item object to display */
  item: ISortingItem;
  /** Sorting item index in array */
  index: number;
  /** Click handler */
  onClick: (evt?: React.MouseEvent<any>) => any;
}

const Item = withHandlers({
  onClick: ({ onClick, index }) => () => onClick(index),
})(({ item, theme, onClick }: IMobileSortingItemProps) => (
  <Button
    onClick={onClick}
    disabled={item.get('selected')}
    className={theme.item}
  >
    <Text primary uppercase>
      <Icon
        name={item.get('selected') ? 'RadioFilled' : 'RadioEmpty'}
        title={item.get('selected') ? 'Selected' : 'Not selected'}
      />
      {item.get('label')}
    </Text>
  </Button>
));

/** Props that MobileSorting view accepts */
export interface IMobileSortingProps extends ThemedSFCProps {
  /** Custom inline styles */
  style: React.CSSProperties;
  /** Method to hide modal from Drawer */
  hideModal: (name: string) => any;
  /** MJS Configuration */
  config: MJSConfiguration;
  /** Sorting items as immutable.List() */
  items: List<ISortingItem>;
  /** Method used to set needed sorting */
  setSorting: (index: number) => any;
}

const MobileSortingView = ({
  theme,
  style,
  hideModal,
  config,
  items,
  setSorting,
}: IMobileSortingProps) => (
  <div className={theme.root} style={style}>
    <div className={theme.header}>
      <div className={theme.title}>
        <Text primary uppercase>
          {config.getIn(['sorting', 'i18n', 'sorting'], 'Sorting')}
        </Text>
      </div>

      <Button onClick={hideModal}>
        <Icon name="ArrowBack" title="Go back" />
      </Button>
    </div>

    <div className={theme.body}>
      <MapArray
        onClick={setSorting}
        theme={theme}
        array={items}
        factory={Item}
      />
    </div>

    <Button className={theme.footer} onClick={hideModal}>
      {config.getIn(['facets', 'i18n', 'showResults'], 'See results')}
    </Button>
  </div>
);

export default MobileSortingView;
