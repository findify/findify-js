import React from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import Component from 'components/Facet/Component';

export default ({
  FacetComponent,

  isOpen,
  theme,
  title,
  name,
  item,
  config,
  filtersSelected,
  toggleFacet
}) => (
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

