/**
 * @module components/autocomplete/Layout
 */
import { Fragment, useEffect, useMemo } from 'react';
import Products from 'components/autocomplete/Products';
import Suggestions from 'components/autocomplete/Suggestions';
import Content from 'components/autocomplete/Content';
import Grid from 'components/common/Grid';
import { Immutable } from '@findify/store-configuration';
import { useRef } from 'react';
import { useAnnouncement } from 'components/common/Announcement';
import useArrowSelection from 'helpers/useArrowSelection';
import styles from 'components/autocomplete/Layout/styles.css';

export interface LayoutProps {
  config: Immutable.AutocompleteConfig;
  className?: string;
  isTrendingSearches?: boolean;
  theme: Record<string, string>;
}

const getContent = (type) =>
  ({
    suggestions: Suggestions,
    products: Products,
  }[type] || Content);

const Item = ({
  config,
  type,
  ...rest
}: {
  config: Immutable.AutocompleteConfig;
  type: 'products' | 'suggestions' | string;
  isTrendingSearches?: boolean;
  highlightedItem: any;
  registerItems: (number) => void;
}) => {
  const [Content, _config] = useMemo(
    () => [
      getContent(type),
      config.merge(config.get(type) || config.getIn(['content', type])),
    ],
    []
  );

  return <Content type={type} config={_config} {...rest} />;
};

export default ({
  config,
  className,
  isTrendingSearches,
  theme = styles,
}: LayoutProps) => {
  const { current: layout } = useRef(config.get('layout'));
  const [highlightedItem, registerItems] = useArrowSelection();

  /** ACCESSIBILITY */
  const [announcement, setAnnouncement] = useAnnouncement();
  useEffect(() => {
    if (!highlightedItem) return;
    config
      .get('node')
      .setAttribute('aria-activedescendant', highlightedItem.hashCode());
    setAnnouncement(
      highlightedItem.get('title') || highlightedItem.get('title')
    );
  }, [highlightedItem]);
  /** === */

  return (
    <>
      <Grid
        className={className}
        columnClass={theme.column}
        columns={config.getIn(['breakpoints', 'layout'])}
      >
        {layout.map((content, column) => (
          <Fragment key={`column-${String(column)}`}>
            {content.map((type) => (
              <Item
                key={type}
                type={type}
                config={config}
                registerItems={registerItems}
                highlightedItem={highlightedItem}
                isTrendingSearches={isTrendingSearches}
              />
            ))}
          </Fragment>
        ))}
      </Grid>
      {announcement}
    </>
  );
};
