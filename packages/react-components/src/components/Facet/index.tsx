/**
 * @module components/Facet
 */
import cx from 'classnames';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import Component from 'components/Facet/Component';
import { ThemedSFCProps, IFacet } from 'types';
import { useCallback, useMemo, useRef } from 'react';
import styles from 'components/Facet/styles.css';
import { Immutable } from '@findify/store-configuration';

/** Props that Facet view accepts */
export interface IFacetProps extends ThemedSFCProps {
  /** Facet component to render */
  FacetComponent: React.Component<any>;
  /** List of openFacets */
  openFacets: string[];
  /** Flag to show if facet is opened on mobile */
  isMobile?: boolean;
  /** Flag to show if facets orientation is mobile */
  isHorizontal?: boolean;
  /** Title of facet */
  title: string;
  /** Facet object */
  item: IFacet;
  /** MJS Configuration */
  config: Immutable.SearchConfig;
  /** Filters selected in facet */
  filtersSelected: number;
  /** Function to toggle open / closed state of facet */
  onToggle: (name: string) => void;

  /** Amount of items to be shown in "collapsed" mode */
  collapsedItemsCount?: number;
}

export default ({
  theme = styles,
  item,
  config: _config,
  isMobile,
  isHorizontal,
  onToggle,
  openFacets,
}: IFacetProps) => {
  const { current: config } = useRef(
    _config.merge(_config.getIn(['facets', 'filters', item.get('name')]))
  );

  const selectedItemsCount = useMemo(
    () => item.get('values').filter((item) => item.get('selected')).size,
    [item]
  );

  const title = config.get('label') || item.get('name');
  const isOpen = openFacets.includes(item.get('name'));

  const onClick = useCallback(() => {
    onToggle(item.get('name'));
  }, []);

  return (
    <div
      className={cx(theme.root, {
        [theme.horizontal]: isHorizontal,
        [theme.mobile]: isMobile,
        [theme.expanded]: isOpen,
      })}
    >
      <Button
        className={theme.title}
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`facet-${item.get('name')}`}
        tabIndex={0}
      >
        <Text primary uppercase className={theme.text}>
          {title} {selectedItemsCount ? `(${selectedItemsCount})` : ''}
        </Text>
        <Icon
          name={isOpen ? 'Minus' : 'Plus'}
          className={theme.icon}
          title={isOpen ? 'Collapse list' : 'Expand list'}
        />
      </Button>
      <div className={theme.body} hidden={!isOpen}>
        <Component facet={item} config={config} isMobile={isMobile} />
      </div>
    </div>
  );
};
