/**
 * @module components/Sorting
 */
import Icon from 'components/Icon';
import Text from 'components/Text';
import Dropdown from 'components/Dropdown';
import { ThemedSFCProps } from 'types';
import useTranslations from 'helpers/useTranslations';

import styles from 'components/Sorting/styles.css';
import useSortingLogic from 'helpers/useSortingLogic';
import { memo } from 'react';

export default memo(({ theme = styles }: ThemedSFCProps) => {
  const [items, selected, onChange] = useSortingLogic();
  const translate = useTranslations();

  return (
    <div className={theme.root}>
      <Icon
        name="Sorting"
        className={theme.icon}
        title={translate('actions.sortBy')}
      />
      <Text primary uppercase className={theme.title}>
        {translate('actions.sortBy')}:
      </Text>
      <Dropdown
        className={theme.dropdown}
        items={items}
        onChange={onChange}
        selectedItem={selected}
      />
    </div>
  );
});
