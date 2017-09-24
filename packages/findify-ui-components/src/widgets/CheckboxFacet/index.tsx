import * as React from 'react';
import { compose, withState, withHandlers } from 'recompose';

const { CheckboxBodyFacet } = require('internals/CheckboxBodyFacet');
import { GenericFacet } from 'internals/GenericFacet';
import withConfig from 'helpers/withConfig';

export const CheckboxFacet = withConfig({
  maxItemsCount: 6,
  rowHeight: 20,
  i18n: {
    search: 'Search',
    more: 'More',
    less: 'Less',
  },
})(props => (
  <GenericFacet {...props}>
    <CheckboxBodyFacet showExpander />
  </GenericFacet>
));
