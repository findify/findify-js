import React from 'react';

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
  <button className={theme.title} onClick={toggleFacet}>
    <strong>{ title }</strong>
  </button>
  <FacetComponent
    display-if={isOpen}
    facet={item}
    config={config}
    theme={{ root: theme.body }} />
</div>

