import * as React from 'react';
import { compose, pure } from 'recompose';
import { unescape } from 'lodash';

import { CheckboxBodyFacet } from 'internals/CheckboxBodyFacet';
import { RangeBodyFacet } from 'internals/RangeBodyFacet';
import { GenericFacet } from 'internals/GenericFacet';
import { Item } from 'internals/CheckboxBodyFacet/Rating';
import withConfig from 'helpers/withConfig';

const stateToProps = ({ values, config }) =>
  values.map(value => ({
    ...value,
    key: value.from + '_' + value.to,
    label: value.from,
  }));

export const RatingFacet: any = compose(
  pure,
  withConfig({
    maxItemsCount: 6,
    rowHeight: 20,
  }),
)(props => (
  <GenericFacet {...props} stateToProps={stateToProps}>
    <CheckboxBodyFacet itemComponent={Item} disableSlice />
  </GenericFacet>
));
