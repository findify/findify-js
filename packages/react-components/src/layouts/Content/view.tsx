/**
 * @module layouts/ContentSearch
 */

import LazyResults from 'components/search/LazyResults';
import { IProduct, MJSConfiguration, MJSValue, ThemedSFCProps } from 'types';
import ContentCard from 'components/Cards/Content';

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

export default ({ config, theme }: IContentSearchProps) => (
  <LazyResults card={ContentCard} />
);
