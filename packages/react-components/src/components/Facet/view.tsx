/**
 * @module components/Facet
 */

import React from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import Component from 'components/Facet/Component';
import { ThemedSFCProps, IFacet, MJSConfiguration } from 'types';

/** Props that Facet view accepts */
export interface IFacetProps extends ThemedSFCProps {
  /** Facet component to render */
  FacetComponent: React.Component<any>;
  /** Flag to show open / closed state of facet */
  isOpen?: boolean;
  /** Title of facet */
  title: string;
  /** Facet object */
  item: IFacet;
  /** MJS Configuration */
  config: MJSConfiguration;
  /** Filters selected in facet */
  filtersSelected: number;
  /** Function to toggle open / closed state of facet */
  toggleFacet: () => any
}

const FacetView = ({
  FacetComponent,
  isOpen,
  theme,
  title,
  item,
  config,
  filtersSelected,
  toggleFacet
}: IFacetProps) => (
  <div className={theme.root}>
    <Button className={theme.title} onClick={toggleFacet}>
      <Text primary uppercase className={theme.text}>{ title } {filtersSelected > 0 ? `(${filtersSelected})` : ''}</Text>
      <Icon name={isOpen ? 'Minus' : 'Plus'} className={theme.icon} />
    </Button>
    <Component
      display-if={isOpen}
      facet={item}
      config={config}
      theme={{ root: theme.body }} />
  </div>
)

export default FacetView;
