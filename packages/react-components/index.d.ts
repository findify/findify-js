declare module 'components/autocomplete/ProductMatches' {
  /**
   * @module components/autocomplete/ProductMatches
   */
  /// <reference types="react" />
  const _default: import('react').ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/autocomplete/ProductMatches/view' {
  /**
   * @module components/autocomplete/ProductMatches
   */
  import React from 'react';
  import { List } from 'immutable';
  import {
    ThemedSFCProps,
    IProduct,
    MJSConfiguration,
    WidgetAwareProps,
    SuggestionsConnectedProps,
  } from 'types';
  /** This is a list of props which ProductMatches view for Autocomplete accepts */
  export interface IProductMatchesProps
    extends ThemedSFCProps,
      WidgetAwareProps,
      SuggestionsConnectedProps {
    /** List of products */
    items: List<IProduct>;
    /** Custom classname */
    className?: string;
    /** Class for each column where Product will be rendered */
    columnClass?: string;
    /** MJS Configuration object */
    config: MJSConfiguration;
    /** Number of columns to render Products */
    columns: number;
    /** Maximum amount of products to render */
    limit: number;
  }
  /**
   * @param param0 Props that ProductMatchesView for Autocomplete accepts
   */
  const ProductMatchesView: React.SFC<IProductMatchesProps>;
  export default ProductMatchesView;
}
declare module 'components/autocomplete/SearchSuggestions' {
  /**
   * @module components/autocomplete/SearchSuggestions
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/autocomplete/SearchSuggestions/test' {
  export {};
}
declare module 'components/autocomplete/SearchSuggestions/view' {
  /**
   * @module components/autocomplete/SearchSuggestions
   */
  import React from 'react';
  import {
    ThemedSFCProps,
    WidgetAwareProps,
    SuggestionsConnectedProps,
    IQuery,
  } from 'types';
  /** Props that SearchSuggestionsView accept */
  export interface ISearchSuggestionsProps
    extends ThemedSFCProps,
      WidgetAwareProps,
      SuggestionsConnectedProps {
    /** Query currently entered in the autocomplete */
    query: IQuery;
    /** Any other props that come through here to SuggestionItem */
    [x: string]: any;
  }
  /**
   * Actual view
   */
  const SearchSuggestionsView: React.SFC<ISearchSuggestionsProps>;
  export default SearchSuggestionsView;
}
declare module 'components/autocomplete/SuggestionItem' {
  /**
   * @module components/autocomplete/SuggestionItem
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/autocomplete/SuggestionItem/test' {
  export {};
}
declare module 'components/autocomplete/SuggestionItem/view' {
  /**
   * @module components/autocomplete/SuggestionItem
   */
  import React from 'react';
  import { ISuggestion, ISuggestionProps, IQuery, ThemedSFCProps } from 'types';
  /**
   * Props that SuggestionItem accepts
   */
  export interface ISuggestionItemProps
    extends ThemedSFCProps,
      ISuggestionProps {
    /** Suggestion item */
    item: ISuggestion;
    /** Query, used to highlight matches */
    query: IQuery;
    /** Flag indicating whether current suggestion is in focus over keyboard arrows */
    highlighted: boolean;
    /** Icon name to use */
    icon: string;
    /** Flag indicating that this suggestion is used in TrendingSearches layout of Autocomplete */
    isTrendingSearches: boolean;
    /** Rest of the props that may get passed down */
    [x: string]: any;
  }
  const SuggestionItemView: React.SFC<ISuggestionItemProps>;
  export default SuggestionItemView;
}
declare module 'components/autocomplete/Tip' {
  /**
   * @module components/autocomplete/Tip
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/autocomplete/Tip/test' {
  export {};
}
declare module 'components/autocomplete/Tip/view' {
  /**
   * @module components/autocomplete/Tip
   */
  import React from 'react';
  import {
    ThemedSFCProps,
    ClassnamedProps,
    WidgetAwareProps,
    SuggestionsConnectedProps,
  } from 'types';
  /** List of props that Tip accepts */
  export interface ITipProps
    extends ThemedSFCProps,
      ClassnamedProps,
      WidgetAwareProps,
      SuggestionsConnectedProps {
    /** Custom title to display in a Tip */
    title: string;
    zeroResultsTitle: string;
  }
  const TipView: React.SFC<ITipProps>;
  export default TipView;
}
declare module 'components/Banner' {
  /**
   * @module components/Banner
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/Banner/view' {
  /**
   * @module components/Banner
   */
  import React from 'react';
  import { ThemedSFCProps, IBanner } from 'types';
  /** Props that Banner component accepts */
  export interface IBannerProps extends ThemedSFCProps {
    /** Banner being shown */
    banner: IBanner;
    [x: string]: any;
  }
  const BannerView: React.SFC<IBannerProps>;
  export default BannerView;
}
declare module 'components/Breadcrumbs/createBreadcrumb' {
  /**
   * @module components/Breadcrumbs
   */
  import React from 'react';
  import { FilterType, ThemedSFCProps, IFacet, MJSConfiguration } from 'types';
  /** Filter mapping type */
  export type FilterMapping = {
    [x in FilterType]: React.SFC<any>;
  };
  export interface IFilterProps {
    /** Filter value */
    item: any;
    /** Filter mapping */
    mapping: FilterMapping;
    /** Filter type */
    type: FilterType;
    /** Filter name */
    name: string;
  }
  /** List of props that component returned by createBreadcrumb accepts */
  export interface IFilterListProps extends ThemedSFCProps {
    /** Filter to create a component for */
    item: IFacet;
    /** MJS configuration */
    config: MJSConfiguration;
  }
  const _default: (
    mapping: FilterMapping
  ) => ({ item, children, theme, config }: IFilterListProps) => JSX.Element;
  export default _default;
}
declare module 'components/Breadcrumbs' {
  /**
   * @module components/Breadcrumbs
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/Breadcrumbs/view' {
  /**
   * @module components/Breadcrumbs
   */
  import React from 'react';
  import { IFacet, MJSConfiguration, ThemedSFCProps } from 'types';
  import { List } from 'immutable';
  /** Props that Breadcrumbs component accepts */
  export interface IBreadcrumbProps extends ThemedSFCProps {
    filters: List<IFacet>;
    config: MJSConfiguration;
  }
  const BreadcrumbsView: React.SFC<IBreadcrumbProps>;
  export default BreadcrumbsView;
}
declare module 'components/Button' {
  /**
   * @module components/Button
   */
  import React from 'react';
  const _default: React.ComponentClass<any, any>;
  export default _default;
}
declare module 'components/Button/view' {
  /**
   * @module components/Button
   */
  import React from 'react';
  import { ClassnamedProps, ThemedSFCProps } from 'types';
  /** Props that Button accepts */
  export interface IButtonProps extends ThemedSFCProps, ClassnamedProps {
    /** Event handler for a button */
    onClick?: (evt: Event) => any;
    /** Flag to show if the button is active */
    active?: boolean;
    /** Flag whether to use raw style */
    raw?: boolean;
    /** Flag whether the component is disabled */
    disabled?: boolean;
    /** Rest of the props for the button */
    [x: string]: any;
  }
  const ButtonView: React.SFC<IButtonProps>;
  export default ButtonView;
}
declare module 'components/Cards/Content' {
  /**
   * @module components/Cards/Content
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/Cards/Content/view' {
  /**
   * @module components/Cards/Content
   */
  import React from 'react';
  const _default: React.ComponentClass<
    Pick<
      {
        onClick: (e: any) => void;
      },
      never
    >,
    any
  >;
  export default _default;
}
declare module 'components/Cards/Product/BundleAction' {
  /// <reference types="react" />
  const _default: import('react').ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/Cards/Product/BundleAction/view' {
  /// <reference types="react" />
  const _default: ({ theme, onClick, selected }: any) => JSX.Element;
  export default _default;
}
declare module 'components/Cards/Product' {
  /**
   * @module components/Cards/Product
   */
  const ProductCard: any;
  export default ProductCard;
}
declare module 'components/Cards/Product/Price' {
  /**
   * @module components/Cards/Product/Price
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/Cards/Product/Price/view' {
  /**
   * @module components/Cards/Product/Price
   */
  import React from 'react';
  import { List } from 'immutable';
  import { ClassnamedProps, ThemedSFCProps } from 'types';
  /** List of props that Price component accepts */
  export interface IPriceProps extends ThemedSFCProps, ClassnamedProps {
    /** List of current prices */
    price: List<number>;
    /** Old price for the item */
    oldPrice?: number;
    /** Currency */
    currency: string;
    /** Discount percentages for item */
    discount: List<number>;
    /** Flag to show whether item is discounted */
    hasDiscount: boolean;
    /** Flag to show whether prices can be compared */
    hasCompare: boolean;
  }
  const PriceView: React.SFC<IPriceProps>;
  export default PriceView;
}
declare module 'components/Cards/Product/Rating' {
  /**
   * @module components/Cards/Product/Rating
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/Cards/Product/Rating/test' {
  export {};
}
declare module 'components/Cards/Product/Rating/view' {
  /**
   * @module components/Cards/Product/Rating
   */
  import 'core-js/features/array/from';
  import React from 'react';
  import { ThemedSFCProps } from 'types';
  /** List of props that Rating component accepts */
  export interface IRatingProps extends ThemedSFCProps {
    /** Rating value */
    value: number;
    /** Total reviews */
    count: number;
  }
  const RatingView: React.SFC<IRatingProps>;
  export default RatingView;
}
declare module 'components/Cards/Product/Stickers' {
  /**
   * @module components/Cards/Product/Stickers
   */
  import React from 'react';
  export const DiscountSticker: ({
    theme,
    ...props
  }: {
    [x: string]: any;
    theme: any;
  }) => React.CElement<
    {
      theme: any;
    },
    React.Component<
      {
        theme: any;
      },
      any,
      any
    >
  >;
  export const OutOfStockSticker: ({
    theme,
    ...props
  }: {
    [x: string]: any;
    theme: any;
  }) => React.CElement<
    {
      theme: any;
    },
    React.Component<
      {
        theme: any;
      },
      any,
      any
    >
  >;
}
declare module 'components/Cards/Product/test' {
  export {};
}
declare module 'components/Cards/Product/view' {
  /**
   * @module components/Cards/Product
   */
  import React from 'react';
  import { IProduct, MJSConfiguration, ThemedSFCProps } from 'types/index';
  export interface IProductCardProps extends ThemedSFCProps {
    item: IProduct;
    config: MJSConfiguration;
  }
  const ProductCardView: React.SFC<IProductCardProps>;
  export default ProductCardView;
}
declare module 'components/CategoryFacet/content' {
  /**
   * @module components/CategoryFacet
   */
  /**
   * Used to extract content from facet data
   */
  const extractContent: ({ item }: { item: any }) => any;
  export default extractContent;
}
declare module 'components/CategoryFacet' {
  /**
   * @module components/CategoryFacet
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/CategoryFacet/Item' {
  /**
   * @module components/CategoryFacet
   */
  /// <reference types="react" />
  import { ThemedSFCProps, MJSConfiguration } from 'types';
  /** This is a list of props that each individual child of CategoryFacet View accepts */
  export interface ICategoryFacetCategoryProps extends ThemedSFCProps {
    /** TODO: add typings for Item here */
    item: any;
    /** Custom inline styles for Button holding CategoryFacet Item */
    style: {
      [x: string]: string | number;
    };
    /** MJS Configuration */
    config: MJSConfiguration;
  }
  const Item: ({
    item,
    theme,
    style,
    config,
  }: ICategoryFacetCategoryProps) => JSX.Element;
  export default Item;
}
declare module 'components/CategoryFacet/view' {
  /**
   * @module components/CategoryFacet
   */
  /// <reference types="react" />
  import { IFacet, ThemedSFCProps, MJSConfiguration } from 'types';
  import { List, Map } from 'immutable';
  /** CategoryFacet props */
  export interface ICategoryFacetProps extends ThemedSFCProps {
    /** Categories facet */
    facet: IFacet;
    /** Facet items */
    items: List<Map<string, string | boolean | number>>;
    /** Total count of selected facets */
    total: number;
    /** MJS Configuration */
    config: MJSConfiguration;
    /** Flag shows whether search functionality is enabled */
    isExpanded?: boolean;
    /** Callback invoked on request to expand list completely */
    onToggle: (evt: Event) => any;
    hidden: boolean;
  }
  const CategoryFacetView: ({
    theme,
    items,
    config,
    facet,
    total,
    isExpanded,
    onToggle,
    hidden,
  }: ICategoryFacetProps) => JSX.Element;
  export default CategoryFacetView;
}
declare module 'components/CheckboxFacet/content' {
  /**
   * @module components/CheckboxFacet
   */
  /**
   * Used to extract content from facet data
   */
  const extractContent: ({ item }: { item: any }) => any;
  export default extractContent;
}
declare module 'components/CheckboxFacet' {
  /**
   * @module components/CheckboxFacet
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/CheckboxFacet/view' {
  /**
   * @module components/CheckboxFacet
   */
  import { ChangeEvent } from 'react';
  import { IFacetValue, ThemedSFCProps, MJSConfiguration, IFacet } from 'types';
  import { List } from 'immutable';
  /** Props that CheckboxFacet accepts */
  export interface ICheckboxFacetProps extends ThemedSFCProps {
    /** List of facet values available for toggling */
    items: List<IFacetValue>;
    facet: IFacet;
    /** MJS Configuration */
    config: MJSConfiguration;
    /** Search string for filtering facet values */
    search?: string;
    /** Flag shows whether search functionality is enabled */
    isExpanded?: boolean;
    /** Flag to show if facet is opened on mobile */
    isMobile?: boolean;
    /** Callback invoked on search input change */
    onSearch: (evt: ChangeEvent<HTMLInputElement>) => any;
    /** Callback invoked on request to expand list completely */
    onToggle: (evt: Event) => any;
    hidden: boolean;
  }
  const CheckboxFacetView: ({
    theme,
    items,
    config,
    search,
    isExpanded,
    onSearch,
    onToggle,
    isMobile,
    facet,
    hidden,
  }: ICheckboxFacetProps) => JSX.Element;
  export default CheckboxFacetView;
}
declare module 'components/ColorFacet/content' {
  /**
   * @module components/ColorFacet
   */
  import React from 'react';
  const _default: React.NamedExoticComponent<object>;
  export default _default;
}
declare module 'components/ColorFacet' {
  /**
   * @module components/ColorFacet
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/ColorFacet/Item' {
  /**
   * @module components/ColorFacet
   */
  /// <reference types="react" />
  /** Props that ColorFacet Item accepts */
  import { IFacetValue, MJSConfiguration, ThemedSFCProps } from 'types';
  export interface IColorFacetItemProps extends ThemedSFCProps {
    /** Facet to render */
    item: IFacetValue;
    /** MJS Configuration */
    config: MJSConfiguration;
  }
  const Item: ({ item, theme, config }: IColorFacetItemProps) => JSX.Element;
  export default Item;
}
declare module 'components/ColorFacet/view' {
  /**
   * @module components/ColorFacet
   */
  /// <reference types="react" />
  import { ThemedSFCProps, MJSConfiguration, IFacetValue, IFacet } from 'types';
  import { List } from 'immutable';
  export interface IColorFacetProps extends ThemedSFCProps {
    /** MJS Configuration */
    config: MJSConfiguration;
    /** Facet values to render */
    items: List<IFacetValue>;
    facet: IFacet;
    hidden: boolean;
  }
  const ColorFacetView: ({
    theme,
    items,
    config,
    facet,
    hidden,
  }: IColorFacetProps) => JSX.Element;
  export default ColorFacetView;
}
declare module 'components/common/Announcement' {
  /// <reference types="react" />
  export const Component: ({ text }: { text: any }) => JSX.Element;
  export const useAnnouncement: () => [JSX.Element, (text: any) => void];
  export default Component;
}
declare module 'components/common/Branch' {
  /**
   * @module components/common/Branch
   */
  import React from 'react';
  /** Props that Branch component accepts */
  export interface IBranchProps {
    /**
     * Use display-if to hide a component.
     * When property is not defined or is set to true - component is rendered,
     * when it is false - hidden
     */
    'display-if'?: boolean;
    /** Component to render in case **condition** is true */
    left?: React.ComponentType;
    /** Component to render in case **condition** is false */
    right?: React.ComponentType;
    /** Boolean value to test against */
    condition?: boolean;
    /** Rest props to be passed to rendered component */
    [x: string]: any;
  }
  const Branch: ({
    left,
    right,
    children,
    condition,
    ...props
  }: IBranchProps) => JSX.Element;
  export default Branch;
}
declare module 'components/common/Checkbox' {
  /**
   * @module components/CheckboxFacet
   */
  /// <reference types="react" />
  import { IFacetValue, ThemedSFCProps } from 'types';
  /** Props that CheckboxFacet Item accepts */
  export interface ICheckboxFacetItemProps extends ThemedSFCProps {
    /** Single item from facet */
    item: IFacetValue;
    /** CheckboxFacet Item click handler */
    onItemClick?: (evt: Event) => any;
    /** Custom inline style */
    style: {
      [x: string]: string | number;
    };
    content: (x: any) => string;
  }
  const _default: ({
    item,
    theme: _theme,
    style,
    onItemClick,
    content,
    config,
  }: ICheckboxFacetItemProps) => JSX.Element;
  export default _default;
}
declare module 'components/common/Drawer' {
  /**
   * @module components/common/Drawer
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/common/Drawer/view' {
  /**
   * @module components/common/Drawer
   */
  /// <reference types="react" />
  import { ThemedSFCProps } from 'types';
  /** This is a state definition for DrawerView */
  export interface IDrawerViewState {
    /** Flag whether Drawer is open */
    open: boolean;
  }
  /** List of props that DrawerView accepts */
  export interface IDrawerViewProps extends ThemedSFCProps {
    /** Additional options for DrawerView */
    options: {
      /** Transition from styles */
      from: {
        [x: string]: string | number;
      };
      /** Transition to styles */
      to: {
        [x: string]: string | number;
      };
      /** Easing mode */
      easing?: string;
      /** Custom className */
      className?: string;
    };
    /** Rest of the props, passed to children */
    [x: string]: any;
  }
  const Drawer: ({
    hideModal,
    name,
    theme,
    options,
    children,
    ...rest
  }: IDrawerViewProps) => JSX.Element;
  export default Drawer;
}
declare module 'components/common/Grid/Column' {
  /**
   * @module components/common/Grid
   */
  import React from 'react';
  /** List of props that GridColumn accepts */
  export interface IGridColumnProps {
    /** Custom className for column */
    className?: string;
    /** Column inline style */
    style?: React.CSSProperties;
    /** Contents of the column */
    children?: React.ReactChild;
    gutter?: string | number;
    size: string;
    order?: number;
    component: React.ComponentType<any> | string;
  }
  export const Column: ({
    className,
    style,
    children,
    gutter,
    order: _order,
    size: _size,
    component: Component,
  }: IGridColumnProps) => JSX.Element;
  export const Placeholder: ({ size }: { size: any }) => JSX.Element;
}
declare module 'components/common/Grid' {
  /**
   * @module components/common/Grid
   */
  import React from 'react';
  import { ThemedSFCProps } from 'types';
  export interface IGridProps extends ThemedSFCProps {
    columns:
      | string
      | {
          [x: number]: string | number;
        };
    className?: string;
    style?: React.CSSProperties;
    /** eq: 12 = 12px | 1em = 1em */
    gutter?: number | string;
    columnClass?: string;
    columnStyle?: React.CSSProperties;
    wrapperComponent: React.ComponentType<any> | string;
    columnComponent: React.ComponentType<any> | string;
  }
  const _default: ({
    children: _children,
    theme: _theme,
    columns: _columns,
    gutter: _gutter,
    className,
    style,
    wrapperComponent: WrapperComponent,
    columnComponent,
    ...rest
  }: IGridProps) => JSX.Element;
  export default _default;
}
declare module 'components/common/Image' {
  /**
   * @module components/common/Image
   */
  import 'core-js/features/array/includes';
  import React from 'react';
  /** This is a list of props which Image component accepts */
  export interface ImageProps {
    /** Custom classname */
    className?: string;
    /** Source to original image */
    src: string;
    /** Source to thumbnail, which will be showed blurred during loading */
    thumbnail?: string;
    /** Width / height ratio, to which image will conform */
    aspectRatio?: number;
    /** Render image only when it is in viewport */
    lazy?: boolean;
    /** Distance to image when it should start render [default: 100px] */
    offset?: number;
    /** @hidden */
    size: {
      width: number;
    };
    /** @hidden */
    isFixedRatio: boolean;
  }
  const _default: React.ComponentClass<ImageProps, any>;
  export default _default;
}
declare module 'components/common/Image/test' {
  export {};
}
declare module 'components/common/MapArray' {
  /**
   * @module components/common/MapArray
   */
  import React from 'react';
  /** MapCallback is a type signature for array.map(), immutable.List().map() callback */
  export type MapCallback = (
    item: any,
    index: number,
    arrayLike: ArrayLike
  ) => any;
  /** KeyAccessor is a function of item and index, returning a React key for rendering */
  export type KeyAccessor = (item: any, index: number) => string;
  /** ArrayLike can possibly an array or an instance of immutable.List() */
  export type ArrayLike = {
    map: (callback: MapCallback) => any;
    length?: number;
    size?: number;
    slice: (from: number, to?: number) => ArrayLike;
  };
  /** ReactFactory is a type for React Factory producing components */
  export type ReactFactory = (props: object) => React.Component;
  /** List of props which MapArray component accepts */
  export type MapArrayProps = {
    /** Array-like object which is mapped over */
    array: ArrayLike;
    /** Function used to extract React rendering key */
    keyAccessor?: KeyAccessor;
    /** React component factory */
    factory: ReactFactory;
    /** Maximum possible limit for iteration */
    limit?: number;
    /** Rest of the props, passed down to children */
    [key: string]: any;
  };
  const _default: ({
    array,
    keyAccessor,
    factory,
    limit,
    ...rest
  }: MapArrayProps) => any;
  export default _default;
}
declare module 'components/common/MapArray/test' {
  export {};
}
declare module 'components/common/Picture' {
  /**
   * @module components/common/Image
   */
  /// <reference types="react" />
  const _default: ({
    aspectRatio,
    lazy,
    offset,
    getSrc,
    getThumbnail,
    src,
    alt,
    thumbnail,
  }: {
    aspectRatio: any;
    lazy: any;
    offset?: number | undefined;
    getSrc: any;
    getThumbnail: any;
    src: any;
    alt: any;
    thumbnail: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/common/Picture/test' {
  export {};
}
declare module 'components/common/Sticky' {
  /**
   * @module components/common/Sticky
   */
  import React from 'react';
  /** Props that Sticky component accepts */
  export interface IStickyProps {
    /** Offset for sticky */
    offset?: number;
    /** Minimal height */
    minHeight?: number;
    stickToTop?: boolean;
  }
  const _default: ({
    theme,
    ...props
  }: {
    [x: string]: any;
    theme: any;
  }) => React.CElement<
    {
      theme: any;
    },
    React.Component<
      {
        theme: any;
      },
      any,
      any
    >
  >;
  export default _default;
}
declare module 'components/common/Sticky/view' {
  /**
   * @module components/common/Sticky
   */
  /// <reference types="react" />
  const _default: ({
    theme,
    registerRoot,
    registerContainer,
    registerSizer,
    children,
    state,
    title,
  }: {
    theme: any;
    registerRoot: any;
    registerContainer: any;
    registerSizer: any;
    children: any;
    state: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/common/Truncate' {
  /**
   * @module components/common/Truncate
   */
  /// <reference types="react" />
  const _default: ({ children }: { children: any }) => JSX.Element;
  export default _default;
}
declare module 'components/common/VirtualizedList' {
  import { Component } from 'react';
  import { CellMeasurerCache } from 'react-virtualized/dist/commonjs/CellMeasurer';
  class List extends Component<any, any> {
    autoSizer: any;
    list: any;
    cache: CellMeasurerCache;
    static displayName: string;
    constructor(props: any);
    initAutoSizer: (ref: any) => void;
    initList: (ref: any) => void;
    handleScroll: ({ target }: { target: any }) => void;
    rowRenderer: ({
      index,
      key,
      parent,
      style,
    }: {
      index: any;
      key: any;
      parent: any;
      style: any;
    }) => import('react').DetailedReactHTMLElement<
      import('react').InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >;
    render(): any;
  }
  export default List;
}
declare module 'components/common/VirtualizedList/view' {
  /// <reference types="react" />
  const _default: ({
    initAutoSizer,
    initList,
    array,
    cache,
    handleScroll,
    rowRenderer,
    className,
    theme,
  }: {
    initAutoSizer: any;
    initList: any;
    array: any;
    cache: any;
    handleScroll: any;
    rowRenderer: any;
    className: any;
    theme: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Dropdown' {
  /**
   * @module components/Dropdown
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/Dropdown/view' {
  /**
   * @module components/Dropdown
   */
  /// <reference types="react" />
  import { MJSValue, ThemedSFCProps, ClassnamedProps } from 'types';
  import { List, Map } from 'immutable';
  /** Props that Dropdown Item accepts */
  export interface IDropdownItemProps extends ThemedSFCProps {
    /** Item can be basically any immutable.Map(), that has 'label' attribute */
    item: Map<string, MJSValue>;
    /** Index is item's current index in array of elements */
    index: number;
    /** Current highlighted index */
    highlighted: number;
    /** getItemProps is a method passed down to receive additional props for item from Downshift */
    getItemProps: (item: {
      item: Map<string, MJSValue>;
    }) => {
      [x: string]: any;
    };
  }
  /** Props that Dropdown accepts */
  export interface IDropdownProps extends ClassnamedProps, ThemedSFCProps {
    /** onChange function for Downshift */
    onChange: (x: any) => any;
    /** List of items */
    items: List<Map<string, MJSValue>>;
    /** Currently active item */
    selectedItem: Map<string, MJSValue>;
  }
  const DropdownView: ({
    onChange,
    items,
    selectedItem,
    theme,
    className,
  }: IDropdownProps) => JSX.Element;
  export default DropdownView;
}
declare module 'components/Facet/Component' {
  /**
   * @module components/Facet
   */
  import React from 'react';
  import { FilterType } from 'types';
  /**
   * Function, that takes one of filter types and returns facet component for it
   * @param type Filter type to fetch facet component for
   */
  export const getComponent: (
    type: FilterType
  ) => React.ComponentClass<unknown, any>;
  const _default: React.ComponentClass<any, any>;
  export default _default;
}
declare module 'components/Facet' {
  /**
   * @module components/Facet
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/Facet/view' {
  /**
   * @module components/Facet
   */
  import React from 'react';
  import { ThemedSFCProps, IFacet, MJSConfiguration } from 'types';
  /** Props that Facet view accepts */
  export interface IFacetProps extends ThemedSFCProps {
    /** Facet component to render */
    FacetComponent: React.Component<any>;
    /** Flag to show open / closed state of facet */
    isOpen?: boolean;
    /** Flag to show if facet is opened on mobile */
    isMobile?: boolean;
    /** Title of facet */
    title: string;
    /** Facet object */
    item: IFacet;
    /** MJS Configuration */
    config: MJSConfiguration;
    /** Filters selected in facet */
    filtersSelected: number;
    /** Function to toggle open / closed state of facet */
    toggleFacet: () => any;
  }
  const FacetView: ({
    FacetComponent,
    isOpen,
    theme,
    title,
    item,
    config,
    filtersSelected,
    toggleFacet,
  }: IFacetProps) => JSX.Element;
  export default FacetView;
}
declare module 'components/Icon/icons/Arrow/Back' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Arrow/Down' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Arrow/Left-Big' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Arrow/Left' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Arrow/Right-Big' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Arrow/Right' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Arrow/Up' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Checkbox/Empty-Mobile' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Checkbox/Empty' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Checkbox/Filled-Mobile' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Checkbox/Filled' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Checkmark/Dark' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/ExternalLink' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Filters' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Fire' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Minus' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Plus' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Radio/Empty' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Radio/Filled' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Search' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Sorting' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/Star' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/X/Dark' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon/icons/X/Mobile' {
  /// <reference types="react" />
  const _default: ({
    title,
    ...rest
  }: {
    [x: string]: any;
    title: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/Icon' {
  /**
   * @module components/Icon
   */
  import React from 'react';
  /** Possible icon types */
  export const icons: {
    Filters: ({
      title,
      ...rest
    }: {
      [x: string]: any;
      title: any;
    }) => JSX.Element;
    Fire: ({ title, ...rest }: { [x: string]: any; title: any }) => JSX.Element;
    Minus: ({
      title,
      ...rest
    }: {
      [x: string]: any;
      title: any;
    }) => JSX.Element;
    Plus: ({ title, ...rest }: { [x: string]: any; title: any }) => JSX.Element;
    Search: ({
      title,
      ...rest
    }: {
      [x: string]: any;
      title: any;
    }) => JSX.Element;
    Sorting: ({
      title,
      ...rest
    }: {
      [x: string]: any;
      title: any;
    }) => JSX.Element;
    CheckmarkDark: ({
      title,
      ...rest
    }: {
      [x: string]: any;
      title: any;
    }) => JSX.Element;
    Star: ({ title, ...rest }: { [x: string]: any; title: any }) => JSX.Element;
    XDark: ({
      title,
      ...rest
    }: {
      [x: string]: any;
      title: any;
    }) => JSX.Element;
    XMobile: ({
      title,
      ...rest
    }: {
      [x: string]: any;
      title: any;
    }) => JSX.Element;
    RadioEmpty: ({
      title,
      ...rest
    }: {
      [x: string]: any;
      title: any;
    }) => JSX.Element;
    RadioFilled: ({
      title,
      ...rest
    }: {
      [x: string]: any;
      title: any;
    }) => JSX.Element;
    ArrowBack: ({
      title,
      ...rest
    }: {
      [x: string]: any;
      title: any;
    }) => JSX.Element;
    ArrowDown: ({
      title,
      ...rest
    }: {
      [x: string]: any;
      title: any;
    }) => JSX.Element;
    ArrowUp: ({
      title,
      ...rest
    }: {
      [x: string]: any;
      title: any;
    }) => JSX.Element;
    ArrowLeft: ({
      title,
      ...rest
    }: {
      [x: string]: any;
      title: any;
    }) => JSX.Element;
    ArrowRight: ({
      title,
      ...rest
    }: {
      [x: string]: any;
      title: any;
    }) => JSX.Element;
    ArrowLeftBig: ({
      title,
      ...rest
    }: {
      [x: string]: any;
      title: any;
    }) => JSX.Element;
    ArrowRightBig: ({
      title,
      ...rest
    }: {
      [x: string]: any;
      title: any;
    }) => JSX.Element;
    CheckboxFilled: ({
      title,
      ...rest
    }: {
      [x: string]: any;
      title: any;
    }) => JSX.Element;
    CheckboxEmpty: ({
      title,
      ...rest
    }: {
      [x: string]: any;
      title: any;
    }) => JSX.Element;
    ExternalLink: ({
      title,
      ...rest
    }: {
      [x: string]: any;
      title: any;
    }) => JSX.Element;
  };
  /** Props that Icon accepts */
  export type IIconProps = {
    /** Icon name */
    name: keyof typeof icons;
    /** Icon width in pixels */
    width?: number;
    /** Icon height in pixels */
    height?: number;
    /** Custom className */
    className?: string;
    /** Accessible title for screen readers */
    title?: string;
    /** Accessible title for screen readers */
    component?: React.Component;
    /** Rest of props to pass to underlying elements */
    [x: string]: any;
  };
  const Icon: ({
    name,
    component,
    className,
    ...rest
  }: IIconProps) => React.DetailedReactHTMLElement<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  export default Icon;
}
declare module 'components/ItemsList' {
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/ItemsList/view' {
  /**
   * @module components/ItemsList
   */
  import React from 'react';
  import { MapArrayProps } from 'components/common/MapArray';
  /** Props that ItemList view accepts */
  export interface IItemsListProps extends MapArrayProps {
    /** Wrapper around mapArray */
    wrapper: React.ComponentType;
    /** Rest props that are passed to wrapper */
    [x: string]: any;
  }
  const _default: ({
    items,
    wrapper: Wrapper,
    ...rest
  }: IItemsListProps) => JSX.Element;
  export default _default;
}
declare module 'components/Pagination' {
  /**
   * @module components/Pagination
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/Pagination/view' {
  /**
   * @module components/Pagination
   */
  /// <reference types="react" />
  import { ThemedSFCProps, MJSConfiguration } from 'types';
  /** Props that Pagination view accepts */
  export interface IPaginationProps extends ThemedSFCProps {
    /** MJS Configuration */
    config: MJSConfiguration;
    /** Current page */
    current: number;
    /** Total amount of pages */
    total: number;
    /** Whether to show previous page button */
    showPrev: boolean;
    /** Whether to show first page button */
    showFirst: boolean;
    /** Whether to show dots on the left to current page */
    showFirstDots: boolean;
    /** Whether to show dots on the right to current page */
    showLastDots: boolean;
    /** Show last page */
    showLast: boolean;
    /** Show next page button */
    showNext: boolean;
    /** Array of visible page numbers */
    visiblePages: number[];
    /** Function returning props for each page button */
    getPageProps: (
      pageNumber: number
    ) => {
      [x: string]: any;
    };
  }
  const _default: ({
    theme,
    config,
    current,
    getPageProps,
    total,
    meta,
    showPrev,
    showFirst,
    showFirstDots,
    showLastDots,
    showLast,
    showNext,
    visiblePages,
  }: IPaginationProps) => JSX.Element;
  export default _default;
}
declare module 'components/PoweredBy' {
  /**
   * @module components/PoweredBy
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/PoweredBy/view' {
  /**
   * @module components/PoweredBy
   */
  /// <reference types="react" />
  const _default: ({
    config,
    theme,
  }: {
    config: any;
    theme: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/RangeFacet/content' {
  /**
   * @module components/RangeFacet
   */
  const _default: ({ item, config }: { item: any; config: any }) => any;
  export default _default;
}
declare module 'components/RangeFacet' {
  /**
   * @module components/RangeFacet
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/RangeFacet/view' {
  /**
   * @module components/RangeFacet
   */
  import React from 'react';
  import { ThemedSFCProps, IFacet, IFacetValue, MJSConfiguration } from 'types';
  import { List } from 'immutable';
  export interface IRangeFacetProps extends ThemedSFCProps {
    /** Facet to extract values from */
    facet: IFacet;
    /** Facet values */
    items: List<IFacetValue>;
    /** MJS Configuration */
    config: MJSConfiguration;
    /** Currency symbol */
    currencySymbol: string;
    /** Minimum possible price */
    from: number;
    /** Maximum possible price */
    to: number;
    /** Invoked when maximum range is changed */
    onChangeMax: (evt?: React.ChangeEvent<any>) => any;
    /** Invoked when minimum range is changed */
    onChangeMin: (evt?: React.ChangeEvent<any>) => any;
    /** Invoked when any key in any input is pressed, used to react to Enter */
    onKeypressMin: (evt: any) => any;
    onKeypressMax: (evt: any) => any;
    /** Invoked when Go button is pressed */
    onPressButton: () => any;
    hidden: boolean;
  }
  const _default: ({
    theme,
    facet,
    items,
    config,
    currencySymbol,
    from,
    to,
    onChangeMax,
    onChangeMin,
    onKeypressMin,
    onKeypressMax,
    onPressButton,
    hidden,
  }: IRangeFacetProps) => JSX.Element;
  export default _default;
}
declare module 'components/RatingFacet/content' {
  /// <reference types="react" />
  const _default: ({
    item,
    theme,
    config,
  }: {
    item: any;
    theme: any;
    config: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'components/RatingFacet' {
  /**
   * @module components/RatingFacet
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/RatingFacet/Item' {
  /**
   * @module components/RatingFacet
   */
  import React from 'react';
  import { IFacetValue, ThemedSFCProps, MJSConfiguration } from 'types';
  /** Props that RatingFacet Item view accepts */
  export interface IRatingFacetItemProps extends ThemedSFCProps {
    /** Facet item to render */
    item: IFacetValue;
    /** Custom inline style */
    style: React.CSSProperties;
    /** MJS Configuration */
    config: MJSConfiguration;
  }
  const RatingFacetItem: React.SFC<IRatingFacetItemProps>;
  export default RatingFacetItem;
}
declare module 'components/RatingFacet/view' {
  /**
   * @module components/RatingFacet
   */
  import React from 'react';
  import { IFacet, IFacetValue, MJSConfiguration, ThemedSFCProps } from 'types';
  import { List } from 'immutable';
  /** Props that RatingFacet view accepts */
  export interface IRatingFacetProps extends ThemedSFCProps {
    /** Facet to extract values from */
    facet: IFacet;
    /** Facet values */
    items: List<IFacetValue>;
    /** MJS Configuration */
    config: MJSConfiguration;
    hidden: boolean;
  }
  const RatingFacet: React.SFC<IRatingFacetProps>;
  export default RatingFacet;
}
declare module 'components/search/DesktopActions' {
  /**
   * @module components/search/DesktopActions
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/search/DesktopActions/view' {
  /**
   * @module components/search/DesktopActions
   */
  import React from 'react';
  import { ThemedSFCProps, MJSConfiguration } from 'types';
  /** Props that DesktopActions view accepts */
  export interface IDesktopActionsProps extends ThemedSFCProps {
    /** Method to show facets */
    showFacets: () => any;
    /** Flag to indicate whether facets are visible */
    facetsVisible: boolean;
    /** Flag to indicate if we're in Smart Collection mode */
    isCollection: boolean;
    /** MJS Configuration */
    config: MJSConfiguration;
  }
  const DesktopActionsView: React.FunctionComponent<IDesktopActionsProps>;
  export default DesktopActionsView;
}
declare module 'components/search/DesktopFacets' {
  /**
   * @module components/search/DesktopFacets
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/search/DesktopFacets/Title' {
  /**
   * @module components/search/DesktopFacets
   */
  import React from 'react';
  import { ThemedSFCProps, MJSConfiguration, MJSValue } from 'types';
  import { Map } from 'immutable';
  /** Props that hidable facet titles accept */
  export interface IHidableProps extends ITitlesProps {
    /** Method to hide facets */
    onHide: () => any;
  }
  /** Props that facet titles accept */
  export interface ITitlesProps extends ThemedSFCProps {
    /** MJS Configuration */
    config: MJSConfiguration;
    /** MJS API Response Metadata */
    meta: Map<string, MJSValue>;
    /** Method to reset facets */
    onReset: () => any;
  }
  const defaultTitles: React.SFC<ITitlesProps>;
  export default defaultTitles;
  export const hidable: React.SFC<IHidableProps>;
}
declare module 'components/search/DesktopFacets/view' {
  /**
   * @module components/search/DesktopFacets
   */
  import React from 'react';
  import { MJSConfiguration, ThemedSFCProps, IFacet, MJSValue } from 'types';
  import { List, Map } from 'immutable';
  /** Props that DesktopFacets view accepts */
  export interface IDesktopFacetsProps extends ThemedSFCProps {
    /** MJS Configuration */
    config: MJSConfiguration;
    /** Facets list */
    facets: List<IFacet>;
    /** Method called to reset facets */
    onReset: () => any;
    /** MJS API Response Metadata */
    meta: Map<string, MJSValue>;
    /** Method to hide facets */
    hideFacets: () => any;
    /** Shows visibility status of facets */
    visible: boolean;
  }
  const DesktopFacetsView: React.SFC<IDesktopFacetsProps>;
  export default DesktopFacetsView;
}
declare module 'components/search/LazyResults' {
  /// <reference types="react" />
  const _default: import('react').ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/search/LazyResults/view' {
  /**
   * @module components/search/LazyResults
   */
  /// <reference types="react" />
  import { ThemedSFCProps, IProduct, MJSConfiguration } from 'types';
  import { List } from 'immutable';
  /** Props that LazyResultsView accepts */
  export interface ILazyResultsProps extends ThemedSFCProps {
    /** List of Products */
    items: List<IProduct>;
    /** MJS Configuration */
    config: MJSConfiguration;
    /** Number of columns that one item occupies in a 12-col grid */
    columns: string;
    /** Method to load next page */
    onLoadNext: () => any;
    /** Method to load previous page */
    onLoadPrev: () => any;
    /** Flag whether to display next button */
    displayNextButton: boolean;
    /** Flag whether to display previous button */
    displayPrevButton: boolean;
    /** Rest of the props get passed down to ProductCard */
    [x: string]: any;
  }
  const LazyResultsView: ({
    items,
    config,
    theme,
    card,
    onLoadNext,
    onLoadPrev,
    displayNextButton,
    displayPrevButton,
    ...rest
  }: ILazyResultsProps) => JSX.Element;
  export default LazyResultsView;
}
declare module 'components/search/MobileActions' {
  /**
   * @module components/search/MobileActions
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/search/MobileActions/view' {
  /**
   * @module components/search/MobileActions
   */
  import React from 'react';
  import { MJSConfiguration, ThemedSFCProps } from 'types';
  /** Props that MobileActionsView accepts */
  export interface IMobileActionsProps extends ThemedSFCProps {
    /** Flag, showing whether smart collection or regular searches are opened */
    isCollection?: boolean;
    /** Number of filters currently applied */
    total: number;
    /** Flag whether to show facets selection */
    showFacets?: boolean;
    /** Flag whether to show sorting */
    showSort?: boolean;
    /** MJS Configuration */
    config: MJSConfiguration;
    /** Current sorting mode */
    sorting: string;
  }
  const MobileActionsView: React.SFC<IMobileActionsProps>;
  export default MobileActionsView;
}
declare module 'components/search/MobileFacets' {
  /**
   * @module components/search/MobileFacets
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/search/MobileFacets/Titles' {
  /**
   * @module components/search/MobileFacets
   */
  import React from 'react';
  import { ThemedSFCProps, IFacet, MJSConfiguration } from 'types';
  import { List } from 'immutable';
  /** Props that MobileFacets FacetLabel accepts */
  export interface IMobileFacetsLabelProps extends ThemedSFCProps {
    /** Facet */
    item: IFacet;
    /** Count of filters enabled */
    filterCount?: number;
    /** MJS Configuration */
    config: MJSConfiguration;
    /** Click handler to open facet customization menu */
    onClick: (evt?: React.MouseEvent<any>) => any;
  }
  /** Props that MobileFacets TitlesView accepts */
  export interface IMobileFacetsTitlesProps extends ThemedSFCProps {
    /** immutable.List of facets */
    facets: List<IFacet>;
    /** Method to select facet by its name */
    selectFacet: (name: string) => any;
    /** MJS Configuration */
    config: MJSConfiguration;
  }
  const MobileFacetsTitlesView: ({
    theme,
    facets,
    selectFacet,
    config,
  }: IMobileFacetsTitlesProps) => JSX.Element;
  export default MobileFacetsTitlesView;
}
declare module 'components/search/MobileFacets/view' {
  /**
   * @module components/search/MobileFacets
   */
  /// <reference types="react" />
  import { ThemedSFCProps, IFacet, MJSConfiguration, MJSValue } from 'types';
  import { List } from 'immutable';
  /** Props that FacetContent accepts */
  export interface IFacetContentProps extends ThemedSFCProps {
    /** Currently active facet */
    active: IFacet;
    /** MJS Configuration */
    config: MJSConfiguration;
  }
  /** Props that MobileFacets view accepts */
  export interface IMobileFacetsProps extends ThemedSFCProps {
    /** immutable.List() of Facets */
    facets: List<IFacet>;
    /** Currently active facet */
    activeFacet?: IFacet;
    /** Method used to select a facet */
    selectFacet: (name?: string) => any;
    /** Method used to reset facet */
    onReset: () => any;
    /** MJS Configuration */
    config: MJSConfiguration;
    /** MJS API Request Metadata */
    meta: Map<string, MJSValue>;
    /** Method used for hiding modal / drawer */
    hideModal: (name: string) => any;
    /** Total filters selected */
    total: number;
    /** Filters selected for active facet */
    filtersSelected: number;
  }
  const _default: ({
    theme,
    facets,
    activeFacet,
    selectFacet,
    onReset,
    config,
    meta,
    hideModal,
    total,
    filtersSelected,
  }: IMobileFacetsProps) => JSX.Element;
  export default _default;
}
declare module 'components/search/MobileSorting' {
  /**
   * @module components/search/MobileSorting
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/search/MobileSorting/view' {
  /**
   * @module components/search/MobileSorting
   */
  import React from 'react';
  import { ThemedSFCProps, ISortingItem, MJSConfiguration } from 'types';
  import { List } from 'immutable';
  /** Props that MobileSorting Item accepts */
  export interface IMobileSortingItemProps extends ThemedSFCProps {
    /** Sorting item object to display */
    item: ISortingItem;
    /** Sorting item index in array */
    index: number;
    /** Click handler */
    onClick: (evt?: React.MouseEvent<any>) => any;
  }
  /** Props that MobileSorting view accepts */
  export interface IMobileSortingProps extends ThemedSFCProps {
    /** Custom inline styles */
    style: React.CSSProperties;
    /** Method to hide modal from Drawer */
    hideModal: (name: string) => any;
    /** MJS Configuration */
    config: MJSConfiguration;
    /** Sorting items as immutable.List() */
    items: List<ISortingItem>;
    /** Method used to set needed sorting */
    setSorting: (index: number) => any;
  }
  const MobileSortingView: ({
    theme,
    style,
    hideModal,
    config,
    items,
    setSorting,
  }: IMobileSortingProps) => JSX.Element;
  export default MobileSortingView;
}
declare module 'components/search/Query' {
  /**
   * @module components/search/Query
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/search/Query/view' {
  /**
   * @module components/search/Query
   */
  /// <reference types="react" />
  import { IQuery, MJSConfiguration, MJSValue, ThemedSFCProps } from 'types';
  import { Map } from 'immutable';
  /** Props that getContent method uses to build query text at the top of Search page */
  export interface IGetContentProps {
    /** Search query */
    query: IQuery;
    /** MJS Configuration */
    config: MJSConfiguration;
    /** Additional MJS API request meta */
    meta: Map<string, MJSValue>;
  }
  const QueryView: ({
    theme,
    ...props
  }: ThemedSFCProps & IGetContentProps) => JSX.Element;
  export default QueryView;
}
declare module 'components/search/StaticResults' {
  /**
   * @module components/search/StaticResults
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/search/StaticResults/view' {
  /**
   * @module components/search/StaticResults
   */
  /// <reference types="react" />
  import { ThemedSFCProps, MJSConfiguration } from 'types';
  /** Props that StaticResults accepts */
  export interface IStaticResultsProps extends ThemedSFCProps {
    /** MJS Configuration */
    config: MJSConfiguration;
    /** Number of columns that one item occupies in 12-col grid */
    columns: number;
  }
  const StaticResultsView: ({ theme }: IStaticResultsProps) => JSX.Element;
  export default StaticResultsView;
}
declare module 'components/Sorting' {
  /**
   * @module components/Sorting
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'components/Sorting/view' {
  /**
   * @module components/Sorting
   */
  /// <reference types="react" />
  import { MJSConfiguration, ISortingItem, ThemedSFCProps } from 'types';
  import { List } from 'immutable';
  /** List of props Sorting view accepts */
  export interface ISortingProps extends ThemedSFCProps {
    /** Callback called when sorting is changed */
    onChangeSort?: (value: any) => void;
    /** MJS configuration */
    config: MJSConfiguration;
    /** List of Sorting configurations */
    items: List<ISortingItem>;
    /** Current selected sorting configuration */
    selectedItem: ISortingItem;
  }
  const Sorting: ({
    onChangeSort,
    config,
    theme,
    items,
    selectedItem,
  }: ISortingProps) => JSX.Element;
  export default Sorting;
}
declare module 'components/Tabs' {
  /**
   * @module components/Tabs
   */
  import React from 'react';
  export const Tabs: React.ComponentClass<unknown, any>;
  export const Tab: () => null;
}
declare module 'components/Tabs/test' {
  export {};
}
declare module 'components/Tabs/view' {
  /**
   * @module components/Tabs
   */
  import React from 'react';
  import { ThemedSFCProps } from 'types';
  export interface ITabsProps extends ThemedSFCProps {
    /** Currently selected tab. Keep it empty if you want to use Tabs in self-controlled mode */
    selectedIndex?: number;
    /** Flag to render Tabs in mobile mode */
    isMobile?: boolean;
    /** Tab click event handler */
    onTabClick: (evt: Event) => any;
    /** Current tab body */
    body: React.ReactChildren;
  }
  const TabsView: ({
    theme,
    children,
    onTabClick,
    body,
    selectedIndex,
    isMobile,
  }: ITabsProps) => JSX.Element;
  export default TabsView;
}
declare module 'components/Text' {
  /**
   * @module components/Text
   */
  import React from 'react';
  const _default: React.ComponentClass<any, any>;
  export default _default;
}
declare module 'components/Text/view' {
  /**
   * @module components/Text
   */
  import { Component } from 'react';
  import { ThemedSFCProps, ClassnamedProps } from 'types';
  /** Props that Text component accepts */
  export interface ITextProps extends ThemedSFCProps, ClassnamedProps {
    /** Either an html tag name or a React.Component */
    component?: string | Component;
    /** One of modes specified in styles.css */
    mode?: string;
    /** Flag to show text as bold */
    bold?: boolean;
    /** Custom inline styles */
    style?: {
      [x: string]: string;
    };
    /** Flag to show text as inline block */
    inlineBlock?: boolean;
    /** One of sizes specified in styles.css */
    size?: string;
    /** Custom HTML */
    html?: string;
  }
  const TextView: ({
    component,
    className,
    children,
    mode,
    theme,
    bold,
    style,
    inlineBlock,
    size,
    html: __html,
  }: ITextProps) => import('react').DetailedReactHTMLElement<
    import('react').InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  export default TextView;
}
declare module 'helpers/bundle' {
  /// <reference types="recompose" />
  import React from 'react';
  import { List } from 'immutable';
  export const provideBundle: (
    getInitialItems?: (i: any) => any
  ) => (
    BaseComponent: any
  ) => {
    new (props: {} | Readonly<{}>): {
      state: {
        inBundle: List<any>;
      };
      getChildContext(): {
        inBundle: List<any>;
        updateBundle: (inBundle: any) => void;
      };
      updateBundle: (inBundle: any) => void;
      componentWillReceiveProps(next: any): void;
      render(): JSX.Element;
      context: any;
      setState<K extends never>(
        state:
          | {}
          | ((
              prevState: Readonly<{}>,
              props: Readonly<{}>
            ) => {} | Pick<{}, K> | null)
          | Pick<{}, K>
          | null,
        callback?: (() => void) | undefined
      ): void;
      forceUpdate(callback?: (() => void) | undefined): void;
      readonly props: Readonly<{}> &
        Readonly<{
          children?: React.ReactNode;
        }>;
      refs: {
        [key: string]: React.ReactInstance;
      };
      componentDidMount?(): void;
      shouldComponentUpdate?(
        nextProps: Readonly<{}>,
        nextState: Readonly<{}>,
        nextContext: any
      ): boolean;
      componentWillUnmount?(): void;
      componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
      getSnapshotBeforeUpdate?(
        prevProps: Readonly<{}>,
        prevState: Readonly<{}>
      ): any;
      componentDidUpdate?(
        prevProps: Readonly<{}>,
        prevState: Readonly<{}>,
        snapshot?: any
      ): void;
      componentWillMount?(): void;
      UNSAFE_componentWillMount?(): void;
      UNSAFE_componentWillReceiveProps?(
        nextProps: Readonly<{}>,
        nextContext: any
      ): void;
      componentWillUpdate?(
        nextProps: Readonly<{}>,
        nextState: Readonly<{}>,
        nextContext: any
      ): void;
      UNSAFE_componentWillUpdate?(
        nextProps: Readonly<{}>,
        nextState: Readonly<{}>,
        nextContext: any
      ): void;
    };
    new (props: {}, context: any): {
      state: {
        inBundle: List<any>;
      };
      getChildContext(): {
        inBundle: List<any>;
        updateBundle: (inBundle: any) => void;
      };
      updateBundle: (inBundle: any) => void;
      componentWillReceiveProps(next: any): void;
      render(): JSX.Element;
      context: any;
      setState<K extends never>(
        state:
          | {}
          | ((
              prevState: Readonly<{}>,
              props: Readonly<{}>
            ) => {} | Pick<{}, K> | null)
          | Pick<{}, K>
          | null,
        callback?: (() => void) | undefined
      ): void;
      forceUpdate(callback?: (() => void) | undefined): void;
      readonly props: Readonly<{}> &
        Readonly<{
          children?: React.ReactNode;
        }>;
      refs: {
        [key: string]: React.ReactInstance;
      };
      componentDidMount?(): void;
      shouldComponentUpdate?(
        nextProps: Readonly<{}>,
        nextState: Readonly<{}>,
        nextContext: any
      ): boolean;
      componentWillUnmount?(): void;
      componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
      getSnapshotBeforeUpdate?(
        prevProps: Readonly<{}>,
        prevState: Readonly<{}>
      ): any;
      componentDidUpdate?(
        prevProps: Readonly<{}>,
        prevState: Readonly<{}>,
        snapshot?: any
      ): void;
      componentWillMount?(): void;
      UNSAFE_componentWillMount?(): void;
      UNSAFE_componentWillReceiveProps?(
        nextProps: Readonly<{}>,
        nextContext: any
      ): void;
      componentWillUpdate?(
        nextProps: Readonly<{}>,
        nextState: Readonly<{}>,
        nextContext: any
      ): void;
      UNSAFE_componentWillUpdate?(
        nextProps: Readonly<{}>,
        nextState: Readonly<{}>,
        nextContext: any
      ): void;
    };
    childContextTypes: {
      inBundle: import('prop-types').Validator<object>;
      updateBundle: import('prop-types').Validator<(...args: any[]) => any>;
    };
    contextType?: React.Context<any> | undefined;
  };
  export const connectBundle: import('recompose').InferableComponentEnhancer<{
    inBundle: object;
    updateBundle: (...args: any[]) => any;
  }>;
}
declare module 'helpers/chunks' {
  /// <reference path="../../index.d.ts" />
  const _default: {
    /** Views */
    views: {
      search: () => Promise<typeof import('../layouts/Search')>;
      autocomplete: () => Promise<typeof import('../layouts/Autocomplete')>;
      recommendation: () => Promise<typeof import('../layouts/Recommendation')>;
      zeroResults: () => Promise<typeof import('../layouts/ZeroResults')>;
      custom: () => Promise<typeof import('../layouts/Custom')>;
      content: () => Promise<typeof import('../layouts/Content')>;
      tabs: () => Promise<typeof import('../layouts/Tabs')>;
    };
    /** Autocomplete */
    autocomplete: {
      sidebar: () => Promise<typeof import('layouts/Autocomplete/Sidebar')>;
      dropdown: () => Promise<typeof import('layouts/Autocomplete/Dropdown')>;
      fullscreen: () => Promise<
        typeof import('layouts/Autocomplete/Fullscreen')
      >;
    };
    components: {
      virtualizedList: () => Promise<
        typeof import('components/common/VirtualizedList')
      >;
      drawer: () => Promise<typeof import('components/common/Drawer')>;
    };
  };
  export default _default;
}
declare module 'helpers/createPortal' {
  import React, { Component } from 'react';
  export class Portal extends Component<any> {
    element: any;
    static displayName: string;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): any;
  }
  export const portal: (
    children: any,
    extraProps?: {}
  ) => React.CElement<any, Portal>;
}
declare module 'helpers/debounce' {
  export const debounce: (fn: any, wait?: any) => () => void;
}
declare module 'helpers/deprecated' {
  import React from 'react';
  const _default: (
    name: any
  ) => (
    base: any
  ) => (props: any) => React.CElement<any, React.Component<any, any, any>>;
  export default _default;
}
declare module 'helpers/emmiter' {
  export const emit: (...args: any[]) => any;
  export const listen: (...args: any[]) => any;
}
declare module 'helpers/escapeRegExp' {
  export const escapeRegExp: (s: any) => any;
}
declare module 'helpers/formatCurrency' {
  export interface ICurrencyData {
    symbol?: string;
    thousand?: string;
    decimal?: string;
    precision?: number;
    symbolOnLeft?: boolean;
    spaceBetweenAmountAndSymbol?: boolean;
    format?: {
      pos: string;
      neg: string;
      zero: string;
    };
  }
  const _default: (currency?: ICurrencyData) => (value: string) => any;
  export default _default;
}
declare module 'helpers/getBreakpoint' {
  const _default: (breakpoints: any, width?: number) => any;
  export default _default;
}
declare module 'helpers/getPrice' {
  export const priceIsSampleArray: (price: any) => boolean;
  export const getPrice: (maybeImmutablePrice: any, currency: any) => any;
}
declare module 'helpers/omit' {
  const _default: (keys: any) => (obj: any) => any;
  export default _default;
}
declare module 'helpers/pure' {
  import { ComponentEnhancer } from 'recompose';
  const _default: ComponentEnhancer<unknown, unknown>;
  export default _default;
}
declare module 'helpers/template' {
  const _default: (
    template?: string,
    selector?: RegExp
  ) => (...args: any[]) => any;
  export default _default;
}
declare module 'helpers/useColumns' {
  type MediaObject = {
    [x: number]: number | string;
  };
  const _default: (media: MediaObject) => string;
  export default _default;
}
declare module 'helpers/useMedia' {
  const _default: (..._breakpoints: number[]) => boolean[];
  export default _default;
}
declare module 'helpers/useTheme' {
  const _default: (
    theme?: {},
    styles?: {}
  ) => {
    [className: string]: string;
  };
  export default _default;
}
declare module 'helpers/withColumns' {
  /// <reference types="react" />
  import sizeMe from 'react-sizeme';
  const _default: (
    columnsMapper?: (width: any, props?: any) => 3 | 4 | 6 | 12
  ) => (
    baseComponent: any
  ) => import('react').ComponentType<Pick<{}, never> & sizeMe.WithSizeProps>;
  export default _default;
}
declare module 'helpers/withDrawer' {
  export const withDrawer: (
    modalName: any,
    modalComponent: any,
    { renderTo, ...options }?: any
  ) => (BaseComponent: any) => any;
}
declare module 'helpers/withErrorHandler' {
  import React from 'react';
  const _default: (
    BaseComponent: any
  ) => {
    new (props: {} | Readonly<{}>): {
      state: {
        error: boolean;
      };
      componentDidCatch(error: any, info: any): void;
      render(): React.CElement<
        unknown,
        React.Component<unknown, any, any>
      > | null;
      context: any;
      setState<K extends never>(
        state:
          | {}
          | ((
              prevState: Readonly<{}>,
              props: Readonly<{}>
            ) => {} | Pick<{}, K> | null)
          | Pick<{}, K>
          | null,
        callback?: (() => void) | undefined
      ): void;
      forceUpdate(callback?: (() => void) | undefined): void;
      readonly props: Readonly<{}> &
        Readonly<{
          children?: React.ReactNode;
        }>;
      refs: {
        [key: string]: React.ReactInstance;
      };
      componentDidMount?(): void;
      shouldComponentUpdate?(
        nextProps: Readonly<{}>,
        nextState: Readonly<{}>,
        nextContext: any
      ): boolean;
      componentWillUnmount?(): void;
      getSnapshotBeforeUpdate?(
        prevProps: Readonly<{}>,
        prevState: Readonly<{}>
      ): any;
      componentDidUpdate?(
        prevProps: Readonly<{}>,
        prevState: Readonly<{}>,
        snapshot?: any
      ): void;
      componentWillMount?(): void;
      UNSAFE_componentWillMount?(): void;
      componentWillReceiveProps?(
        nextProps: Readonly<{}>,
        nextContext: any
      ): void;
      UNSAFE_componentWillReceiveProps?(
        nextProps: Readonly<{}>,
        nextContext: any
      ): void;
      componentWillUpdate?(
        nextProps: Readonly<{}>,
        nextState: Readonly<{}>,
        nextContext: any
      ): void;
      UNSAFE_componentWillUpdate?(
        nextProps: Readonly<{}>,
        nextState: Readonly<{}>,
        nextContext: any
      ): void;
    };
    new (props: {}, context: any): {
      state: {
        error: boolean;
      };
      componentDidCatch(error: any, info: any): void;
      render(): React.CElement<
        unknown,
        React.Component<unknown, any, any>
      > | null;
      context: any;
      setState<K extends never>(
        state:
          | {}
          | ((
              prevState: Readonly<{}>,
              props: Readonly<{}>
            ) => {} | Pick<{}, K> | null)
          | Pick<{}, K>
          | null,
        callback?: (() => void) | undefined
      ): void;
      forceUpdate(callback?: (() => void) | undefined): void;
      readonly props: Readonly<{}> &
        Readonly<{
          children?: React.ReactNode;
        }>;
      refs: {
        [key: string]: React.ReactInstance;
      };
      componentDidMount?(): void;
      shouldComponentUpdate?(
        nextProps: Readonly<{}>,
        nextState: Readonly<{}>,
        nextContext: any
      ): boolean;
      componentWillUnmount?(): void;
      getSnapshotBeforeUpdate?(
        prevProps: Readonly<{}>,
        prevState: Readonly<{}>
      ): any;
      componentDidUpdate?(
        prevProps: Readonly<{}>,
        prevState: Readonly<{}>,
        snapshot?: any
      ): void;
      componentWillMount?(): void;
      UNSAFE_componentWillMount?(): void;
      componentWillReceiveProps?(
        nextProps: Readonly<{}>,
        nextContext: any
      ): void;
      UNSAFE_componentWillReceiveProps?(
        nextProps: Readonly<{}>,
        nextContext: any
      ): void;
      componentWillUpdate?(
        nextProps: Readonly<{}>,
        nextState: Readonly<{}>,
        nextContext: any
      ): void;
      UNSAFE_componentWillUpdate?(
        nextProps: Readonly<{}>,
        nextState: Readonly<{}>,
        nextContext: any
      ): void;
    };
    displayName: string;
    contextType?: React.Context<any> | undefined;
  };
  export default _default;
}
declare module 'helpers/withEvents' {
  import React from 'react';
  const _default: (
    events?: any
  ) => (
    BaseComponent: any
  ) => (props: any) => React.CElement<any, React.Component<any, any, any>>;
  export default _default;
}
declare module 'helpers/withLazy' {
  import React from 'react';
  const _default: () => (
    BaseComponent: any
  ) => {
    new (props: any): {
      container: any;
      autoLoadCount: number;
      registerContainer: (ref: any) => void;
      onLoadNext: () => any;
      onLoadPrev: () => any;
      readonly lessAllowed: any;
      readonly moreAllowed: any;
      trackPosition: () => number | false;
      componentDidMount(): void;
      componentWillUnmount(): void;
      UNSAFE_componentWillReceiveProps({
        items,
        meta,
        config,
      }: {
        items: any;
        meta: any;
        config: any;
      }): void;
      shouldComponentUpdate(props: any, state: any): boolean;
      render(): JSX.Element;
      context: any;
      setState<K extends string | number | symbol>(
        state: any,
        callback?: (() => void) | undefined
      ): void;
      forceUpdate(callback?: (() => void) | undefined): void;
      readonly props: Readonly<any> &
        Readonly<{
          children?: React.ReactNode;
        }>;
      state: Readonly<any>;
      refs: {
        [key: string]: React.ReactInstance;
      };
      componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
      getSnapshotBeforeUpdate?(
        prevProps: Readonly<any>,
        prevState: Readonly<any>
      ): any;
      componentDidUpdate?(
        prevProps: Readonly<any>,
        prevState: Readonly<any>,
        snapshot?: any
      ): void;
      componentWillMount?(): void;
      UNSAFE_componentWillMount?(): void;
      componentWillReceiveProps?(
        nextProps: Readonly<any>,
        nextContext: any
      ): void;
      componentWillUpdate?(
        nextProps: Readonly<any>,
        nextState: Readonly<any>,
        nextContext: any
      ): void;
      UNSAFE_componentWillUpdate?(
        nextProps: Readonly<any>,
        nextState: Readonly<any>,
        nextContext: any
      ): void;
    };
    contextType?: React.Context<any> | undefined;
  };
  /**
   * withLazy() returns a HOC for wrapping around component you want to include lazy loading to
   * @returns HOC, accepting a view you want to add lazy loading to
   */
  export default _default;
}
declare module 'helpers/withMinResultsToShow' {
  const _default: () => (BaseComponent: any) => (props: any) => any;
  /**
   * withMinResultsToShow allows you to only show component,
   * when it either has no minResultsToShow on its configuration, or when it has minResultsToShow and
   * number of items provided to component is either equal or exceeds minResultsToShow configuration value
   * @param BaseComponent view you will be adding minResultsToShow functionality to
   * @returns MinResultsToShow-enhanced HOC
   */
  export default _default;
}
declare module 'helpers/withMobile' {
  /// <reference types="react" />
  export const useMobile: () => boolean;
  const _default: (
    BaseComponent: any
  ) => (
    props: any
  ) => import('react').CElement<any, import('react').Component<any, any, any>>;
  export default _default;
}
declare module 'helpers/withScrollOnItemsChange' {
  /// <reference types="recompose" />
  const _default: import('recompose').ComponentEnhancer<unknown, unknown>;
  export default _default;
}
declare module 'helpers/withTheme' {
  import React from 'react';
  const _default: (
    defaultTheme: any
  ) => (
    Component: any
  ) => ({
    theme,
    ...props
  }: {
    [x: string]: any;
    theme: any;
  }) => React.CElement<
    {
      theme: any;
    },
    React.Component<
      {
        theme: any;
      },
      any,
      any
    >
  >;
  export default _default;
}
declare module 'helpers/withTheme.test' {
  export {};
}
declare module 'layouts/Autocomplete/Dropdown' {
  /// <reference types="react" />
  const _default: import('react').ComponentClass<unknown, any>;
  export default _default;
}
declare module 'layouts/Autocomplete/Dropdown/trackPosition' {
  export const usePosition: () => any[];
  const _default: (BaseComponent: any) => (props: any) => any;
  export default _default;
}
declare module 'layouts/Autocomplete/Dropdown/view' {
  /**
   * @module layouts/Autocomplete/Dropdown
   */
  import React from 'react';
  import {
    ThemedSFCProps,
    MJSConfiguration,
    ISuggestion,
    MJSValue,
  } from 'types';
  import { List } from 'immutable';
  export interface IAutocompletePanel extends ThemedSFCProps {
    config: MJSConfiguration;
    isTrendingSearches?: boolean;
    [x: string]: any;
  }
  /** Props that SearchOrZero component accepts */
  export interface ISearchOrZeroProps {
    /** List of search suggestions */
    suggestions: List<ISuggestion>;
    /** MJS Configuration */
    config: MJSConfiguration;
    /** MJS API Request Meta */
    meta: Map<string, MJSValue>;
    /** Selected suggestion index. -1 means no suggestion is selected on keyboard */
    selectedSuggestion: number;
    /** Flag that shows if autocomplete is running in TrendingSearches mode */
    isTrendingSearches: boolean;
    /** Rest of the props passed down to panels */
    [x: string]: any;
  }
  export interface IAutocompleteDropdownProps {
    /** List of search suggestions */
    suggestions: List<ISuggestion>;
    /** MJS Configuration */
    config: MJSConfiguration;
    /** MJS API Request Meta */
    meta: Map<string, MJSValue>;
    /** Selected suggestion index. -1 means no suggestion is selected on keyboard */
    selectedSuggestion: number;
    /** Flag that shows if autocomplete is running in TrendingSearches mode */
    isTrendingSearches: boolean;
    /** Rest of the props passed down to panels */
    [x: string]: any;
  }
  const AutocompleteDropdownView: React.SFC<IAutocompleteDropdownProps>;
  export default AutocompleteDropdownView;
}
declare module 'layouts/Autocomplete/Fullscreen' {
  /**
   * @module layouts/Autocomplete/Fullscreen
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'layouts/Autocomplete/Fullscreen/view' {
  /**
   * @module layouts/Autocomplete/Fullscreen
   */
  /// <reference types="react" />
  const _default: ({
    config,
    theme,
    meta,
    suggestions,
    innerRef,
    position,
    ...rest
  }: {
    [x: string]: any;
    config: any;
    theme: any;
    meta: any;
    suggestions: any;
    innerRef: any;
    position: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'layouts/Autocomplete' {
  /**
   * @module layouts/Autocomplete
   */
  const _default: any;
  export default _default;
}
declare module 'layouts/Autocomplete/Sidebar' {
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'layouts/Autocomplete/Sidebar/view' {
  import React from 'react';
  class Sidebar extends React.Component {
    state: {
      isOpen: boolean;
    };
    suggestionsContainer: any;
    input: any;
    isFocused: any;
    mounted: boolean;
    componentWillUnmount(): void;
    componentDidMount(): void;
    handleFocusOut: (e: any) => void;
    handleInputChange: ({
      target: { value },
    }: {
      target: {
        value: any;
      };
    }) => void;
    componentDidUpdate(): void;
    handleExited: () => void;
    getInputRef: (el: any) => void;
    handleSubmit: () => void;
    render(): JSX.Element;
  }
  export default Sidebar;
}
declare module 'layouts/Autocomplete/withAutocompleteLogic' {
  import React from 'react';
  export const useAutocompleteLogic: () => {
    selectedSuggestion: any;
    closeAutocomplete: () => any;
  };
  const _default: (
    BaseComponent: any
  ) => (
    props: any
  ) => React.CElement<unknown, React.Component<unknown, any, any>>;
  export default _default;
}
declare module 'layouts/Content' {
  /**
   * @module layouts/ContentSearch
   */
  const _default: any;
  export default _default;
}
declare module 'layouts/Content/view' {
  /**
   * @module layouts/ContentSearch
   */
  /// <reference types="react" />
  import { MJSConfiguration, MJSValue, ThemedSFCProps } from 'types';
  /** This is a list of props ContentSearchLayout accepts */
  export interface IContentSearchProps extends ThemedSFCProps {
    /** MJS configuration */
    config: MJSConfiguration;
    /** MJS Request meta-information, like query, offset, limits */
    meta: Map<string, MJSValue>;
    /** Flag that tells ContentSearchView to render in mobile mode */
    isMobile?: boolean;
    /** Flag to pull filters to the right on desktop */
    filtersOnRight?: boolean;
  }
  const _default: ({ config, theme }: IContentSearchProps) => JSX.Element;
  export default _default;
}
declare module 'layouts/Custom' {
  /// <reference types="react" />
  const _default: import('react').ComponentClass<unknown, any>;
  export default _default;
}
declare module 'layouts/Custom/view' {
  /// <reference types="react" />
  const _default: ({ theme }: { theme: any }) => JSX.Element;
  export default _default;
}
declare module 'layouts/Recommendation/Grid' {
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'layouts/Recommendation/Grid/view' {
  /**
   * @module layouts/Recommendation/Grid
   */
  /// <reference types="react" />
  import { IProduct, MJSConfiguration, ThemedSFCProps } from 'types/index';
  import { List } from 'immutable';
  /** This is a list of props Grid layout for Recommendations accepts */
  export interface IGridProps extends ThemedSFCProps {
    /** immutable.List of Products to display */
    items: List<IProduct>;
    /** MJS configuration */
    config: MJSConfiguration;
    columns: string;
  }
  const GridRecommendationLayout: ({
    items,
    config,
    columns,
  }: IGridProps) => JSX.Element | null;
  export default GridRecommendationLayout;
}
declare module 'layouts/Recommendation' {
  /**
   * @module layouts/Recommendation
   */
  const _default: any;
  export default _default;
}
declare module 'layouts/Recommendation/Slider' {
  /**
   * @module layouts/Recommendation/Slider
   */
  import React from 'react';
  import 'layouts/Recommendation/Slider/styles.global.css';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'layouts/Recommendation/Slider/Swiper' {
  /// <reference types="react" />
  const _default: ({
    children,
    ...props
  }: {
    [x: string]: any;
    children: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'layouts/Recommendation/Slider/view' {
  /// <reference types="react" />
  const _default: ({
    items,
    config,
    theme,
    sliderOptions,
  }: {
    items: any;
    config: any;
    theme: any;
    sliderOptions: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'layouts/Search' {
  /**
   * @module layouts/Search
   */
  const _default: any;
  export default _default;
}
declare module 'layouts/Search/view' {
  /// <reference types="react" />
  import { List } from 'immutable';
  import { MJSConfiguration, ThemedSFCProps, IProduct } from 'types';
  /** Props that search layout accepts */
  export interface ISearchProps extends ThemedSFCProps {
    /** MJS Configuration */
    config: MJSConfiguration;
    /** Flag that switches Search to mobile layout */
    isMobile?: boolean;
    /** Flag to turn on Smart Collection display mode */
    isCollection?: boolean;
    /** Flag to render mobile facets */
    mobileFacetsOpened?: boolean;
    /** Flag to show filters on the right side of desktop search */
    filtersOnRight?: boolean;
    /** Items list */
    items: List<IProduct>;
  }
  const SearchLayout: ({
    config,
    isCollection,
    theme,
    items,
  }: {
    config: any;
    isCollection: any;
    theme: any;
    items: any;
  }) => JSX.Element;
  export default SearchLayout;
}
declare module 'layouts/Tabs' {
  const _default: any;
  export default _default;
}
declare module 'layouts/Tabs/view' {
  /// <reference types="react" />
  const _default: ({
    onClick,
    widgets,
    theme,
  }: {
    onClick: any;
    widgets: any;
    theme: any;
  }) => JSX.Element;
  export default _default;
}
declare module 'layouts/ZeroResults' {
  /**
   * @module layouts/ZeroResults
   */
  import React from 'react';
  const _default: React.ComponentClass<unknown, any>;
  export default _default;
}
declare module 'layouts/ZeroResults/view' {
  /**
   * @module layouts/ZeroResults
   */
  /// <reference types="react" />
  import { List } from 'immutable';
  import { IProduct, ThemedSFCProps, MJSConfiguration } from 'types';
  /** Props that ZeroResults layout accepts */
  export interface IZeroResultsProps extends ThemedSFCProps {
    /** List of trending products */
    items: List<IProduct>;
    /** @hidden */
    title: string;
    /** MJS configuration */
    config: MJSConfiguration;
    /** Number of columns that each item occupies in 12-col grid */
    columns: number;
  }
  const ZeroResultsLayout: ({
    items,
    title,
    theme,
    columns,
    config,
  }: IZeroResultsProps) => JSX.Element;
  export default ZeroResultsLayout;
}
