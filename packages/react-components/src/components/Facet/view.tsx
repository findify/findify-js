import React from 'react';
import Button from 'components/Button';
import Text from 'components/Text';

export default ({
  FacetComponent,

  isOpen,
  theme,
  title,
  name,
  item,
  config,

  toggleFacet
}) =>
<div className={theme.root}>
  <Button className={theme.title} onClick={toggleFacet}>
    <Text primary uppercase>{ title }</Text>
  </Button>
  <FacetComponent
    display-if={isOpen}
    facet={item}
    config={config}
    theme={{ root: theme.body }} />
</div>

