/**
 * @module layouts/ContentSearch
 */
import styles from 'layouts/Content/styles.css';

import LazyResults from 'components/search/LazyResults';
import StaticResults from 'components/search/StaticResults';
import CombinedResults from 'components/search/CombinedResults';
import { MJSConfiguration, MJSValue, ThemedSFCProps } from 'types';
import ContentCard from 'components/Cards/Content';
import { useItems } from '@findify/react-connect';
import Branch from 'components/common/Branch';

/** This is a list of props ContentSearchLayout accepts */
export interface IContentSearchProps extends ThemedSFCProps {
  /** MJS configuration */
  config: MJSConfiguration;
  /** MJS Request meta-information, like query, offset, limits */
  meta: Map<string, MJSValue>;
  /** Flag that tells ContentSearchView to render in mobile mode */
  isMobile?: boolean;
  /** Flag to pull filters to the right on desktop */
  filtersOnRight?: boolean;
}

const Content = ({ theme = styles }: IContentSearchProps) => {
  const { items, config } = useItems();
  const paginationConfig =
    config.getIn(['pagination', 'type']).toString() ?? '';

  if (!items?.size) return null;
  switch (paginationConfig) {
    case 'lazy':
      return <LazyResults card={ContentCard} itemConfig={config.get('item')} />;
    case 'static':
      return <StaticResults itemConfig={config.get('item')} />;
    case 'combined':
      return (
        <CombinedResults card={ContentCard} itemConfig={config.get('item')} />
      );
  }
};

export default process.env.HOT
  ? require('react-hot-loader').hot(module)(Content)
  : Content;
