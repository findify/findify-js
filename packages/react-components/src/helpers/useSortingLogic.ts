import { useCallback, useMemo } from 'react';
import useTranslations from 'helpers/useTranslations';
import { List } from 'immutable';
import { useSort } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';

export const getItemLabel = (i) =>
  `sorting.${[i.get('field'), i.get('order')].filter((i) => !!i).join(':')}`;

export default () => {
  const { config, selected, onChangeSort } = useSort<Immutable.SearchConfig>();
  const t = useTranslations();
  const items = useMemo(() => {
    return config
      .getIn(['sorting', 'options'], List())
      .map((i) => i.set('label', t(getItemLabel(i))));
  }, []);

  const selectedItem = useMemo(() => {
    if (!selected) return items.find((i) => i.get('field') === 'default');
    return items.find((i) => i.delete('label').equals(selected));
  }, [selected]);

  const onChange = useCallback((item) => {
    onChangeSort(item.get('field', 'default'), item.get('order', ''));
  }, []);

  return [items, selectedItem, onChange];
};
