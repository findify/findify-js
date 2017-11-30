import { ColorFacet } from 'widgets/ColorFacet';
import { CheckboxFacet } from 'widgets/CheckboxFacet';
import { CategoryFacet } from 'widgets/CategoryFacet';
import { RangeFacet } from 'widgets/RangeFacet';
import { PriceFacet } from 'widgets/PriceFacet';
import { RatingFacet } from 'widgets/RatingFacet';
import { memoize } from 'lodash';

import { createFactory } from 'react';

export const mapTypeToFacet = memoize(
  (type: string) =>
    ({
      category: createFactory(CategoryFacet),
      text: createFactory(CheckboxFacet),
      range: createFactory(RangeFacet),
      color: createFactory(ColorFacet),
      price: createFactory(PriceFacet),
      rating: createFactory(RatingFacet),
    }[type])
);
