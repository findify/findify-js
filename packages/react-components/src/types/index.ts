/**
 * @module types
 */

import * as React from 'react';
import { Map, List } from 'immutable';
import { Immutable } from '@findify/store-configuration';

/** Theme is a mapping of a raw to generated on build time class name */
export interface Theme {
  /**
   *  Key is className you see in your CSS files, value is a className build system has generated
   *  For example, assuming you have styles.css with following content:
   *
   *
   *  ```css
   *  .a { color: red; }
   *  ```
   *
   *
   *  You may get a theme object of the following shape:
   *
   *  ```js
   *  { a: 'findify__generated__classname__a' }
   *  ```
   **/

  [key: string]: string;
}

/** Props that every component with applied withTheme() HOC has during render */
export interface ThemedSFCProps {
  /** Use display-if to hide a component.
   * When property is not defined or is set to true - component is rendered,
   * when it is false - hidden
   */
  'display-if'?: boolean;

  children?: React.ReactNode;
  /**
   *  Theme is a raw - generated class mapping
   */
  theme?: Theme | any;

  className?: string;
}

/** Props that every component that can apply custom classname to itself accepts */
export interface ClassnamedProps {
  /** Custom classname to apply */
  className?: string;
}

/** Props that every component aware of being mounted in a widget has */
export interface WidgetAwareProps {
  /** Internal widget UID. Used to call getSuggestionProps for example */
  widgetKey: string;
}

/** Props that every component connected to suggestions has */
export interface SuggestionsConnectedProps {
  /** immutable.List of suggestions to display */
  suggestions: List<ISuggestion>;
  /** Function used to get props like onClick for each Suggestion */
  getSuggestionProps: GetSuggestionPropsFunction;
}

export interface ThemedSFC<P = {}, C = {}> extends React.StatelessComponent<P> {
  (
    props: P & {
      'display-if'?: boolean;
      children?: React.ReactNode;
      theme: Theme;
    },
    context?: C
  ): React.ReactElement<any> | null;
  propTypes?: React.ValidationMap<P>;
  contextTypes?: React.ValidationMap<C>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

//FIXME: type should point at itself kinda
/** MJS value */
export type MJSValue = List<any> | string | number | boolean;

/** This class is basically just a superset of immutable.Map() */
export interface MJSConfiguration<K = string, V = MJSValue & undefined>
  extends Map<K, V> {}

/**
 * React props for a specific suggestion
 */
export interface ISuggestionProps {
  /** Pass to react as rendering key */
  key: string;
  /** onClick handler, that by default runs search with suggestion value */
  onClick: (evt: React.MouseEvent<any>) => any;
}

/** Signature for a function which is used to fetch props for specific suggestion
 * @param suggestionIndex Index of the suggestion you are fetching props of
 * @param widgetKey Widget ID that component is connected to
 */
export type GetSuggestionPropsFunction = (
  suggestionIndex: number,
  widgetKey: string
) => ISuggestionProps;

/** Suggestion is an instance of immutable.Map(), containing following keys:
 * @prop *value* - string value of the suggestion
 */
export interface ISuggestion extends Map<string, MJSValue> {}

export interface IProductProps {
  /** @prop *product_url* - url of the actual product */
  product_url: string;
  /** @prop *price* - array of prices */
  price: number[];
  /** @prop *compare_at* - array of price compares */
  compare_at: number[];
  /** @prop *id* - id of the product */
  id: string;
  /** @prop *title* - title of the product */
  title: string;
  /** @prop *image_url* - url of the main picture */
  image_url: string;
  /** @prop *image_2_url* - url of the second picture */
  image_2_url: string;
  /** @prop *thumbnail_url* - url of the thumbnail picture */
  thumbnail_url: string;
  /** @prop *short_description* - short version of the description */
  short_description: string;
  /** @prop *variant_ids* - array with ids of variants to products */
  variant_ids: string[];
  /** @prop *variant* - List of variants */
  variants: Partial<IProductProps>[];
  /** @prop *description* - full description */
  description: string;
  /** @prop *discount* - array with discounts provided */
  discount: number[];
  /** @prop *created_at* - date when the item was created */
  created_at: number;
  /** @prop *availability* - boolean, if the item is in stock */
  availability: boolean;
  /** @prop *sku* - array with SKUs */
  sku: string;
  /** @prop *brand* - item brand */
  brand: string;
  /** @prop *color_variants* - amount of color variants */
  color_variant: number;
  /** @prop *custom_fields* - number of product in whorehouse */
  quantity: number;
  /** @prop *custom_fields* - custom fields*/
  custom_fields: {
    [field: string]: {
      [key: string]: any;
    };
  };
  /** @prop *stickers* - available stickers */
  stickers: {
    [sticker: string]: boolean;
  };
  /** @prop *reviews*  */
  reviews: {
    count?: number;
    total_reviews?: number;
    average_score?: number;
  };
}

export interface IProduct extends Immutable.Factory<IProductProps> {
  /** onClick product action, opens product page and sends analytics request by default */
  onClick: (evt: React.MouseEvent<any>) => any;
}

/**
 * Sorting item is an instance of immutable.Map(), containing following keys:
 * @prop *field* - field over which sorting is going
 * @prop *order* - order, ascending or descending
 * @prop *label* - label to display for sorting
 */
export interface ISortingItem extends Map<string, MJSConfiguration> {}

/**
 * Banner is an instance of immutable.Map(), containing following keys:
 * @prop *products* - product being advertised
 * @prop *products.targetUrl* - url to redirect customer
 * @prop *products.title* - title
 * @prop *products.imageUrl* - image URL to show in a banner
 */
export interface IBanner extends Map<string, MJSValue> {}

/**
 * Query is an instance of immutable.Map(), containing following keys:
 * @prop *q* - query string
 * @prop *meta* - immutable.Map(), request meta
 * @prop *filters* - immutable.List(), filters used for queries
 * @prop *corrected_q* - corrected query (Google-like "did you mean?")
 */
export interface IQuery extends Map<string, MJSValue> {}

/**
 * Facet is an instance of immutable.Map(), containing following keys:
 * @prop *values*
 * @prop *name*
 * @prop *type*
 * @prop
 */
export interface IFacet extends Map<string, MJSValue> {
  toggle: (evt: React.MouseEvent<any>) => any;
  resetValues: () => any;
}

/** Available filter types in MJS */
export type FilterType =
  | 'text'
  | 'range'
  | 'color'
  | 'category'
  | 'price'
  | 'rating';

export interface IFacetValue extends Map<string, MJSValue> {
  toggle: (evt: React.MouseEvent<any>) => any;
}
/*
declare module '@findify/react-components' {
  type Theme = object // TODO: implement more okayish type then alias
  interface ThemedSFC<P = {}, C = {}> extends React.StatelessComponent<P> {
    (props: P & { children?: React.ReactNode, theme: Theme }, context?: C): React.ReactElement<any> | null;
    propTypes?: React.ValidationMap<P>;
    contextTypes?: React.ValidationMap<C>;
    defaultProps?: Partial<P>;
    displayName?: string;
  }
}

declare module '@findify/ui-components' {
  type AutocompleteWidgetProps = {
    query: string;
    searchSuggestions: string[];
    onSearchSuggestionClick: (query: string) => void;
    productMatches?: AutocompleteWidgetProductProp[];
    onTipClick?: () => void;
    direction?: string;
    suggestionsTitle?: string;
    productMatchesTitle?: string;
    tipTitle?: string;
  };
  type AutocompleteWidgetProductProp = {
    link: string;
    imageLink: string;
    title: string;
    price: string;
    discountPrice?: string;
    reviewsCount?: number;
    rating?: number;
  };
  function AutocompleteWidget(props: AutocompleteWidgetProps);
}
*/
