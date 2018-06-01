/// <reference types="react" />
declare module '@findify/react-components/global' {
	import * as React from 'react';

	type Theme = object // TODO: implement more okayish type then alias
	interface ThemedSFC<P = {}, C = {}> extends React.StatelessComponent<P> {
	  (props: P & { children?: React.ReactNode, theme: Theme }, context?: C): React.ReactElement<any> | null;
	  propTypes?: React.ValidationMap<P>;
	  contextTypes?: React.ValidationMap<C>;
	  defaultProps?: Partial<P>;
	  displayName?: string;
	}

}
declare module '@findify/react-components/global' {
	import * as React from 'react';

	type Theme = object // TODO: implement more okayish type then alias
	interface ThemedSFC<P = {}, C = {}> extends React.StatelessComponent<P> {
	  (props: P & { children?: React.ReactNode, theme: Theme }, context?: C): React.ReactElement<any> | null;
	  propTypes?: React.ValidationMap<P>;
	  contextTypes?: React.ValidationMap<C>;
	  defaultProps?: Partial<P>;
	  displayName?: string;
	}

}
declare module '@findify/react-components/index' {
	import * as React from 'react';
	import { Map } from 'immutable' global {
	  interface Theme {
	    [key: string]: string
	  }

	  /** Props that every component with applied withTheme() HOC has during render */
	  interface ThemedSFCProps {
	    children?: React.ReactNode,
	    /** Theme is a raw - generated class mapping */
	    theme: Theme,
	  }
	  interface ThemedSFC<P = {}, C = {}> extends React.StatelessComponent<P> {
	    (props: P & { children?: React.ReactNode, theme: Theme }, context?: C): React.ReactElement<any> | null;
	    propTypes?: React.ValidationMap<P>;
	    contextTypes?: React.ValidationMap<C>;
	    defaultProps?: Partial<P>;
	    displayName?: string;
	  }


	  interface MJSConfiguration<K = string, V = string | boolean | number> extends Map<K, V> {}


	  interface ISuggestionProps {
	    key: string;
	    onClick: (evt: Event) => any
	  }

	  type GetSuggestionPropsFunction = (suggestionProps: number, widgetKey: string) => ISuggestionProps

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

}
declare module '@findify/react-components/lib/layouts/Autocomplete/index' {
	 const _default: any;
	export default _default;

}
declare module '@findify/react-components/lib/layouts/Recommendation/index' {
	 const _default: any;
	export default _default;

}
declare module '@findify/react-components/lib/index' {
	export { default as Autocomplete } from './layouts/Autocomplete';
	export { default as Recommendation } from './layouts/Recommendation';
	export { default as Search } from './layouts/Search';
	export { default as ContentSearch } from './layouts/ContentSearch';
	export { default as ZeroResults } from './layouts/ZeroResults';

}
declare module '@findify/react-components/lib/components/autocomplete/ProductMatches/index' {
	/// <reference types="react" />
	import React from 'react'; const _default: React.ComponentClass<{}>;
	export default _default;

}
declare module '@findify/react-components/lib/components/autocomplete/SearchSuggestions/test' {
	export {};

}
declare module '@findify/react-components/lib/components/autocomplete/SuggestionItem/test' {
	export {};

}
declare module '@findify/react-components/lib/components/autocomplete/Tip/test' {
	export {};

}
declare module '@findify/react-components/lib/components/Cards/Product/index' {
	 const ProductCard: any;
	export default ProductCard;

}
declare module '@findify/react-components/lib/components/Cards/Product/test' {
	export {};

}
declare module '@findify/react-components/lib/components/Cards/Product/Rating/test' {
	export {};

}
declare module '@findify/react-components/lib/components/Cards/Product/Stickers/index' {
	/// <reference types="react" />
	import React from 'react';
	export const DiscountSticker: {
	    new (props: any): {
	        componentWillReceiveProps(nextProps: any): void;
	        render(): React.ComponentElement<{
	            theme: any;
	            children?: React.ReactNode;
	        }, React.Component<{
	            theme: any;
	            children?: React.ReactNode;
	        }, React.ComponentState, any>>;
	        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: {}) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
	        forceUpdate(callBack?: (() => void) | undefined): void;
	        props: Readonly<{
	            children?: React.ReactNode;
	        }> & Readonly<{}>;
	        state: Readonly<{}>;
	        context: any;
	        refs: {
	            [key: string]: React.ReactInstance;
	        };
	    };
	};
	export const OutOfStockSticker: {
	    new (props: any): {
	        componentWillReceiveProps(nextProps: any): void;
	        render(): React.ComponentElement<{
	            theme: any;
	            children?: React.ReactNode;
	        }, React.Component<{
	            theme: any;
	            children?: React.ReactNode;
	        }, React.ComponentState, any>>;
	        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: {}) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
	        forceUpdate(callBack?: (() => void) | undefined): void;
	        props: Readonly<{
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
declare module '@findify/react-components/lib/components/CategoryFacet/content' {
	 const extractContent: ({ item }: {
	    item: any;
	}) => any;
	export default extractContent;

}
declare module '@findify/react-components/lib/components/CheckboxFacet/content' {
	 const extractContent: ({ item }: {
	    item: any;
	}) => any;
	export default extractContent;

}
declare module '@findify/react-components/lib/components/CheckboxFacet/index' {
	/// <reference types="react" />
	import React from 'react'; const _default: React.ComponentClass<{}>;
	export default _default;

}
declare module '@findify/react-components/lib/components/ColorFacet/content' {
	 const _default: ({ item, config, theme }: {
	    item: any;
	    config: any;
	    theme: any;
	}) => JSX.Element;
	export default _default;

}
declare module '@findify/react-components/lib/components/common/Grid/Column' {
	/// <reference types="react" />
	import React from 'react';
	export interface IGridColumnProps {
	    className?: string;
	    columnClass?: string;
	    columnStyle?: React.CSSProperties;
	    children?: React.ReactChild;
	} const GridColumn: React.ComponentClass<{}>;
	export default GridColumn;

}
declare module '@findify/react-components/lib/components/common/Image/test' {
	export {};

}
declare module '@findify/react-components/lib/components/common/MapArray/index' {
	/// <reference types="react" />
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
	}; const _default: ({ array, keyAccessor, factory, limit, ...rest }: MapArrayProps) => any;
	export default _default;

}
declare module '@findify/react-components/lib/components/common/MapArray/test' {
	export {};

}
declare module '@findify/react-components/lib/components/common/Sticky/view' {
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
declare module '@findify/react-components/lib/components/common/Truncate/index' {
	 const _default: ({ children }: {
	    children: any;
	}) => JSX.Element;
	export default _default;

}
declare module '@findify/react-components/lib/components/common/VirtualizedList/index' {
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
declare module '@findify/react-components/lib/components/common/VirtualizedList/view' {
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
declare module '@findify/react-components/lib/components/contentsearch/ContentCard/view' {
	 const _default: ({ item, config, theme }: {
	    item: any;
	    config: any;
	    theme: any;
	}) => JSX.Element;
	export default _default;

}
declare module '@findify/react-components/lib/components/contentsearch/LazyContentSearchResults/view' {
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
declare module '@findify/react-components/lib/components/contentsearch/Trends/view' {
	 const _default: ({ theme, config, text }: {
	    theme: any;
	    config: any;
	    text: any;
	}) => JSX.Element;
	export default _default;

}
declare module '@findify/react-components/lib/components/PoweredBy/view' {
	 const _default: ({ config, theme }: {
	    config: any;
	    theme: any;
	}) => JSX.Element;
	export default _default;

}
declare module '@findify/react-components/lib/components/RangeFacet/content' {
	 const _default: ({ item, config }: {
	    item: any;
	    config: any;
	}) => string;
	export default _default;

}
declare module '@findify/react-components/lib/components/RatingFacet/content' {
	 const _default: ({ item, theme, config }: {
	    item: any;
	    theme: any;
	    config: any;
	}) => JSX.Element;
	export default _default;

}
declare module '@findify/react-components/lib/components/search/Query/index' {
	/// <reference types="react" />
	import React from 'react'; const _default: React.ComponentClass<{}>;
	export default _default;

}
declare module '@findify/react-components/lib/components/Tabs/index' {
	/// <reference types="react" />
	import React from 'react';
	export const Tabs: React.ComponentClass<{}>;
	export const Tab: () => null;

}
declare module '@findify/react-components/lib/components/Tabs/test' {
	export {};

}
declare module '@findify/react-components/lib/helpers/emmiter' {
	export const emit: (...args: any[]) => any;
	export const listen: (...args: any[]) => any;

}
declare module '@findify/react-components/lib/helpers/getPrice' {
	export const priceIsSampleArray: (price: any) => boolean;
	export const getPrice: (maybeImmutablePrice: any, currency: any) => any;

}
declare module '@findify/react-components/lib/helpers/omit' {
	 const _default: (keys: any) => (obj: any) => any;
	export default _default;

}
declare module '@findify/react-components/lib/helpers/template' {
	 const _default: (template?: string, selector?: RegExp) => (...args: any[]) => string;
	export default _default;

}
declare module '@findify/react-components/lib/helpers/withColumns' {
	 const _default: (columnsMapper?: (width: any, props?: any) => 2 | 12 | 3 | 6 | 4) => (baseComponent: any) => any;
	export default _default;

}
declare module '@findify/react-components/lib/helpers/withDrawer' {
	export const withDrawer: (modalName: any, modalComponent: any, { renderTo, ...options }?: any) => (BaseComponent: any) => any;

}
declare module '@findify/react-components/lib/helpers/withErrorHandler' {
	/// <reference types="react" />
	import React from 'react'; const _default: (BaseComponent: any) => {
	    new (props: {}, context?: any): {
	        state: {
	            error: boolean;
	        };
	        componentDidCatch(error: any, info: any): void;
	        render(): React.ComponentElement<{}, React.Component<{}, React.ComponentState, any>> | null;
	        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: {}) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
	        forceUpdate(callBack?: (() => void) | undefined): void;
	        props: Readonly<{
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
declare module '@findify/react-components/lib/helpers/withEvents' {
	/// <reference types="react" />
	import React from 'react'; const _default: (events?: any) => (BaseComponent: any) => {
	    new (props: {}, context?: any): {
	        removeListener: any;
	        handler: (event: any, ...args: any[]) => void;
	        componentDidMount(): void;
	        componentWillUnmount(): void;
	        render(): any;
	        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: {}) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
	        forceUpdate(callBack?: (() => void) | undefined): void;
	        props: Readonly<{
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
declare module '@findify/react-components/lib/helpers/withLazy' {
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
	        props: Readonly<{
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
declare module '@findify/react-components/lib/helpers/withTheme' {
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
	        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: {}) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
	        forceUpdate(callBack?: (() => void) | undefined): void;
	        props: Readonly<{
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
declare module '@findify/react-components/lib/helpers/withTheme.test' {
	export {};

}
declare module '@findify/react-components/lib/layouts/Autocomplete/Fullscreen/index' {
	/// <reference types="react" />
	import React from 'react'; const _default: React.ComponentClass<{}>;
	export default _default;

}
declare module '@findify/react-components/lib/layouts/Autocomplete/Fullscreen/view' {
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
declare module '@findify/react-components/lib/layouts/Autocomplete/Sidebar/index' {
	/// <reference types="react" />
	import React from 'react'; const _default: React.ComponentClass<{}>;
	export default _default;

}
declare module '@findify/react-components/lib/layouts/Autocomplete/Sidebar/view' {
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
declare module '@findify/react-components/lib/layouts/Recommendation/Slider/Arrow' {
	/// <reference types="react" />
	export const renderArrow: (dir: any, handler: any) => JSX.Element;

}
declare module '@findify/react-components/lib/layouts/Search/view' {
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
declare module '@findify/react-components/lib/types/index' {
	/// <reference types="react" />
	import * as React from 'react';
	import { Map, List } from 'immutable';
	export interface Theme {
	    [key: string]: string;
	}
	export interface ThemedSFCProps {
	    'display-if'?: boolean;
	    children?: React.ReactNode;
	    theme: Theme;
	}
	export interface ClassnamedProps {
	    className?: string;
	}
	export interface WidgetAwareProps {
	    widgetKey: string;
	}
	export interface SuggestionsConnectedProps {
	    suggestions: List<ISuggestion>;
	    getSuggestionProps: GetSuggestionPropsFunction;
	}
	export interface ThemedSFC<P = {}, C = {}> extends React.StatelessComponent<P> {
	    (props: P & {
	        'display-if'?: boolean;
	        children?: React.ReactNode;
	        theme: Theme;
	    }, context?: C): React.ReactElement<any> | null;
	    propTypes?: React.ValidationMap<P>;
	    contextTypes?: React.ValidationMap<C>;
	    defaultProps?: Partial<P>;
	    displayName?: string;
	}
	export type MJSValue = List<any> | string | number | boolean;
	export interface MJSConfiguration<K = string, V = MJSValue & undefined> extends Map<K, V> {
	}
	export interface ISuggestionProps {
	    key: string;
	    onClick: (evt: React.MouseEvent<any>) => any;
	}
	export type GetSuggestionPropsFunction = (suggestionIndex: number, widgetKey: string) => ISuggestionProps;
	export interface ISuggestion extends Map<string, MJSValue> {
	}
	export interface IProduct extends Map<string, MJSValue> {
	    onClick: (evt: React.MouseEvent<any>) => any;
	}
	export interface ISortingItem extends Map<string, MJSConfiguration> {
	}
	export interface IBanner extends Map<string, MJSValue> {
	}
	export interface IQuery extends Map<string, MJSValue> {
	}
	export interface IFacet extends Map<string, MJSValue> {
	    toggle: (evt: React.MouseEvent<any>) => any;
	    resetValues: () => any;
	}
	export type FilterType = 'text' | 'range' | 'color' | 'category' | 'price' | 'rating';
	export interface IFacetValue extends Map<string, MJSValue> {
	    toggle: (evt: React.MouseEvent<any>) => any;
	}

}
declare module '@findify/react-components/lib/layouts/Autocomplete/index' {
	 const _default: any;
	export default _default;

}
declare module '@findify/react-components/lib/layouts/Recommendation/index' {
	 const _default: any;
	export default _default;

}
declare module '@findify/react-components/lib/index' {
	export { default as Autocomplete } from './layouts/Autocomplete';
	export { default as Recommendation } from './layouts/Recommendation';
	export { default as Search } from './layouts/Search';
	export { default as ContentSearch } from './layouts/ContentSearch';
	export { default as ZeroResults } from './layouts/ZeroResults';

}
declare module '@findify/react-components/lib/components/autocomplete/ProductMatches/index' {
	/// <reference types="react" />
	import React from 'react'; const _default: React.ComponentClass<{}>;
	export default _default;

}
declare module '@findify/react-components/lib/components/autocomplete/SearchSuggestions/test' {
	export {};

}
declare module '@findify/react-components/lib/components/autocomplete/SuggestionItem/test' {
	export {};

}
declare module '@findify/react-components/lib/components/autocomplete/Tip/test' {
	export {};

}
declare module '@findify/react-components/lib/components/Cards/Product/index' {
	 const ProductCard: any;
	export default ProductCard;

}
declare module '@findify/react-components/lib/components/Cards/Product/test' {
	export {};

}
declare module '@findify/react-components/lib/components/Cards/Product/Rating/test' {
	export {};

}
declare module '@findify/react-components/lib/components/Cards/Product/Stickers/index' {
	/// <reference types="react" />
	import React from 'react';
	export const DiscountSticker: {
	    new (props: any): {
	        componentWillReceiveProps(nextProps: any): void;
	        render(): React.ComponentElement<{
	            theme: any;
	            children?: React.ReactNode;
	        }, React.Component<{
	            theme: any;
	            children?: React.ReactNode;
	        }, React.ComponentState, any>>;
	        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: {}) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
	        forceUpdate(callBack?: (() => void) | undefined): void;
	        props: Readonly<{
	            children?: React.ReactNode;
	        }> & Readonly<{}>;
	        state: Readonly<{}>;
	        context: any;
	        refs: {
	            [key: string]: React.ReactInstance;
	        };
	    };
	};
	export const OutOfStockSticker: {
	    new (props: any): {
	        componentWillReceiveProps(nextProps: any): void;
	        render(): React.ComponentElement<{
	            theme: any;
	            children?: React.ReactNode;
	        }, React.Component<{
	            theme: any;
	            children?: React.ReactNode;
	        }, React.ComponentState, any>>;
	        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: {}) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
	        forceUpdate(callBack?: (() => void) | undefined): void;
	        props: Readonly<{
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
declare module '@findify/react-components/lib/components/CategoryFacet/content' {
	 const extractContent: ({ item }: {
	    item: any;
	}) => any;
	export default extractContent;

}
declare module '@findify/react-components/lib/components/CheckboxFacet/content' {
	 const extractContent: ({ item }: {
	    item: any;
	}) => any;
	export default extractContent;

}
declare module '@findify/react-components/lib/components/CheckboxFacet/index' {
	/// <reference types="react" />
	import React from 'react'; const _default: React.ComponentClass<{}>;
	export default _default;

}
declare module '@findify/react-components/lib/components/ColorFacet/content' {
	 const _default: ({ item, config, theme }: {
	    item: any;
	    config: any;
	    theme: any;
	}) => JSX.Element;
	export default _default;

}
declare module '@findify/react-components/lib/components/common/Grid/Column' {
	/// <reference types="react" />
	import React from 'react';
	export interface IGridColumnProps {
	    className?: string;
	    columnClass?: string;
	    columnStyle?: React.CSSProperties;
	    children?: React.ReactChild;
	} const GridColumn: React.ComponentClass<{}>;
	export default GridColumn;

}
declare module '@findify/react-components/lib/components/common/Image/test' {
	export {};

}
declare module '@findify/react-components/lib/components/common/MapArray/index' {
	/// <reference types="react" />
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
	}; const _default: ({ array, keyAccessor, factory, limit, ...rest }: MapArrayProps) => any;
	export default _default;

}
declare module '@findify/react-components/lib/components/common/MapArray/test' {
	export {};

}
declare module '@findify/react-components/lib/components/common/Sticky/view' {
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
declare module '@findify/react-components/lib/components/common/Truncate/index' {
	 const _default: ({ children }: {
	    children: any;
	}) => JSX.Element;
	export default _default;

}
declare module '@findify/react-components/lib/components/common/VirtualizedList/index' {
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
declare module '@findify/react-components/lib/components/common/VirtualizedList/view' {
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
declare module '@findify/react-components/lib/components/contentsearch/ContentCard/view' {
	 const _default: ({ item, config, theme }: {
	    item: any;
	    config: any;
	    theme: any;
	}) => JSX.Element;
	export default _default;

}
declare module '@findify/react-components/lib/components/contentsearch/LazyContentSearchResults/view' {
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
declare module '@findify/react-components/lib/components/contentsearch/Trends/view' {
	 const _default: ({ theme, config, text }: {
	    theme: any;
	    config: any;
	    text: any;
	}) => JSX.Element;
	export default _default;

}
declare module '@findify/react-components/lib/components/PoweredBy/view' {
	 const _default: ({ config, theme }: {
	    config: any;
	    theme: any;
	}) => JSX.Element;
	export default _default;

}
declare module '@findify/react-components/lib/components/RangeFacet/content' {
	 const _default: ({ item, config }: {
	    item: any;
	    config: any;
	}) => string;
	export default _default;

}
declare module '@findify/react-components/lib/components/RatingFacet/content' {
	 const _default: ({ item, theme, config }: {
	    item: any;
	    theme: any;
	    config: any;
	}) => JSX.Element;
	export default _default;

}
declare module '@findify/react-components/lib/components/search/Query/index' {
	/// <reference types="react" />
	import React from 'react'; const _default: React.ComponentClass<{}>;
	export default _default;

}
declare module '@findify/react-components/lib/components/Tabs/index' {
	/// <reference types="react" />
	import React from 'react';
	export const Tabs: React.ComponentClass<{}>;
	export const Tab: () => null;

}
declare module '@findify/react-components/lib/components/Tabs/test' {
	export {};

}
declare module '@findify/react-components/lib/helpers/emmiter' {
	export const emit: (...args: any[]) => any;
	export const listen: (...args: any[]) => any;

}
declare module '@findify/react-components/lib/helpers/getPrice' {
	export const priceIsSampleArray: (price: any) => boolean;
	export const getPrice: (maybeImmutablePrice: any, currency: any) => any;

}
declare module '@findify/react-components/lib/helpers/omit' {
	 const _default: (keys: any) => (obj: any) => any;
	export default _default;

}
declare module '@findify/react-components/lib/helpers/template' {
	 const _default: (template?: string, selector?: RegExp) => (...args: any[]) => string;
	export default _default;

}
declare module '@findify/react-components/lib/helpers/withColumns' {
	 const _default: (columnsMapper?: (width: any, props?: any) => 2 | 12 | 3 | 6 | 4) => (baseComponent: any) => any;
	export default _default;

}
declare module '@findify/react-components/lib/helpers/withDrawer' {
	export const withDrawer: (modalName: any, modalComponent: any, { renderTo, ...options }?: any) => (BaseComponent: any) => any;

}
declare module '@findify/react-components/lib/helpers/withErrorHandler' {
	/// <reference types="react" />
	import React from 'react'; const _default: (BaseComponent: any) => {
	    new (props: {}, context?: any): {
	        state: {
	            error: boolean;
	        };
	        componentDidCatch(error: any, info: any): void;
	        render(): React.ComponentElement<{}, React.Component<{}, React.ComponentState, any>> | null;
	        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: {}) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
	        forceUpdate(callBack?: (() => void) | undefined): void;
	        props: Readonly<{
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
declare module '@findify/react-components/lib/helpers/withEvents' {
	/// <reference types="react" />
	import React from 'react'; const _default: (events?: any) => (BaseComponent: any) => {
	    new (props: {}, context?: any): {
	        removeListener: any;
	        handler: (event: any, ...args: any[]) => void;
	        componentDidMount(): void;
	        componentWillUnmount(): void;
	        render(): any;
	        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: {}) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
	        forceUpdate(callBack?: (() => void) | undefined): void;
	        props: Readonly<{
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
declare module '@findify/react-components/lib/helpers/withLazy' {
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
	        props: Readonly<{
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
declare module '@findify/react-components/lib/helpers/withTheme' {
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
	        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: {}) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
	        forceUpdate(callBack?: (() => void) | undefined): void;
	        props: Readonly<{
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
declare module '@findify/react-components/lib/helpers/withTheme.test' {
	export {};

}
declare module '@findify/react-components/lib/layouts/Autocomplete/Fullscreen/index' {
	/// <reference types="react" />
	import React from 'react'; const _default: React.ComponentClass<{}>;
	export default _default;

}
declare module '@findify/react-components/lib/layouts/Autocomplete/Fullscreen/view' {
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
declare module '@findify/react-components/lib/layouts/Autocomplete/Sidebar/index' {
	/// <reference types="react" />
	import React from 'react'; const _default: React.ComponentClass<{}>;
	export default _default;

}
declare module '@findify/react-components/lib/layouts/Autocomplete/Sidebar/view' {
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
declare module '@findify/react-components/lib/layouts/Recommendation/Slider/Arrow' {
	/// <reference types="react" />
	export const renderArrow: (dir: any, handler: any) => JSX.Element;

}
declare module '@findify/react-components/lib/layouts/Search/view' {
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
declare module '@findify/react-components/lib/types/index' {
	/// <reference types="react" />
	import * as React from 'react';
	import { Map, List } from 'immutable';
	export interface Theme {
	    [key: string]: string;
	}
	export interface ThemedSFCProps {
	    'display-if'?: boolean;
	    children?: React.ReactNode;
	    theme: Theme;
	}
	export interface ClassnamedProps {
	    className?: string;
	}
	export interface WidgetAwareProps {
	    widgetKey: string;
	}
	export interface SuggestionsConnectedProps {
	    suggestions: List<ISuggestion>;
	    getSuggestionProps: GetSuggestionPropsFunction;
	}
	export interface ThemedSFC<P = {}, C = {}> extends React.StatelessComponent<P> {
	    (props: P & {
	        'display-if'?: boolean;
	        children?: React.ReactNode;
	        theme: Theme;
	    }, context?: C): React.ReactElement<any> | null;
	    propTypes?: React.ValidationMap<P>;
	    contextTypes?: React.ValidationMap<C>;
	    defaultProps?: Partial<P>;
	    displayName?: string;
	}
	export type MJSValue = List<any> | string | number | boolean;
	export interface MJSConfiguration<K = string, V = MJSValue & undefined> extends Map<K, V> {
	}
	export interface ISuggestionProps {
	    key: string;
	    onClick: (evt: React.MouseEvent<any>) => any;
	}
	export type GetSuggestionPropsFunction = (suggestionIndex: number, widgetKey: string) => ISuggestionProps;
	export interface ISuggestion extends Map<string, MJSValue> {
	}
	export interface IProduct extends Map<string, MJSValue> {
	    onClick: (evt: React.MouseEvent<any>) => any;
	}
	export interface ISortingItem extends Map<string, MJSConfiguration> {
	}
	export interface IBanner extends Map<string, MJSValue> {
	}
	export interface IQuery extends Map<string, MJSValue> {
	}
	export interface IFacet extends Map<string, MJSValue> {
	    toggle: (evt: React.MouseEvent<any>) => any;
	    resetValues: () => any;
	}
	export type FilterType = 'text' | 'range' | 'color' | 'category' | 'price' | 'rating';
	export interface IFacetValue extends Map<string, MJSValue> {
	    toggle: (evt: React.MouseEvent<any>) => any;
	}

}
declare module '@findify/react-components/layouts/Autocomplete/Dropdown/trackPosition' {
	/// <reference types="react" />
	import React from "react"; const _default: (BaseComponent: any) => {
	    new (props: any): {
	        registerComponent: (ref: any) => void;
	        render(): any;
	        setState<K extends string>(state: any, callback?: (() => void) | undefined): void;
	        forceUpdate(callBack?: (() => void) | undefined): void;
	        props: Readonly<{
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
declare module '@findify/react-components/layouts/Autocomplete/index' {
	 const _default: any;
	export default _default;

}
declare module '@findify/react-components/layouts/Recommendation/index' {
	 const _default: any;
	export default _default;

}
declare module '@findify/react-components/components/Banner/view' {
	/// <reference types="react" />
	import React from 'react';
	import { ThemedSFCProps, IBanner } from 'types';
	export interface IBannerProps extends ThemedSFCProps {
	    banner: IBanner;
	    [x: string]: any;
	} const BannerView: React.SFC<IBannerProps>;
	export default BannerView;

}
declare module '@findify/react-components/layouts/Search/index' {
	/// <reference types="react" />
	import React from 'react'; const _default: React.ComponentClass<{}>;
	export default _default;

}
declare module '@findify/react-components/layouts/ContentSearch/index' {
	/// <reference types="react" />
	import React from 'react'; const _default: React.ComponentClass<{}>;
	export default _default;

}
declare module '@findify/react-components/layouts/ZeroResults/index' {
	/// <reference types="react" />
	import React from "react"; const _default: React.ComponentClass<{}>;
	export default _default;

}
declare module '@findify/react-components/index' {
	export { default as Autocomplete } from '@findify/react-components/layouts/Autocomplete';
	export { default as Recommendation } from '@findify/react-components/layouts/Recommendation';
	export { default as Search } from '@findify/react-components/layouts/Search';
	export { default as ContentSearch } from '@findify/react-components/layouts/ContentSearch';
	export { default as ZeroResults } from '@findify/react-components/layouts/ZeroResults';

}
declare module '@findify/react-components/components/autocomplete/SearchSuggestions/test' {
	export {};

}
declare module '@findify/react-components/components/autocomplete/SuggestionItem/test' {
	export {};

}
declare module '@findify/react-components/components/autocomplete/Tip/test' {
	export {};

}
declare module '@findify/react-components/components/Cards/Product/test' {
	export {};

}
declare module '@findify/react-components/components/Cards/Product/Rating/test' {
	export {};

}
declare module '@findify/react-components/components/common/Image/test' {
	export {};

}
declare module '@findify/react-components/components/common/MapArray/test' {
	export {};

}
declare module '@findify/react-components/components/Tabs/test' {
	export {};

}
declare module '@findify/react-components/helpers/withTheme.test' {
	export {};

}
declare module '@findify/react-components/types/layouts/Autocomplete/index' {
	 const _default: any;
	export default _default;

}
declare module '@findify/react-components/types/layouts/Recommendation/index' {
	 const _default: any;
	export default _default;

}
declare module '@findify/react-components/types/index' {
	export { default as Autocomplete } from '@findify/react-components/types/layouts/Autocomplete';
	export { default as Recommendation } from '@findify/react-components/types/layouts/Recommendation';
	export { default as Search } from '@findify/react-components/types/layouts/Search';
	export { default as ContentSearch } from '@findify/react-components/types/layouts/ContentSearch';
	export { default as ZeroResults } from '@findify/react-components/types/layouts/ZeroResults';

}
declare module '@findify/react-components/types/components/autocomplete/ProductMatches/index' {
	/// <reference types="react" />
	import React from 'react'; const _default: React.ComponentClass<{}>;
	export default _default;

}
declare module '@findify/react-components/types/components/autocomplete/SearchSuggestions/test' {
	export {};

}
declare module '@findify/react-components/types/components/autocomplete/SuggestionItem/test' {
	export {};

}
declare module '@findify/react-components/types/components/autocomplete/Tip/test' {
	export {};

}
declare module '@findify/react-components/types/components/Cards/Product/index' {
	 const ProductCard: any;
	export default ProductCard;

}
declare module '@findify/react-components/types/components/Cards/Product/test' {
	export {};

}
declare module '@findify/react-components/types/components/Cards/Product/Rating/test' {
	export {};

}
declare module '@findify/react-components/types/components/Cards/Product/Stickers/index' {
	/// <reference types="react" />
	import React from 'react';
	export const DiscountSticker: {
	    new (props: any): {
	        componentWillReceiveProps(nextProps: any): void;
	        render(): React.ComponentElement<{
	            theme: any;
	            children?: React.ReactNode;
	        }, React.Component<{
	            theme: any;
	            children?: React.ReactNode;
	        }, React.ComponentState, any>>;
	        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: {}) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
	        forceUpdate(callBack?: (() => void) | undefined): void;
	        props: Readonly<{
	            children?: React.ReactNode;
	        }> & Readonly<{}>;
	        state: Readonly<{}>;
	        context: any;
	        refs: {
	            [key: string]: React.ReactInstance;
	        };
	    };
	};
	export const OutOfStockSticker: {
	    new (props: any): {
	        componentWillReceiveProps(nextProps: any): void;
	        render(): React.ComponentElement<{
	            theme: any;
	            children?: React.ReactNode;
	        }, React.Component<{
	            theme: any;
	            children?: React.ReactNode;
	        }, React.ComponentState, any>>;
	        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: {}) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
	        forceUpdate(callBack?: (() => void) | undefined): void;
	        props: Readonly<{
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
declare module '@findify/react-components/types/components/CategoryFacet/content' {
	 const extractContent: ({ item }: {
	    item: any;
	}) => any;
	export default extractContent;

}
declare module '@findify/react-components/types/components/CheckboxFacet/content' {
	 const extractContent: ({ item }: {
	    item: any;
	}) => any;
	export default extractContent;

}
declare module '@findify/react-components/types/components/CheckboxFacet/index' {
	/// <reference types="react" />
	import React from 'react'; const _default: React.ComponentClass<{}>;
	export default _default;

}
declare module '@findify/react-components/types/components/ColorFacet/content' {
	 const _default: ({ item, config, theme }: {
	    item: any;
	    config: any;
	    theme: any;
	}) => JSX.Element;
	export default _default;

}
declare module '@findify/react-components/types/components/common/Grid/Column' {
	/// <reference types="react" />
	import React from 'react';
	export interface IGridColumnProps {
	    className?: string;
	    columnClass?: string;
	    columnStyle?: React.CSSProperties;
	    children?: React.ReactChild;
	} const GridColumn: React.ComponentClass<{}>;
	export default GridColumn;

}
declare module '@findify/react-components/types/components/common/Image/test' {
	export {};

}
declare module '@findify/react-components/types/components/common/MapArray/index' {
	/// <reference types="react" />
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
	}; const _default: ({ array, keyAccessor, factory, limit, ...rest }: MapArrayProps) => any;
	export default _default;

}
declare module '@findify/react-components/types/components/common/MapArray/test' {
	export {};

}
declare module '@findify/react-components/types/components/common/Sticky/view' {
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
declare module '@findify/react-components/types/components/common/Truncate/index' {
	 const _default: ({ children }: {
	    children: any;
	}) => JSX.Element;
	export default _default;

}
declare module '@findify/react-components/types/components/common/VirtualizedList/index' {
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
declare module '@findify/react-components/types/components/common/VirtualizedList/view' {
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
declare module '@findify/react-components/types/components/contentsearch/ContentCard/view' {
	 const _default: ({ item, config, theme }: {
	    item: any;
	    config: any;
	    theme: any;
	}) => JSX.Element;
	export default _default;

}
declare module '@findify/react-components/types/components/contentsearch/LazyContentSearchResults/view' {
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
declare module '@findify/react-components/types/components/contentsearch/Trends/view' {
	 const _default: ({ theme, config, text }: {
	    theme: any;
	    config: any;
	    text: any;
	}) => JSX.Element;
	export default _default;

}
declare module '@findify/react-components/types/components/PoweredBy/view' {
	 const _default: ({ config, theme }: {
	    config: any;
	    theme: any;
	}) => JSX.Element;
	export default _default;

}
declare module '@findify/react-components/types/components/RangeFacet/content' {
	 const _default: ({ item, config }: {
	    item: any;
	    config: any;
	}) => string;
	export default _default;

}
declare module '@findify/react-components/types/components/RatingFacet/content' {
	 const _default: ({ item, theme, config }: {
	    item: any;
	    theme: any;
	    config: any;
	}) => JSX.Element;
	export default _default;

}
declare module '@findify/react-components/types/components/search/Query/index' {
	/// <reference types="react" />
	import React from 'react'; const _default: React.ComponentClass<{}>;
	export default _default;

}
declare module '@findify/react-components/types/components/Tabs/index' {
	/// <reference types="react" />
	import React from 'react';
	export const Tabs: React.ComponentClass<{}>;
	export const Tab: () => null;

}
declare module '@findify/react-components/types/components/Tabs/test' {
	export {};

}
declare module '@findify/react-components/types/helpers/emmiter' {
	export const emit: (...args: any[]) => any;
	export const listen: (...args: any[]) => any;

}
declare module '@findify/react-components/types/helpers/getPrice' {
	export const priceIsSampleArray: (price: any) => boolean;
	export const getPrice: (maybeImmutablePrice: any, currency: any) => any;

}
declare module '@findify/react-components/types/helpers/omit' {
	 const _default: (keys: any) => (obj: any) => any;
	export default _default;

}
declare module '@findify/react-components/types/helpers/template' {
	 const _default: (template?: string, selector?: RegExp) => (...args: any[]) => string;
	export default _default;

}
declare module '@findify/react-components/types/helpers/withColumns' {
	 const _default: (columnsMapper?: (width: any, props?: any) => 2 | 12 | 3 | 6 | 4) => (baseComponent: any) => any;
	export default _default;

}
declare module '@findify/react-components/types/helpers/withDrawer' {
	export const withDrawer: (modalName: any, modalComponent: any, { renderTo, ...options }?: any) => (BaseComponent: any) => any;

}
declare module '@findify/react-components/types/helpers/withErrorHandler' {
	/// <reference types="react" />
	import React from 'react'; const _default: (BaseComponent: any) => {
	    new (props: {}, context?: any): {
	        state: {
	            error: boolean;
	        };
	        componentDidCatch(error: any, info: any): void;
	        render(): React.ComponentElement<{}, React.Component<{}, React.ComponentState, any>> | null;
	        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: {}) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
	        forceUpdate(callBack?: (() => void) | undefined): void;
	        props: Readonly<{
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
declare module '@findify/react-components/types/helpers/withEvents' {
	/// <reference types="react" />
	import React from 'react'; const _default: (events?: any) => (BaseComponent: any) => {
	    new (props: {}, context?: any): {
	        removeListener: any;
	        handler: (event: any, ...args: any[]) => void;
	        componentDidMount(): void;
	        componentWillUnmount(): void;
	        render(): any;
	        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: {}) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
	        forceUpdate(callBack?: (() => void) | undefined): void;
	        props: Readonly<{
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
declare module '@findify/react-components/types/helpers/withLazy' {
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
	        props: Readonly<{
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
declare module '@findify/react-components/types/helpers/withTheme' {
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
	        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: {}) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
	        forceUpdate(callBack?: (() => void) | undefined): void;
	        props: Readonly<{
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
declare module '@findify/react-components/types/helpers/withTheme.test' {
	export {};

}
declare module '@findify/react-components/types/layouts/Autocomplete/Fullscreen/index' {
	/// <reference types="react" />
	import React from 'react'; const _default: React.ComponentClass<{}>;
	export default _default;

}
declare module '@findify/react-components/types/layouts/Autocomplete/Fullscreen/view' {
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
declare module '@findify/react-components/types/layouts/Autocomplete/Sidebar/index' {
	/// <reference types="react" />
	import React from 'react'; const _default: React.ComponentClass<{}>;
	export default _default;

}
declare module '@findify/react-components/types/layouts/Autocomplete/Sidebar/view' {
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
declare module '@findify/react-components/types/layouts/Recommendation/Slider/Arrow' {
	/// <reference types="react" />
	export const renderArrow: (dir: any, handler: any) => JSX.Element;

}
declare module '@findify/react-components/types/layouts/Search/view' {
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
declare module '@findify/react-components/types/types/index' {
	/// <reference types="react" />
	import * as React from 'react';
	import { Map, List } from 'immutable';
	export interface Theme {
	    [key: string]: string;
	}
	export interface ThemedSFCProps {
	    'display-if'?: boolean;
	    children?: React.ReactNode;
	    theme: Theme;
	}
	export interface ClassnamedProps {
	    className?: string;
	}
	export interface WidgetAwareProps {
	    widgetKey: string;
	}
	export interface SuggestionsConnectedProps {
	    suggestions: List<ISuggestion>;
	    getSuggestionProps: GetSuggestionPropsFunction;
	}
	export interface ThemedSFC<P = {}, C = {}> extends React.StatelessComponent<P> {
	    (props: P & {
	        'display-if'?: boolean;
	        children?: React.ReactNode;
	        theme: Theme;
	    }, context?: C): React.ReactElement<any> | null;
	    propTypes?: React.ValidationMap<P>;
	    contextTypes?: React.ValidationMap<C>;
	    defaultProps?: Partial<P>;
	    displayName?: string;
	}
	export type MJSValue = List<any> | string | number | boolean;
	export interface MJSConfiguration<K = string, V = MJSValue & undefined> extends Map<K, V> {
	}
	export interface ISuggestionProps {
	    key: string;
	    onClick: (evt: React.MouseEvent<any>) => any;
	}
	export type GetSuggestionPropsFunction = (suggestionIndex: number, widgetKey: string) => ISuggestionProps;
	export interface ISuggestion extends Map<string, MJSValue> {
	}
	export interface IProduct extends Map<string, MJSValue> {
	    onClick: (evt: React.MouseEvent<any>) => any;
	}
	export interface ISortingItem extends Map<string, MJSConfiguration> {
	}
	export interface IBanner extends Map<string, MJSValue> {
	}
	export interface IQuery extends Map<string, MJSValue> {
	}
	export interface IFacet extends Map<string, MJSValue> {
	    toggle: (evt: React.MouseEvent<any>) => any;
	    resetValues: () => any;
	}
	export type FilterType = 'text' | 'range' | 'color' | 'category' | 'price' | 'rating';
	export interface IFacetValue extends Map<string, MJSValue> {
	    toggle: (evt: React.MouseEvent<any>) => any;
	}

}
