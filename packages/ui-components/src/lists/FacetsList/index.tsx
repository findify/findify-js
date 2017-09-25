import * as React from 'react';
import {
  compose,
  branch,
  defaultProps,
  setDisplayName,
  renderComponent,
  renderNothing,
} from 'recompose';

import { MobileFacetsList } from 'internals/MobileFacetsList';
import { DesktopFacetsList } from 'internals/DesktopFacetsList';

const styles = require('./styles.css');

export const FacetsList: any = compose(
  setDisplayName('FacetsList'),
  defaultProps({
    isMobile: false,
  }),
  branch(
    ({ isMobile }) => isMobile,
    renderComponent(MobileFacetsList),
    renderComponent(DesktopFacetsList),
  ),
)(renderNothing);
