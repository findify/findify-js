import React from 'react';
import ItemsList from 'components/ItemsList';
import Grid from 'components/common/Grid';
import MobileFacets from 'components/search/MobileFacets';
import DesktopFacets from 'components/search/DesktopFacets';
import Branch from 'components/helpers/Branch';
import PoweredBy from 'components/PoweredBy';

export default ({ config, isMobile, mobileFacetsOpened }) =>
<>
  <MobileFacets display-if={isMobile} />
  <Branch left={Grid} condition={!isMobile} columns='3|9'>
    <DesktopFacets display-if={!isMobile} />
    <>
      <ItemsList wrapper={Grid} columns='3'/>
      <PoweredBy />
    </>
  </Branch>
</>

