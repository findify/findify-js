/**
 * @module components/Facet
 */
import TextFacet from 'components/CheckboxFacet';
import RangeFacet from 'components/RangeFacet';
import RatingFacet from 'components/RatingFacet';
import ColorFacet from 'components/ColorFacet';
import CategoryFacet from 'components/CategoryFacet';
import { FilterType } from 'types';
import { createElement, memo } from 'react';

/**
 * Function, that takes one of filter types and returns facet component for it
 * @param type Filter type to fetch facet component for
 */
export const getComponent = (type: FilterType) =>
  ({
    text: TextFacet,
    range: RangeFacet,
    rating: RatingFacet,
    price: RangeFacet,
    color: ColorFacet,
    category: CategoryFacet,
  }[type] || (() => null));

export default memo((props: any) =>
  createElement(
    getComponent(props.config.get('type') || props.facet.get('type')),
    props
  )
);
