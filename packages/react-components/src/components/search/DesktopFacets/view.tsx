import React from 'react';
import Branch from 'components/common/Branch';
import MapArray from 'components/common/MapArray';
import Facet from 'components/Facet';

const DefaultContent = ({ theme, children }) => <div>{children}</div>;

export default ({ config, facets }) =>
<Branch
  condition={config.getIn(['view', 'stickyFilters'])}
  left={DefaultContent}
>
  <MapArray array={facets} factory={Facet} config={config} keyAccessor={i => i.get('name')} />
</Branch>
