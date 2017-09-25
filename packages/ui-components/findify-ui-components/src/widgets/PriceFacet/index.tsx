import * as React from 'react';
import { compose, pure } from 'recompose';

import { CheckboxBodyFacet } from 'internals/CheckboxBodyFacet';
import { RangeBodyFacet } from 'internals/RangeBodyFacet';
import formatPrice from 'helpers/formatPrice';
import { GenericFacet } from 'internals/GenericFacet';
import withConfig from 'helpers/withConfig';

const Body = CheckboxBodyFacet;

const stateToProps = ({ values, config }) =>
  values.map(value => ({
    ...value,
    key: value.from + '_' + value.to,
    label: formatPrice({ from: value.from, to: value.to, config }),
  }));

export const PriceFacet: any = compose(
  pure,
  withConfig({
    maxItemsCount: 6,
    rowHeight: 20,
    i18n: {
      submit: 'go',
    },
  }),
)(props => (
  <GenericFacet {...props} stateToProps={stateToProps}>
    <Body disableSlice />
    <RangeBodyFacet useCurrency />
  </GenericFacet>
));
