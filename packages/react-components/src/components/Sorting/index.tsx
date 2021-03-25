/**
 * @module components/Sorting
 */
import { useCallback, useMemo } from 'react';
import { useSort } from '@findify/react-connect';
import Icon from 'components/Icon';
import Text from 'components/Text';
import Dropdown from 'components/Dropdown';
import { MJSConfiguration, ISortingItem, ThemedSFCProps } from 'types';
import { List } from 'immutable';
import { Immutable } from '@findify/store-configuration';
import useTranslations from 'helpers/useTranslations';

import styles from 'components/Sorting/styles.css';

const getItemLabel = (i) =>
  `sorting.${[i.get('field'), i.get('order')].filter((i) => !!i).join(':')}`;

/** List of props Sorting view accepts */
export interface ISortingProps extends ThemedSFCProps {
  /** Callback called when sorting is changed */
  onChangeSort?: (value: any) => void;
  /** MJS configuration */
  config: MJSConfiguration;
  /** List of Sorting configurations */
  items: List<ISortingItem>;
  /** Current selected sorting configuration */
  selectedItem: ISortingItem;
}

export default ({ theme = styles }: ISortingProps) => {
  const { config, selected, onChangeSort } = useSort<Immutable.SearchConfig>();
  const t = useTranslations();

  const items = useMemo(() => {
    return config
      .getIn(['sorting', 'options'], List())
      .map((i) => i.set('label', t(getItemLabel(i))));
  }, []);

  const selectedItem = useMemo(() => {
    return items.find((i) => i.delete('label').equals(selected));
  }, [selected]);

  const onChange = useCallback((item) => {
    onChangeSort(item.get('field', 'default'), item.get('order', ''));
  }, []);

  return (
    <div className={theme.root}>
      <Icon name="Sorting" className={theme.icon} title="Sorting" />
      <Text primary uppercase className={theme.title}>
        {t('sort by')}:
      </Text>
      <Dropdown
        className={theme.dropdown}
        items={items}
        onChange={onChange}
        selectedItem={selectedItem}
      />
    </div>
  );
};
