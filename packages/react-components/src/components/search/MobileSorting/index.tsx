/**
 * @module components/search/MobileSorting
 */
import { withHandlers } from 'recompose';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import MapArray from 'components/common/MapArray';
import { ThemedSFCProps, ISortingItem, MJSConfiguration } from 'types';
import { is, List } from 'immutable';
import styles from 'components/search/MobileSorting/styles.css';
import useTranslations from 'helpers/useTranslations';
import useSortingLogic from 'helpers/useSortingLogic';
import { useCallback } from 'react';

/** Props that MobileSorting Item accepts */
export interface IMobileSortingItemProps extends ThemedSFCProps {
  /** Sorting item object to display */
  item: ISortingItem;
  /** Sorting item index in array */
  selected: ISortingItem;
  /** Click handler */
  onChange: (item?: ISortingItem) => void;
}

const Item = ({
  item,
  theme = styles,
  selected,
  onChange,
}: IMobileSortingItemProps) => {
  const onClick = useCallback((e) => {
    e.preventDefault();
    onChange(item);
  }, []);
  const isSelected = is(selected, item);

  return (
    <Button onClick={onClick} disabled={isSelected} className={theme.item}>
      <Text primary uppercase>
        <Icon
          name={isSelected ? 'RadioFilled' : 'RadioEmpty'}
          title={isSelected ? 'Selected' : 'Not selected'}
        />
        {item.get('label')}
      </Text>
    </Button>
  );
};

/** Props that MobileSorting view accepts */
export interface IMobileSortingProps extends ThemedSFCProps {
  /** Custom inline styles */
  style: React.CSSProperties;
  /** Method to hide modal from Drawer */
  hideModal: (e: MouseEvent) => any;
  /** MJS Configuration */
  config: MJSConfiguration;
}

export default ({ theme = styles, style, hideModal }: IMobileSortingProps) => {
  const [items, selected, onChange] = useSortingLogic();
  const translate = useTranslations();

  return (
    <div className={theme.root} style={style}>
      <div className={theme.header}>
        <div className={theme.title}>
          <Text primary uppercase>
            {translate('actions.sorting')}
          </Text>
        </div>

        <Button onClick={hideModal}>
          <Icon name="ArrowBack" title={translate('actions.back')} />
        </Button>
      </div>

      <div className={theme.body}>
        <MapArray
          onChange={onChange}
          theme={theme}
          selected={selected}
          array={items}
          factory={Item}
        />
      </div>

      <Button className={theme.footer} onClick={hideModal}>
        {translate('actions.seeResults')}
      </Button>
    </div>
  );
};
