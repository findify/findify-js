declare module 'components/autocomplete/ProductMatches' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/autocomplete/ProductMatches/view' {
/// <reference types="react" />
import React from 'react';
import { List } from 'immutable';
import { ThemedSFCProps, IProduct, MJSConfiguration, WidgetAwareProps, SuggestionsConnectedProps } from 'types';
export interface IProductMatchesProps extends ThemedSFCProps, WidgetAwareProps, SuggestionsConnectedProps {
    items: List<IProduct>;
    className?: string;
    columnClass?: string;
    config: MJSConfiguration;
    columns: number;
    limit: number;
}
const ProductMatchesView: React.SFC<IProductMatchesProps>;
export default ProductMatchesView;

}
declare module 'components/autocomplete/SearchSuggestions' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/autocomplete/SearchSuggestions/test' {
export {};

}
declare module 'components/autocomplete/SearchSuggestions/view' {
/// <reference types="react" />
import React from 'react';
import { ThemedSFCProps, WidgetAwareProps, SuggestionsConnectedProps, IQuery } from 'types';
export interface ISearchSuggestionsProps extends ThemedSFCProps, WidgetAwareProps, SuggestionsConnectedProps {
    query: IQuery;
    [x: string]: any;
}
const SearchSuggestionsView: React.SFC<ISearchSuggestionsProps>;
export default SearchSuggestionsView;

}
declare module 'components/autocomplete/SuggestionItem' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/autocomplete/SuggestionItem/test' {
export {};

}
declare module 'components/autocomplete/SuggestionItem/view' {
/// <reference types="react" />
import React from 'react';
import { ISuggestion, ISuggestionProps, IQuery, ThemedSFCProps } from 'types';
export interface ISuggestionItemProps extends ThemedSFCProps, ISuggestionProps {
    item?: ISuggestion;
    query: IQuery;
    highlighted: boolean;
    icon: string;
    isTrendingSearches: boolean;
    [x: string]: any;
}
const SuggestionItemView: React.SFC<ISuggestionItemProps>;
export default SuggestionItemView;

}
declare module 'components/autocomplete/Tip' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/autocomplete/Tip/test' {
export {};

}
declare module 'components/autocomplete/Tip/view' {
/// <reference types="react" />
import React from 'react';
import { ThemedSFCProps, ClassnamedProps, WidgetAwareProps, SuggestionsConnectedProps } from 'types';
export interface ITipProps extends ThemedSFCProps, ClassnamedProps, WidgetAwareProps, SuggestionsConnectedProps {
    title: string;
}
const TipView: React.SFC<ITipProps>;
export default TipView;

}
declare module 'components/Banner' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/Banner/view' {
/// <reference types="react" />
import React from 'react';
import { ThemedSFCProps, IBanner } from 'types';
export interface IBannerProps extends ThemedSFCProps {
    banner: IBanner;
    [x: string]: any;
}
const BannerView: React.SFC<IBannerProps>;
export default BannerView;

}
declare module 'components/Breadcrumbs/createBreadcrumb' {
/// <reference types="react" />
import React from 'react';
import { FilterType, ThemedSFCProps, IFacet, MJSConfiguration } from 'types';
export type FilterMapping = {
    [x in FilterType]: React.SFC<any>;
};
export interface IFilterProps {
    item: any;
    mapping: FilterMapping;
    type: FilterType;
    name: string;
}
export interface IFilterListProps extends ThemedSFCProps {
    item: IFacet;
    config: MJSConfiguration;
}
const _default: (mapping: FilterMapping) => ({ item, children, theme, config }: IFilterListProps) => JSX.Element;
export default _default;

}
declare module 'components/Breadcrumbs' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/Breadcrumbs/view' {
/// <reference types="react" />
import React from 'react';
import { IFacet, MJSConfiguration, ThemedSFCProps } from 'types';
import { List } from 'immutable';
export interface IBreadcrumbProps extends ThemedSFCProps {
    filters: List<IFacet>;
    config: MJSConfiguration;
}
const BreadcrumbsView: React.SFC<IBreadcrumbProps>;
export default BreadcrumbsView;

}
declare module 'components/Button' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<any>;
export default _default;

}
declare module 'components/Button/view' {
/// <reference types="react" />
import React from 'react';
import { ClassnamedProps, ThemedSFCProps } from 'types';
export interface IButtonProps extends ThemedSFCProps, ClassnamedProps {
    onClick?: (evt: Event) => any;
    active?: boolean;
    raw?: boolean;
    disabled?: boolean;
    [x: string]: any;
}
const ButtonView: React.SFC<IButtonProps>;
export default ButtonView;

}
declare module 'components/Cards/Content' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/Cards/Content/view' {
/// <reference types="react" />
const _default: ({ item, config, theme }: {
    item: any;
    config: any;
    theme: any;
}) => JSX.Element;
export default _default;

}
declare module 'components/Cards/Product/BundleAction/view' {
/// <reference types="react" />
const _default: ({ theme, onClick, selected }: any) => JSX.Element;
export default _default;

}
declare module 'components/Cards/Product' {
const ProductCard: any;
export default ProductCard;

}
declare module 'components/Cards/Product/Price' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/Cards/Product/Price/view' {
/// <reference types="react" />
import React from 'react';
import { List } from 'immutable';
import { ClassnamedProps, ThemedSFCProps } from 'types';
export interface IPriceProps extends ThemedSFCProps, ClassnamedProps {
    price: List<number>;
    oldPrice?: number;
    currency: string;
    discount: List<number>;
    hasDiscount: boolean;
    hasCompare: boolean;
}
const PriceView: React.SFC<IPriceProps>;
export default PriceView;

}
declare module 'components/Cards/Product/Rating' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/Cards/Product/Rating/test' {
export {};

}
declare module 'components/Cards/Product/Rating/view' {
/// <reference types="react" />
import 'core-js/fn/array/from';
import React from 'react';
import { ThemedSFCProps } from 'types';
export interface IRatingProps extends ThemedSFCProps {
    value: number;
    count: number;
}
const RatingView: React.SFC<IRatingProps>;
export default RatingView;

}
declare module 'components/Cards/Product/Stickers' {
/// <reference types="react" />
import React from 'react';
export const DiscountSticker: new (props: any) => {
    componentWillReceiveProps(nextProps: any): void;
    render(): React.ComponentElement<{
        theme: any;
        children?: React.ReactNode;
    }, React.Component<{
        theme: any;
        children?: React.ReactNode;
    }, React.ComponentState, any>>;
    setState<K extends never>(state: {} | Pick<{}, K> | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | null, callback?: (() => void) | undefined): void;
    forceUpdate(callBack?: (() => void) | undefined): void;
    readonly props: Readonly<{
        children?: React.ReactNode;
    }> & Readonly<{}>;
    state: Readonly<{}>;
    context: any;
    refs: {
        [key: string]: React.ReactInstance;
    };
};
export const OutOfStockSticker: new (props: any) => {
    componentWillReceiveProps(nextProps: any): void;
    render(): React.ComponentElement<{
        theme: any;
        children?: React.ReactNode;
    }, React.Component<{
        theme: any;
        children?: React.ReactNode;
    }, React.ComponentState, any>>;
    setState<K extends never>(state: {} | Pick<{}, K> | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | null, callback?: (() => void) | undefined): void;
    forceUpdate(callBack?: (() => void) | undefined): void;
    readonly props: Readonly<{
        children?: React.ReactNode;
    }> & Readonly<{}>;
    state: Readonly<{}>;
    context: any;
    refs: {
        [key: string]: React.ReactInstance;
    };
};

}
declare module 'components/Cards/Product/test' {
export {};

}
declare module 'components/Cards/Product/view' {
/// <reference types="react" />
import React from 'react';
import { IProduct, MJSConfiguration, ThemedSFCProps } from 'types';
export interface IProductCardProps extends ThemedSFCProps {
    item: IProduct;
    config: MJSConfiguration;
}
const ProductCardView: React.SFC<IProductCardProps>;
export default ProductCardView;

}
declare module 'components/CategoryFacet/content' {
const extractContent: ({ item }: {
    item: any;
}) => any;
export default extractContent;

}
declare module 'components/CategoryFacet' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/CategoryFacet/Item' {
/// <reference types="react" />
import { ThemedSFCProps, MJSConfiguration } from 'types';
export interface ICategoryFacetCategoryProps extends ThemedSFCProps {
    item: any;
    style: {
        [x: string]: string | number;
    };
    config: MJSConfiguration;
}
const Item: ({ item, theme, style, config }: ICategoryFacetCategoryProps) => JSX.Element;
export default Item;

}
declare module 'components/CategoryFacet/view' {
/// <reference types="react" />
import { IFacet, ThemedSFCProps, MJSConfiguration } from 'types';
import { List, Map } from 'immutable';
export interface ICategoryFacetProps extends ThemedSFCProps {
    facet: IFacet;
    items: List<Map<string, string | boolean | number>>;
    total: number;
    config: MJSConfiguration;
    isExpanded?: boolean;
    onToggle: (evt: Event) => any;
}
const CategoryFacetView: ({ theme, items, config, facet, total, isExpanded, onToggle }: ICategoryFacetProps) => JSX.Element;
export default CategoryFacetView;

}
declare module 'components/CheckboxFacet/content' {
const extractContent: ({ item }: {
    item: any;
}) => any;
export default extractContent;

}
declare module 'components/CheckboxFacet' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/CheckboxFacet/Item' {
/// <reference types="react" />
import { IFacetValue, ThemedSFCProps } from 'types';
export interface ICheckboxFacetItemProps extends ThemedSFCProps {
    item: IFacetValue;
    onItemClick?: (evt: Event) => any;
    style: {
        [x: string]: string | number;
    };
}
const Item: ({ item, theme, style, onItemClick }: ICheckboxFacetItemProps) => JSX.Element;
export default Item;

}
declare module 'components/CheckboxFacet/view' {
/// <reference types="react" />
import { ChangeEvent } from 'react';
import { IFacetValue, ThemedSFCProps, MJSConfiguration } from 'types';
import { List } from 'immutable';
export interface ICheckboxFacetProps extends ThemedSFCProps {
    items: List<IFacetValue>;
    config: MJSConfiguration;
    search?: string;
    isExpanded?: boolean;
    onSearch: (evt: ChangeEvent<HTMLInputElement>) => any;
    onToggle: (evt: Event) => any;
}
const CheckboxFacetView: ({ theme, items, config, search, isExpanded, onSearch, onToggle }: ICheckboxFacetProps) => JSX.Element;
export default CheckboxFacetView;

}
declare module 'components/ColorFacet/content' {
/// <reference types="react" />
const _default: ({ item, config, theme }: {
    item: any;
    config: any;
    theme: any;
}) => JSX.Element;
export default _default;

}
declare module 'components/ColorFacet' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/ColorFacet/Item' {
/// <reference types="react" />
import { IFacetValue, MJSConfiguration, ThemedSFCProps } from 'types';
export interface IColorFacetItemProps extends ThemedSFCProps {
    item: IFacetValue;
    config: MJSConfiguration;
}
const Item: ({ item, theme, config }: IColorFacetItemProps) => JSX.Element;
export default Item;

}
declare module 'components/ColorFacet/view' {
/// <reference types="react" />
import { ThemedSFCProps, MJSConfiguration, IFacetValue } from 'types';
import { List } from 'immutable';
export interface IColorFacetProps extends ThemedSFCProps {
    config: MJSConfiguration;
    items: List<IFacetValue>;
}
const ColorFacetView: ({ theme, items, config, }: IColorFacetProps) => JSX.Element;
export default ColorFacetView;

}
declare module 'components/common/Branch' {
/// <reference types="react" />
import React from 'react';
export interface IBranchProps {
    'display-if'?: boolean;
    left?: React.ComponentType;
    right?: React.ComponentType;
    condition?: boolean;
    [x: string]: any;
}
const Branch: ({ left, right, children, condition, ...props }: IBranchProps) => JSX.Element;
export default Branch;

}
declare module 'components/common/Drawer' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/common/Drawer/view' {
/// <reference types="react" />
import React from 'react';
import { ThemedSFCProps } from 'types';
export interface IDrawerViewState {
    open: boolean;
}
export interface IDrawerViewProps extends ThemedSFCProps {
    options: {
        from: {
            [x: string]: string | number;
        };
        to: {
            [x: string]: string | number;
        };
        easing?: string;
        className?: string;
    };
    [x: string]: any;
}
export default class DrawerView extends React.Component<IDrawerViewProps, IDrawerViewState> {
    state: {
        open: boolean;
    };
    mounted: boolean;
    originalScrollTop: number;
    static defaultProps: {
        options: {
            from: {
                transform: string;
            };
            to: {
                transform: string;
            };
        };
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    close: () => void;
    handleEscapeKeypress: (evt: any) => void;
    render(): JSX.Element;
}

}
declare module 'components/common/Grid/Column' {
/// <reference types="react" />
import React from 'react';
export interface IGridColumnProps {
    className?: string;
    columnClass?: string;
    columnStyle?: React.CSSProperties;
    children?: React.ReactChild;
}
const GridColumn: React.ComponentClass<{}>;
export default GridColumn;

}
declare module 'components/common/Grid' {
/// <reference types="react" />
import React from 'react';
import { ThemedSFCProps } from 'types';
export interface IGridProps extends ThemedSFCProps {
    columns: string;
    style?: React.StyleHTMLAttributes<any>;
}
const _default: React.ComponentClass<IGridProps>;
export default _default;

}
declare module 'components/common/Image' {
/// <reference types="react" />
import 'core-js/fn/array/includes';
import React from 'react';
export interface ImageProps {
    className?: string;
    src: string;
    thumbnail?: string;
    aspectRatio?: number;
    size: {
        width: number;
    };
    isFixedRatio: boolean;
}
const _default: React.ComponentClass<ImageProps>;
export default _default;

}
declare module 'components/common/Image/test' {
export {};

}
declare module 'components/common/MapArray' {
/// <reference types="react" />
import 'core-js/fn/array/from';
import React from 'react';
export type MapCallback = (item: any, index: number, arrayLike: ArrayLike) => any;
export type KeyAccessor = (item: any, index: number) => string;
export type ArrayLike = {
    map: (callback: MapCallback) => any;
    length?: number;
    size?: number;
    slice: (from: number, to?: number) => ArrayLike;
};
export type ReactFactory = (props: object) => React.Component;
export type MapArrayProps = {
    array: ArrayLike;
    keyAccessor?: KeyAccessor;
    factory: ReactFactory;
    limit?: number;
    [key: string]: any;
};
const _default: ({ array, keyAccessor, factory, limit, ...rest }: MapArrayProps) => any;
export default _default;

}
declare module 'components/common/MapArray/test' {
export {};

}
declare module 'components/common/Sticky' {
/// <reference types="react" />
import React from 'react';
export interface IStickyProps {
    offset?: number;
    minHeight?: number;
}
const _default: new (props: any) => {
    componentWillReceiveProps(nextProps: any): void;
    render(): React.ComponentElement<{
        theme: any;
        children?: React.ReactNode;
    }, React.Component<{
        theme: any;
        children?: React.ReactNode;
    }, React.ComponentState, any>>;
    setState<K extends never>(state: {} | Pick<{}, K> | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | null, callback?: (() => void) | undefined): void;
    forceUpdate(callBack?: (() => void) | undefined): void;
    readonly props: Readonly<{
        children?: React.ReactNode;
    }> & Readonly<{}>;
    state: Readonly<{}>;
    context: any;
    refs: {
        [key: string]: React.ReactInstance;
    };
};
export default _default;

}
declare module 'components/common/Sticky/view' {
/// <reference types="react" />
const _default: ({ theme, registerRoot, registerContainer, registerSizer, children, state }: {
    theme: any;
    registerRoot: any;
    registerContainer: any;
    registerSizer: any;
    children: any;
    state: any;
}) => JSX.Element;
export default _default;

}
declare module 'components/common/Truncate' {
/// <reference types="react" />
const _default: ({ children }: {
    children: any;
}) => JSX.Element;
export default _default;

}
declare module 'components/common/VirtualizedList' {
/// <reference types="react" />
import { Component } from 'react';
import { CellMeasurerCache } from 'react-virtualized/dist/commonjs/CellMeasurer';
export default class List extends Component<any, any> {
    autoSizer: any;
    list: any;
    cache: CellMeasurerCache;
    static displayName: string;
    constructor(props: any);
    initAutoSizer: (ref: any) => void;
    initList: (ref: any) => void;
    handleScroll: ({ target }: {
        target: any;
    }) => void;
    rowRenderer: ({ index, key, parent, style }: {
        index: any;
        key: any;
        parent: any;
        style: any;
    }) => any;
    render(): any;
}

}
declare module 'components/common/VirtualizedList/view' {
/// <reference types="react" />
const _default: ({ initAutoSizer, initList, array, cache, handleScroll, rowRenderer, className, theme, }: {
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
declare module 'components/contentsearch/ContentCard' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/contentsearch/ContentCard/view' {
/// <reference types="react" />
const _default: ({ item, config, theme }: {
    item: any;
    config: any;
    theme: any;
}) => JSX.Element;
export default _default;

}
declare module 'components/contentsearch/LazyContentSearchResults' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/contentsearch/LazyContentSearchResults/view' {
/// <reference types="react" />
const _default: ({ items, config, theme, columns, onLoadNext, onLoadPrev, displayNextButton, displayPrevButton, ...rest }: {
    [x: string]: any;
    items: any;
    config: any;
    theme: any;
    columns: any;
    onLoadNext: any;
    onLoadPrev: any;
    displayNextButton: any;
    displayPrevButton: any;
}) => JSX.Element;
export default _default;

}
declare module 'components/contentsearch/Trends' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/contentsearch/Trends/view' {
/// <reference types="react" />
const _default: ({ theme, config, text }: {
    theme: any;
    config: any;
    text: any;
}) => JSX.Element;
export default _default;

}
declare module 'components/Dropdown' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/Dropdown/view' {
/// <reference types="react" />
import { MJSValue, ThemedSFCProps, ClassnamedProps } from 'types';
import { List, Map } from 'immutable';
export interface IDropdownItemProps extends ThemedSFCProps {
    item: Map<string, MJSValue>;
    index: number;
    highlighted: number;
    getItemProps: (item: {
        item: Map<string, MJSValue>;
    }) => {
        [x: string]: any;
    };
}
export interface IDropdownProps extends ClassnamedProps, ThemedSFCProps {
    onChange: (x: any) => any;
    items: List<Map<string, MJSValue>>;
    selectedItem: Map<string, MJSValue>;
}
const DropdownView: ({ onChange, items, selectedItem, theme, className }: IDropdownProps) => JSX.Element;
export default DropdownView;

}
declare module 'components/Facet/Component' {
/// <reference types="react" />
import React from 'react';
import { FilterType } from 'types';
export const getComponent: (type: FilterType) => React.ComponentClass<{}>;
const _default: React.ComponentClass<any>;
export default _default;

}
declare module 'components/Facet' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/Facet/view' {
/// <reference types="react" />
import React from 'react';
import { ThemedSFCProps, IFacet, MJSConfiguration } from 'types';
export interface IFacetProps extends ThemedSFCProps {
    FacetComponent: React.Component<any>;
    isOpen?: boolean;
    title: string;
    item: IFacet;
    config: MJSConfiguration;
    filtersSelected: number;
    toggleFacet: () => any;
}
const FacetView: ({ FacetComponent, isOpen, theme, title, item, config, filtersSelected, toggleFacet }: IFacetProps) => JSX.Element;
export default FacetView;

}
declare module 'components/Icon' {
/// <reference types="react" />
import React from 'react';
export const icons: {
    Filters: any;
    Fire: any;
    Minus: any;
    Plus: any;
    Search: any;
    Sorting: any;
    CheckmarkDark: any;
    Star: any;
    XDark: any;
    XMobile: any;
    RadioEmpty: any;
    RadioFilled: any;
    ArrowBack: any;
    ArrowDown: any;
    ArrowUp: any;
    ArrowLeft: any;
    ArrowRight: any;
    ArrowLeftBig: any;
    ArrowRightBig: any;
    CheckboxFilled: any;
    CheckboxEmpty: any;
};
export type IIconProps = {
    name: keyof typeof icons;
    width?: number;
    height?: number;
    className?: string;
    [x: string]: any;
};
const Icon: ({ name, width, height, className, ...rest }: IIconProps) => React.ComponentElement<{
    width: number | undefined;
    height: number | undefined;
    className: any;
}, React.Component<{
    width: number | undefined;
    height: number | undefined;
    className: any;
}, React.ComponentState, any>>;
export default Icon;

}
declare module 'components/ItemsList' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/ItemsList/view' {
/// <reference types="react" />
import React from 'react';
import { MapArrayProps } from 'components/common/MapArray';
export interface IItemsListProps extends MapArrayProps {
    wrapper: React.ComponentType;
    [x: string]: any;
}
const _default: ({ items, wrapper: Wrapper, ...rest }: IItemsListProps) => JSX.Element;
export default _default;

}
declare module 'components/Pagination' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/Pagination/view' {
/// <reference types="react" />
import { ThemedSFCProps, MJSConfiguration } from 'types';
export interface IPaginationProps extends ThemedSFCProps {
    config: MJSConfiguration;
    current: number;
    total: number;
    showPrev: boolean;
    showFirst: boolean;
    showFirstDots: boolean;
    showLastDots: boolean;
    showLast: boolean;
    showNext: boolean;
    visiblePages: number[];
    getPageProps: (pageNumber: number) => {
        [x: string]: any;
    };
}
const _default: ({ theme, config, current, getPageProps, total, showPrev, showFirst, showFirstDots, showLastDots, showLast, showNext, visiblePages, }: IPaginationProps) => JSX.Element;
export default _default;

}
declare module 'components/PoweredBy' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/PoweredBy/view' {
/// <reference types="react" />
const _default: ({ config, theme }: {
    config: any;
    theme: any;
}) => JSX.Element;
export default _default;

}
declare module 'components/RangeFacet/content' {
const _default: ({ item, config }: {
    item: any;
    config: any;
}) => string;
export default _default;

}
declare module 'components/RangeFacet' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/RangeFacet/Item' {
/// <reference types="react" />
import React from 'react';
import { ThemedSFCProps, IFacetValue, MJSConfiguration } from 'types';
export interface IRangeFacetItemProps extends ThemedSFCProps {
    item: IFacetValue;
    style: React.CSSProperties;
    config: MJSConfiguration;
}
const RangeFacetItem: React.SFC<IRangeFacetItemProps>;
export default RangeFacetItem;

}
declare module 'components/RangeFacet/view' {
/// <reference types="react" />
import React from 'react';
import { ThemedSFCProps, IFacet, IFacetValue, MJSConfiguration } from 'types';
import { List } from 'immutable';
export interface IRangeFacetProps extends ThemedSFCProps {
    facet: IFacet;
    items: List<IFacetValue>;
    config: MJSConfiguration;
    currencySymbol: string;
    from: number;
    to: number;
    onChangeMax: (evt?: React.ChangeEvent<any>) => any;
    onChangeMin: (evt?: React.ChangeEvent<any>) => any;
    onKeypress: (evt: any) => any;
    onCommit: () => any;
}
const RangeFacetView: React.SFC<IRangeFacetProps>;
export default RangeFacetView;

}
declare module 'components/RatingFacet/content' {
/// <reference types="react" />
const _default: ({ item, theme, config }: {
    item: any;
    theme: any;
    config: any;
}) => JSX.Element;
export default _default;

}
declare module 'components/RatingFacet' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/RatingFacet/Item' {
/// <reference types="react" />
import React from 'react';
import { IFacetValue, ThemedSFCProps, MJSConfiguration } from 'types';
export interface IRatingFacetItemProps extends ThemedSFCProps {
    item: IFacetValue;
    style: React.CSSProperties;
    config: MJSConfiguration;
}
const RatingFacetItem: React.SFC<IRatingFacetItemProps>;
export default RatingFacetItem;

}
declare module 'components/RatingFacet/view' {
/// <reference types="react" />
import React from 'react';
import { IFacet, IFacetValue, MJSConfiguration, ThemedSFCProps } from 'types';
import { List } from 'immutable';
export interface IRatingFacetProps extends ThemedSFCProps {
    facet: IFacet;
    items: List<IFacetValue>;
    config: MJSConfiguration;
}
const RatingFacet: React.SFC<IRatingFacetProps>;
export default RatingFacet;

}
declare module 'components/search/DesktopActions' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/search/DesktopActions/view' {
/// <reference types="react" />
import React from 'react';
import { ThemedSFCProps, MJSConfiguration } from 'types';
export interface IDesktopActionsProps extends ThemedSFCProps {
    showFacets: () => any;
    facetsVisible: boolean;
    isCollection: boolean;
    config: MJSConfiguration;
}
const DesktopActionsView: React.SFC<IDesktopActionsProps>;
export default DesktopActionsView;

}
declare module 'components/search/DesktopFacets' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/search/DesktopFacets/Title' {
/// <reference types="react" />
import React from 'react';
import { ThemedSFCProps, MJSConfiguration, MJSValue } from 'types';
import { Map } from 'immutable';
export interface IHidableProps extends ITitlesProps {
    onHide: () => any;
}
export interface ITitlesProps extends ThemedSFCProps {
    config: MJSConfiguration;
    meta: Map<string, MJSValue>;
    onReset: () => any;
}
const defaultTitles: React.SFC<ITitlesProps>;
export default defaultTitles;
export const hidable: React.SFC<IHidableProps>;

}
declare module 'components/search/DesktopFacets/view' {
/// <reference types="react" />
import React from 'react';
import { MJSConfiguration, ThemedSFCProps, IFacet, MJSValue } from 'types';
import { List, Map } from 'immutable';
export interface IDesktopFacetsProps extends ThemedSFCProps {
    config: MJSConfiguration;
    facets: List<IFacet>;
    onReset: () => any;
    meta: Map<string, MJSValue>;
    hideFacets: () => any;
    visible: boolean;
}
const DesktopFacetsView: React.SFC<IDesktopFacetsProps>;
export default DesktopFacetsView;

}
declare module 'components/search/LazyResults' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/search/LazyResults/view' {
/// <reference types="react" />
import { ThemedSFCProps, IProduct, MJSConfiguration } from 'types';
import { List } from 'immutable';
export interface ILazyResultsProps extends ThemedSFCProps {
    items: List<IProduct>;
    config: MJSConfiguration;
    columns: string;
    onLoadNext: () => any;
    onLoadPrev: () => any;
    displayNextButton: boolean;
    displayPrevButton: boolean;
    [x: string]: any;
}
const LazyResultsView: ({ items, config, theme, columns, onLoadNext, onLoadPrev, displayNextButton, displayPrevButton, ...rest }: ILazyResultsProps) => JSX.Element;
export default LazyResultsView;

}
declare module 'components/search/MobileActions' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/search/MobileActions/view' {
/// <reference types="react" />
import React from 'react';
import { MJSConfiguration, ThemedSFCProps } from 'types';
export interface IMobileActionsProps extends ThemedSFCProps {
    isCollection?: boolean;
    total: number;
    showFacets?: boolean;
    showSort?: boolean;
    config: MJSConfiguration;
    sorting: string;
}
const MobileActionsView: React.SFC<IMobileActionsProps>;
export default MobileActionsView;

}
declare module 'components/search/MobileFacets' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/search/MobileFacets/Titles' {
/// <reference types="react" />
import React from 'react';
import { ThemedSFCProps, IFacet, MJSConfiguration } from 'types';
import { List } from 'immutable';
export interface IMobileFacetsLabelProps extends ThemedSFCProps {
    item: IFacet;
    filterCount?: number;
    config: MJSConfiguration;
    onClick: (evt?: React.MouseEvent<any>) => any;
}
export interface IMobileFacetsTitlesProps extends ThemedSFCProps {
    facets: List<IFacet>;
    selectFacet: (name: string) => any;
    config: MJSConfiguration;
}
const MobileFacetsTitlesView: ({ theme, facets, selectFacet, config }: IMobileFacetsTitlesProps) => JSX.Element;
export default MobileFacetsTitlesView;

}
declare module 'components/search/MobileFacets/view' {
/// <reference types="react" />
import { ThemedSFCProps, IFacet, MJSConfiguration, MJSValue } from 'types';
import { List } from 'immutable';
export interface IFacetContentProps extends ThemedSFCProps {
    active: IFacet;
    config: MJSConfiguration;
}
export interface IMobileFacetsProps extends ThemedSFCProps {
    facets: List<IFacet>;
    activeFacet?: IFacet;
    selectFacet: (name?: string) => any;
    onReset: () => any;
    config: MJSConfiguration;
    meta: Map<string, MJSValue>;
    hideModal: (name: string) => any;
    total: number;
    filtersSelected: number;
}
const _default: ({ theme, facets, activeFacet, selectFacet, onReset, config, meta, hideModal, total, filtersSelected, }: IMobileFacetsProps) => JSX.Element;
export default _default;

}
declare module 'components/search/MobileSorting' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/search/MobileSorting/view' {
/// <reference types="react" />
import React from 'react';
import { ThemedSFCProps, ISortingItem, MJSConfiguration } from 'types';
import { List } from 'immutable';
export interface IMobileSortingItemProps extends ThemedSFCProps {
    item: ISortingItem;
    index: number;
    onClick: (evt?: React.MouseEvent<any>) => any;
}
export interface IMobileSortingProps extends ThemedSFCProps {
    style: React.CSSProperties;
    hideModal: (name: string) => any;
    config: MJSConfiguration;
    items: List<ISortingItem>;
    setSorting: (index: number) => any;
}
const MobileSortingView: ({ theme, style, hideModal, config, items, setSorting }: IMobileSortingProps) => JSX.Element;
export default MobileSortingView;

}
declare module 'components/search/Query' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/search/Query/view' {
/// <reference types="react" />
import { IQuery, MJSConfiguration, MJSValue, ThemedSFCProps } from 'types';
import { Map } from 'immutable';
export interface IGetContentProps {
    query: IQuery;
    config: MJSConfiguration;
    meta: Map<string, MJSValue>;
}
const QueryView: ({ theme, ...props }: ThemedSFCProps & IGetContentProps) => JSX.Element;
export default QueryView;

}
declare module 'components/search/StaticResults' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/search/StaticResults/view' {
/// <reference types="react" />
import { ThemedSFCProps, MJSConfiguration } from 'types';
export interface IStaticResultsProps extends ThemedSFCProps {
    config: MJSConfiguration;
    columns: number;
}
const StaticResultsView: ({ columns, theme, config }: IStaticResultsProps) => JSX.Element;
export default StaticResultsView;

}
declare module 'components/Sorting' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'components/Sorting/view' {
/// <reference types="react" />
import { MJSConfiguration, ISortingItem, ThemedSFCProps } from 'types';
import { List } from 'immutable';
export interface ISortingProps extends ThemedSFCProps {
    onChangeSort?: (value: any) => void;
    config: MJSConfiguration;
    items: List<ISortingItem>;
    selectedItem: ISortingItem;
}
const Sorting: ({ onChangeSort, config, theme, items, selectedItem }: ISortingProps) => JSX.Element;
export default Sorting;

}
declare module 'components/Tabs' {
/// <reference types="react" />
import React from 'react';
export const Tabs: React.ComponentClass<{}>;
export const Tab: () => null;

}
declare module 'components/Tabs/test' {
export {};

}
declare module 'components/Tabs/view' {
/// <reference types="react" />
import React from 'react';
import { ThemedSFCProps } from 'types';
export interface ITabsProps extends ThemedSFCProps {
    selectedIndex?: number;
    isMobile?: boolean;
    onTabClick: (evt: Event) => any;
    body: React.ReactChildren;
}
const TabsView: ({ theme, children, onTabClick, body, selectedIndex, isMobile }: ITabsProps) => JSX.Element;
export default TabsView;

}
declare module 'components/Text' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<any>;
export default _default;

}
declare module 'components/Text/view' {
/// <reference types="react" />
import { Component } from 'react';
import { ThemedSFCProps, ClassnamedProps } from 'types';
export interface ITextProps extends ThemedSFCProps, ClassnamedProps {
    component?: string | Component;
    mode?: string;
    bold?: boolean;
    style?: {
        [x: string]: string;
    };
    inlineBlock?: boolean;
    size?: string;
    html?: string;
}
const TextView: ({ component, className, children, mode, theme, bold, style, inlineBlock, size, html: __html, }: ITextProps) => any;
export default TextView;

}
declare module 'helpers/createPortal' {
/// <reference types="react" />
import React, { Component } from 'react';
export class Portal extends Component<any> {
    element: any;
    static displayName: string;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): any;
}
export const portal: (children: any, extraProps?: {}) => React.ComponentElement<any, Portal>;

}
declare module 'helpers/debounce' {
export const debounce: (fn: any, wait?: any) => () => void;

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
    code?: string;
    symbol?: string;
    thousandsSeparator?: string;
    decimalSeparator?: string;
    symbolOnLeft?: boolean;
    decimalDigits?: number;
    format?: string;
}
const _default: (currency: ICurrencyData) => (value: string) => any;
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
const _default: ComponentEnhancer<{}, {}>;
export default _default;

}
declare module 'helpers/template' {
const _default: (template?: string, selector?: RegExp) => (...args: any[]) => string;
export default _default;

}
declare module 'helpers/withColumns' {
const _default: (columnsMapper?: (width: any, props?: any) => 12 | 3 | 6 | 4) => (baseComponent: any) => any;
export default _default;

}
declare module 'helpers/withDrawer' {
export const withDrawer: (modalName: any, modalComponent: any, { renderTo, ...options }?: any) => (BaseComponent: any) => any;

}
declare module 'helpers/withErrorHandler' {
/// <reference types="react" />
import React from 'react';
const _default: (BaseComponent: any) => {
    new (props: Readonly<{}>): {
        state: {
            error: boolean;
        };
        componentDidCatch(error: any, info: any): void;
        render(): React.ComponentElement<{}, React.Component<{}, React.ComponentState, any>> | null;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: {}, context?: any): {
        state: {
            error: boolean;
        };
        componentDidCatch(error: any, info: any): void;
        render(): React.ComponentElement<{}, React.Component<{}, React.ComponentState, any>> | null;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    displayName: string;
};
export default _default;

}
declare module 'helpers/withEvents' {
/// <reference types="react" />
import React from 'react';
const _default: (events?: any) => (BaseComponent: any) => {
    new (props: Readonly<{}>): {
        removeListener: any;
        handler: (event: any, ...args: any[]) => void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        render(): any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{}>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: {}, context?: any): {
        removeListener: any;
        handler: (event: any, ...args: any[]) => void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        render(): any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{}>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    displayName: string;
};
export default _default;

}
declare module 'helpers/withLazy' {
/// <reference types="react" />
import React from 'react';
export default function withLazy(): (BaseComponent: any) => {
    new (props: any): {
        container: any;
        autoLoadCount: number;
        registerContainer: (ref: any) => void;
        onLoadNext: () => any;
        onLoadPrev: () => any;
        readonly lessAllowed: boolean;
        readonly moreAllowed: boolean;
        trackPosition: () => number | false;
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentWillReceiveProps({ items, meta, config }: {
            items: any;
            meta: any;
            config: any;
        }): void;
        shouldComponentUpdate(props: any, state: any): boolean;
        render(): JSX.Element;
        setState<K extends string>(state: any, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<any>;
        state: Readonly<any>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
};

}
declare module 'helpers/withMinResultsToShow' {
/// <reference types="react" />
import React from 'react';
export default function withMinResultsToShow(): (BaseComponent: React.Component<{}, {}, any>) => React.ComponentClass<{}>;

}
declare module 'helpers/withTheme' {
/// <reference types="react" />
import React from 'react';
export default function withTheme(defaultTheme: any): (Component: any) => {
    new (props: any): {
        componentWillReceiveProps(nextProps: any): void;
        render(): React.ComponentElement<{
            theme: any;
            children?: React.ReactNode;
        }, React.Component<{
            theme: any;
            children?: React.ReactNode;
        }, React.ComponentState, any>>;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{}>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
};

}
declare module 'helpers/withTheme.test' {
export {};

}
declare module 'layouts/Autocomplete/Dropdown' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'layouts/Autocomplete/Dropdown/trackPosition' {
/// <reference types="react" />
import React from "react";
const _default: (BaseComponent: any) => {
    new (props: any): {
        registerComponent: (ref: any) => void;
        render(): any;
        setState<K extends string>(state: any, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<any>;
        state: Readonly<any>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
};
export default _default;

}
declare module 'layouts/Autocomplete/Dropdown/view' {
/// <reference types="react" />
import React from 'react';
import { ThemedSFCProps, MJSConfiguration, ISuggestion, MJSValue } from 'types';
import { List } from 'immutable';
export interface IAutocompletePanel extends ThemedSFCProps {
    config: MJSConfiguration;
    isTrendingSearches?: boolean;
    [x: string]: any;
}
export interface ISearchOrZeroProps {
    suggestions: List<ISuggestion>;
    config: MJSConfiguration;
    meta: Map<string, MJSValue>;
    selectedSuggestion: number;
    isTrendingSearches: boolean;
    [x: string]: any;
}
export interface IAutocompleteDropdownProps {
    suggestions: List<ISuggestion>;
    config: MJSConfiguration;
    meta: Map<string, MJSValue>;
    selectedSuggestion: number;
    isTrendingSearches: boolean;
    [x: string]: any;
}
const AutocompleteDropdownView: React.SFC<IAutocompleteDropdownProps>;
export default AutocompleteDropdownView;

}
declare module 'layouts/Autocomplete/Fullscreen' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'layouts/Autocomplete/Fullscreen/view' {
/// <reference types="react" />
const _default: ({ config, theme, meta, suggestions, innerRef, position, ...rest }: {
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
const _default: any;
export default _default;

}
declare module 'layouts/Autocomplete/Sidebar' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'layouts/Autocomplete/Sidebar/view' {
/// <reference types="react" />
import React from 'react';
export default class Sidebar extends React.Component {
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
    handleInputChange: ({ target: { value } }: {
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

}
declare module 'layouts/Autocomplete/withAutocompleteLogic' {
import { ComponentEnhancer } from 'recompose';
const _default: ComponentEnhancer<{}, {}>;
export default _default;

}
declare module 'layouts/Content' {
const _default: any;
export default _default;

}
declare module 'layouts/Content/view' {
/// <reference types="react" />
import { MJSConfiguration, MJSValue, ThemedSFCProps } from 'types';
export interface IContentSearchProps extends ThemedSFCProps {
    config: MJSConfiguration;
    meta: Map<string, MJSValue>;
    isMobile?: boolean;
    filtersOnRight?: boolean;
}
const _default: ({ config, theme }: IContentSearchProps) => JSX.Element;
export default _default;

}
declare module 'layouts/ContentSearch' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'layouts/ContentSearch/view' {
/// <reference types="react" />
import { MJSConfiguration, MJSValue, ThemedSFCProps } from 'types';
export interface IContentSearchProps extends ThemedSFCProps {
    config: MJSConfiguration;
    meta: Map<string, MJSValue>;
    isMobile?: boolean;
    mobileFacetsOpened?: boolean;
    filtersOnRight?: boolean;
}
const ContentSearchLayout: ({ config, meta, isMobile, mobileFacetsOpened, filtersOnRight, theme }: IContentSearchProps) => JSX.Element;
export default ContentSearchLayout;

}
declare module 'layouts/Custom/view' {
/// <reference types="react" />
const _default: ({ theme }: {
    theme: any;
}) => JSX.Element;
export default _default;

}
declare module 'layouts/Recommendation/Grid' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'layouts/Recommendation/Grid/view' {
/// <reference types="react" />
import { IProduct, MJSConfiguration, ThemedSFCProps } from 'types';
import { List } from 'immutable';
export interface IGridProps extends ThemedSFCProps {
    items: List<IProduct>;
    config: MJSConfiguration;
}
const GridRecommendationLayout: ({ items, config, theme }: IGridProps) => JSX.Element;
export default GridRecommendationLayout;

}
declare module 'layouts/Recommendation' {
const _default: any;
export default _default;

}
declare module 'layouts/Recommendation/Slider/Arrow' {
/// <reference types="react" />
export interface IArrowProps {
    dir: 'left' | 'right';
    onClick?: (evt) => null;
    defaultOnClick: (evt) => null;
    [x: string]: any;
}
export const renderArrow: (dir: any, handler: any) => JSX.Element;

}
declare module 'layouts/Recommendation/Slider' {
/// <reference types="react" />
import React from 'react';
import './styles.global.css';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'layouts/Recommendation/Slider/view' {
/// <reference types="react" />
import React, { ReactChildren } from 'react';
import { IProduct, ThemedSFCProps, MJSConfiguration } from 'types';
import { List } from 'immutable';
export interface IReactSlickProps {
    accessibility?: boolean;
    adaptiveHeight?: boolean;
    afterChange?: (index: number) => any;
    appendDots: (dots: ReactChildren) => React.ReactElement<any>;
    arrows?: boolean;
    asNavFor?: (ref: React.Ref<any>) => any;
    autoplaySpeed?: number;
    autoplay?: boolean;
    beforeChange?: (oldIndex: number, newIndex: number) => any;
    centerMode?: boolean;
    centerPadding?: string;
    className?: string;
    customPaging?: (index: number) => React.ReactElement<any>;
    dotsClass?: string;
    dots?: boolean;
    draggable?: boolean;
    easing?: string;
    fade?: boolean;
    focusOnSelect?: boolean;
    infinite?: boolean;
    initialSlide?: number;
    lazyLoad?: 'ondemand' | 'progressive';
    onEdge?: (direction: string) => any;
    onInit?: () => void;
    onLazyLoad?: () => any;
    onReInit?: () => void;
    onSwipe?: () => any;
    pauseOnDotsHover?: boolean;
    pauseOnFocus?: boolean;
    pauseOnHover?: boolean;
    responsive?: string[];
    rows?: number;
    rtl?: boolean;
    slide?: string;
    slidesPerRow?: number;
    slidesToScroll?: number;
    slidesToShow?: number;
    speed?: number;
    swipeToSlide?: boolean;
    swipe?: boolean;
    touchMove?: boolean;
    touchThreshold?: number;
    useCSS?: boolean;
    useTransform?: boolean;
    variableWidth?: boolean;
    vertical?: boolean;
}
export interface ISliderProps extends ThemedSFCProps {
    items: List<IProduct>;
    config: MJSConfiguration;
    sliderOptions: IReactSlickProps;
    _mountSlider: React.RefObject<any>;
}
const SliderRecommendationLayout: ({ items, config, theme, sliderOptions, _mountSlider }: ISliderProps) => JSX.Element;
export default SliderRecommendationLayout;

}
declare module 'layouts/Recommendation/Swiper' {
/// <reference types="react" />
import React from 'react';
import 'layouts/Recommendation/Swiper/styles.global.css';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'layouts/Recommendation/Swiper/view' {
/// <reference types="react" />
const _default: ({ items, config, theme, sliderOptions }: {
    items: any;
    config: any;
    theme: any;
    sliderOptions: any;
}) => JSX.Element;
export default _default;

}
declare module 'layouts/Search' {
/// <reference types="react" />
import React from 'react';
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'layouts/Search/view' {
/// <reference types="react" />
import { List } from 'immutable';
import { MJSConfiguration, ThemedSFCProps, IProduct } from 'types';
export interface ISearchProps extends ThemedSFCProps {
    config: MJSConfiguration;
    isMobile?: boolean;
    isCollection?: boolean;
    mobileFacetsOpened?: boolean;
    filtersOnRight?: boolean;
    items: List<IProduct>;
}
const SearchLayout: ({ config, meta, isMobile, isCollection, mobileFacetsOpened, filtersOnRight, theme, items }: {
    config: any;
    meta: any;
    isMobile: any;
    isCollection: any;
    mobileFacetsOpened: any;
    filtersOnRight: any;
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
const _default: ({ onClick, widgets, theme }: {
    onClick: any;
    widgets: any;
    theme: any;
}) => JSX.Element;
export default _default;

}
declare module 'layouts/ZeroResults' {
/// <reference types="react" />
import React from "react";
const _default: React.ComponentClass<{}>;
export default _default;

}
declare module 'layouts/ZeroResults/view' {
/// <reference types="react" />
import { List } from 'immutable';
import { IProduct, ThemedSFCProps, MJSConfiguration } from 'types';
export interface IZeroResultsProps extends ThemedSFCProps {
    items: List<IProduct>;
    title: string;
    config: MJSConfiguration;
    columns: number;
}
const ZeroResultsLayout: ({ items, title, theme, columns, config }: IZeroResultsProps) => JSX.Element;
export default ZeroResultsLayout;

}
declare module 'vendor/react-spring' {
const assignToFn: (target: any, source: any) => any;
function _interopDefault(ex: any): any;
var _extends: any;
var _inheritsLoose: any;
var React: any;
var ReactDOM: any;
var _objectWithoutProperties: any;
var _assertThisInitialized: any;
var bugfixes: undefined;
var applyAnimatedValues: undefined;
var colorNames: never[];
var requestFrame: (cb: any) => any;
var cancelFrame: (cb: any) => any;
var interpolation: undefined;
var injectApplyAnimatedValues: (fn: any, transform: any) => {
    fn: any;
    transform: any;
};
var injectColorNames: (names: any) => any;
var injectBugfixes: (fn: any) => any;
var injectInterpolation: (cls: any) => any;
var injectFrame: (raf: any, caf: any) => any;
var Globals: Readonly<{
    readonly bugfixes: undefined;
    readonly applyAnimatedValues: undefined;
    readonly colorNames: never[];
    readonly requestFrame: (cb: any) => any;
    readonly cancelFrame: (cb: any) => any;
    readonly interpolation: undefined;
    injectApplyAnimatedValues: (fn: any, transform: any) => {
        fn: any;
        transform: any;
    };
    injectColorNames: (names: any) => any;
    injectBugfixes: (fn: any) => any;
    injectInterpolation: (cls: any) => any;
    injectFrame: (raf: any, caf: any) => any;
}>;
var colors: {
    transparent: number;
    aliceblue: number;
    antiquewhite: number;
    aqua: number;
    aquamarine: number;
    azure: number;
    beige: number;
    bisque: number;
    black: number;
    blanchedalmond: number;
    blue: number;
    blueviolet: number;
    brown: number;
    burlywood: number;
    burntsienna: number;
    cadetblue: number;
    chartreuse: number;
    chocolate: number;
    coral: number;
    cornflowerblue: number;
    cornsilk: number;
    crimson: number;
    cyan: number;
    darkblue: number;
    darkcyan: number;
    darkgoldenrod: number;
    darkgray: number;
    darkgreen: number;
    darkgrey: number;
    darkkhaki: number;
    darkmagenta: number;
    darkolivegreen: number;
    darkorange: number;
    darkorchid: number;
    darkred: number;
    darksalmon: number;
    darkseagreen: number;
    darkslateblue: number;
    darkslategray: number;
    darkslategrey: number;
    darkturquoise: number;
    darkviolet: number;
    deeppink: number;
    deepskyblue: number;
    dimgray: number;
    dimgrey: number;
    dodgerblue: number;
    firebrick: number;
    floralwhite: number;
    forestgreen: number;
    fuchsia: number;
    gainsboro: number;
    ghostwhite: number;
    gold: number;
    goldenrod: number;
    gray: number;
    green: number;
    greenyellow: number;
    grey: number;
    honeydew: number;
    hotpink: number;
    indianred: number;
    indigo: number;
    ivory: number;
    khaki: number;
    lavender: number;
    lavenderblush: number;
    lawngreen: number;
    lemonchiffon: number;
    lightblue: number;
    lightcoral: number;
    lightcyan: number;
    lightgoldenrodyellow: number;
    lightgray: number;
    lightgreen: number;
    lightgrey: number;
    lightpink: number;
    lightsalmon: number;
    lightseagreen: number;
    lightskyblue: number;
    lightslategray: number;
    lightslategrey: number;
    lightsteelblue: number;
    lightyellow: number;
    lime: number;
    limegreen: number;
    linen: number;
    magenta: number;
    maroon: number;
    mediumaquamarine: number;
    mediumblue: number;
    mediumorchid: number;
    mediumpurple: number;
    mediumseagreen: number;
    mediumslateblue: number;
    mediumspringgreen: number;
    mediumturquoise: number;
    mediumvioletred: number;
    midnightblue: number;
    mintcream: number;
    mistyrose: number;
    moccasin: number;
    navajowhite: number;
    navy: number;
    oldlace: number;
    olive: number;
    olivedrab: number;
    orange: number;
    orangered: number;
    orchid: number;
    palegoldenrod: number;
    palegreen: number;
    paleturquoise: number;
    palevioletred: number;
    papayawhip: number;
    peachpuff: number;
    peru: number;
    pink: number;
    plum: number;
    powderblue: number;
    purple: number;
    rebeccapurple: number;
    red: number;
    rosybrown: number;
    royalblue: number;
    saddlebrown: number;
    salmon: number;
    sandybrown: number;
    seagreen: number;
    seashell: number;
    sienna: number;
    silver: number;
    skyblue: number;
    slateblue: number;
    slategray: number;
    slategrey: number;
    snow: number;
    springgreen: number;
    steelblue: number;
    tan: number;
    teal: number;
    thistle: number;
    tomato: number;
    turquoise: number;
    violet: number;
    wheat: number;
    white: number;
    whitesmoke: number;
    yellow: number;
    yellowgreen: number;
};
var linear: (t: any) => any;
var Interpolation: () => void;
function interpolate(input: any, inputMin: any, inputMax: any, outputMin: any, outputMax: any, easing: any, extrapolateLeft: any, extrapolateRight: any, map: any): any;
function findRange(input: any, inputRange: any): number;
function normalizeColor(color: any): any;
function hue2rgb(p: any, q: any, t: any): any;
function hslToRgb(h: any, s: any, l: any): number;
var NUMBER: string;
var PERCENTAGE: string;
function toArray(arrayLike: any): any;
function call(): string;
var matchers: {
    rgb: RegExp;
    rgba: RegExp;
    hsl: RegExp;
    hsla: RegExp;
    hex3: RegExp;
    hex4: RegExp;
    hex6: RegExp;
    hex8: RegExp;
};
function parse255(str: any): number;
function parse360(str: any): number;
function parse1(str: any): number;
function parsePercentage(str: any): number;
function colorToRgba(input: any): any;
var stringShapeRegex: RegExp;
function createInterpolation(config: any): (input: any) => any;
var Animated: () => void;
var AnimatedTracking: (value: any, parent: any, animationClass: any, animationConfig: any, callback: any) => any;
function throttle(callback: any, limit: any): () => void;
var AnimatedWithChildren: () => any;
var AnimatedInterpolation: (parents: any, config: any) => any;
var interpolate$1: (parents: any, config: any) => any;
var _uniqueId: number;
function findAnimatedStyles(node: any, styles: any): void;
var AnimatedValue: (value: any) => any;
var getValues: (object: any) => any[];
var check: (value: any) => boolean;
var overwrite: (width: any, height: any) => (acc: any, _ref2: any) => any;
function fixAuto(spring: any, props: any): any;
var isUnitlessNumber: {
    animationIterationCount: boolean;
    borderImageOutset: boolean;
    borderImageSlice: boolean;
    borderImageWidth: boolean;
    boxFlex: boolean;
    boxFlexGroup: boolean;
    boxOrdinalGroup: boolean;
    columnCount: boolean;
    columns: boolean;
    flex: boolean;
    flexGrow: boolean;
    flexPositive: boolean;
    flexShrink: boolean;
    flexNegative: boolean;
    flexOrder: boolean;
    gridRow: boolean;
    gridRowEnd: boolean;
    gridRowSpan: boolean;
    gridRowStart: boolean;
    gridColumn: boolean;
    gridColumnEnd: boolean;
    gridColumnSpan: boolean;
    gridColumnStart: boolean;
    fontWeight: boolean;
    lineClamp: boolean;
    lineHeight: boolean;
    opacity: boolean;
    order: boolean;
    orphans: boolean;
    tabSize: boolean;
    widows: boolean;
    zIndex: boolean;
    zoom: boolean;
    fillOpacity: boolean;
    floodOpacity: boolean;
    stopOpacity: boolean;
    strokeDasharray: boolean;
    strokeDashoffset: boolean;
    strokeMiterlimit: boolean;
    strokeOpacity: boolean;
    strokeWidth: boolean;
};
var prefixKey: (prefix: any, key: any) => any;
var prefixes: string[];
function dangerousStyleValue(name: any, value: any, isCustomProperty: any): string;
var Animation: {
    new (effect?: AnimationEffectReadOnly | undefined, timeline?: AnimationTimeline | undefined): Animation;
    prototype: Animation;
};
var withDefault: (value: any, defaultValue: any) => any;
var tensionFromOrigamiValue: (oValue: any) => number;
var frictionFromOrigamiValue: (oValue: any) => number;
var fromOrigamiTensionAndFriction: (tension: any, friction: any) => {
    tension: number;
    friction: number;
};
var SpringAnimation: (config: any) => any;
var AnimatedArray: (array: any) => any;
function maybeVectorAnim(array: any, _ref: any, anim: any, impl: any): {
    start: (callback: any) => any;
    stop: () => void;
} | null;
function parallel(animations: any, config: any): {
    start: (callback: any) => any;
    stop: () => void;
};
function controller(value: any, config: any, impl: any): {
    start: (callback: any) => any;
    stop: () => void;
};
var AnimatedStyle: (style: any) => any;
var AnimatedProps: (props: any, callback: any) => any;
function createAnimatedComponent(Component: any): () => any;
function shallowDiff(a: any, b: any): boolean;
var config: {
    default: {
        tension: number;
        friction: number;
    };
    gentle: {
        tension: number;
        friction: number;
    };
    wobbly: {
        tension: number;
        friction: number;
    };
    stiff: {
        tension: number;
        friction: number;
    };
    slow: {
        tension: number;
        friction: number;
    };
};
var callProp: (p: any, n: any) => any;
var convert$1: (acc: any, _ref: any) => any;
var Spring: () => any;
var empty: () => null;
var ref: (object: any, key: any) => any;
var get: (props: any) => any;
var Transition: (prevProps: any) => any;
var Trail: () => any;
var Keyframes: () => any;
var AnimatedDiv: () => any;
var _React$createContext: any, Provider: any, Consumer: any;
function getScrollType(horizontal: any): "scrollLeft" | "scrollTop";
var START_TRANSLATE_3D: string;
var START_TRANSLATE: string;
var ParallaxLayer: () => any;
var Parallax: () => any;
var domElements: string[];
var elements: any;
var createAnimatedComponent$1: (comp: any) => () => any;

}
