/**
 * @module components/CategoryFacet
 */
import MapArray from 'components/common/MapArray';
import Item from 'components/CategoryFacet/Item';
import Button from 'components/Button';
import Text from 'components/Text';
import { IFacet, ThemedSFCProps, MJSConfiguration } from 'types';
import { List, Map } from 'immutable';
import Icon from 'components/Icon';
import useTranslations from 'helpers/useTranslations';

import styles from 'components/CategoryFacet/styles.css';
import { useMemo, useState } from 'react';

/** CategoryFacet props */
export interface ICategoryFacetProps extends ThemedSFCProps {
  /** Categories facet */
  facet: IFacet;
  /** Facet items */
  items: List<Map<string, string | boolean | number>>;
  /** Total count of selected facets */
  total: number;
  /** MJS Configuration */
  config: MJSConfiguration;
  /** Flag shows whether search functionality is enabled */
  isExpanded?: boolean;
  /** Callback invoked on request to expand list completely */
  onToggle: (evt: Event) => any;

  hidden: boolean;

  isMobile?: boolean;
}

export default ({
  theme = styles,
  config,
  facet,
  hidden,
  isMobile,
}: ICategoryFacetProps) => {
  const translate = useTranslations();
  const [isExpanded, setExpanded] = useState(false);
  const [items, total] = useMemo(() => {
    const items = facet.get('values');
    const total = items.reduce((acc, v) => acc + v.get('count'), 0);
    return [items, total];
  }, [facet]);

  return (
    <div
      className={theme.root}
      id={`facet-${facet.get('name')}`}
      role="region"
      hidden={hidden}
    >
      <Button className={theme.item} onClick={facet.resetValues}>
        <Text
          lowercase
          primary
          bold={!items.find((i) => i.get('selected') as boolean)}
          className={theme.content}
        >
          {translate('facets.allCategories')}
        </Text>
        <Text secondary uppercase>
          ({total})
        </Text>
      </Button>
      <MapArray
        config={config}
        array={items}
        factory={Item}
        limit={!isExpanded && config.get('maxItemsCount', 6)}
        isMobile={isMobile}
      />

      <Button
        className={theme.expand}
        onClick={() => setExpanded((exp) => !exp)}
        display-if={items.size > config.get('maxItemsCount', 6)}
      >
        <Text primary uppercase>
          <Icon
            name={isExpanded ? 'Minus' : 'Plus'}
            title={isExpanded ? 'Expanded' : 'Collapsed'}
          />
          {isExpanded ? translate('facets.less') : translate('facets.more')}
        </Text>
      </Button>
    </div>
  );
};
