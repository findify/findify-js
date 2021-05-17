declare module 'Autocomplete' {
import { BaseFeature } from 'BaseFeature';
import * as enums from 'enums';
import { ProductType } from 'ProductType';
import { Breakpoints } from 'Breakpoints';
export type AutocompleteSizeType = {
    template: keyof typeof enums.AutocompleteTemplate;
    position?: keyof typeof enums.AutocompletePosition;
    /**
     * Display clickable background overlay
     */
    overlay: boolean;
    /**
     * Suggestions options
     */
    suggestions: {
        display: boolean;
        template: keyof typeof enums.SuggestionTemplate;
    };
    /**
     * Product matches options
     */
    productMatches: {
        display: boolean;
    };
    product: ProductType;
    /**
     * Layout breakpoints definition
     */
    breakpoints: {
        grid: Breakpoints;
        layout: Breakpoints;
    };
};
export interface Autocomplete extends Omit<BaseFeature<'Autocomplete'>, 'product'> {
    /**
     * Node where widget should be rendered in
     * - parent - Parent node
     * - self - Dynamically created widget node
     * - body - Document.Body
    */
    renderIn: keyof typeof enums.AutocompleteRenderNode;
    /**
     * If value set to `true` and current page is "Search Results", then autocomplete will
     * try to update search widget rather then send request for suggestions
     */
    instant: boolean;
    /**
    * Listen closest form submit event
    */
    handleFormSubmit: boolean;
    /**
    * Shows trending suggestions when query is empty
    */
    enableTrendingSearches: boolean;
    mobile: AutocompleteSizeType;
    desktop: AutocompleteSizeType;
}

}
declare module 'BaseFeature' {
import { Autocomplete, Search, SmartCollection, Recommendations, Content } from '@findify/sdk/lib/request';
import { ProductType } from 'ProductType';
export type RequestParams = {
    Autocomplete: Autocomplete.Params;
    Search: Search.Params;
    SmartCollection: SmartCollection.Params;
    Recommendation: Recommendations.Slot;
    Content: Content.Params;
};
type IBaseFeature<T extends keyof RequestParams> = {
    /**
     * Should widget send request right after creation
     * Helpful if widget is created manually and you need to set
     * default request properties
     */
    disableAutoRequest: boolean;
    /**
     * Default widget request params
    */
    defaultRequestParams: Partial<RequestParams[T]>;
    /**
     * Product card setup
    */
    product: ProductType;
};
export type BaseFeature<T = undefined> = T extends keyof RequestParams ? IBaseFeature<T> : Omit<IBaseFeature<any>, 'defaultRequestParams'>;
export {};

}
declare module 'Breakpoints' {
/**
 * List of media queries.
 * If max-width media query will achieve one of keys in list, then biggest will be returned
 * In case window width is smaller then smallest key then default`s key value will be returned
 * If no default value is set, then `1` will be returned
 * @width of Window
 * @value will be returned when window width achieved
 */
export type Breakpoints = {
    width: number;
    value: number | string;
}[];

}
declare module 'Config' {
import * as enums from 'enums';
import { Autocomplete } from 'Autocomplete';
import { Recommendation } from 'Recommendation';
import { Search } from 'Search';
import { Content } from 'Content';
import { Method } from '@findify/sdk/lib/request';
import { Translations } from 'Translations';
export type Config = {
    /** Merchant API key */
    key: string;
    /** Merchant ID, required to connect Chrome DevTools */
    merchantId: number;
    /** Store status */
    status: keyof typeof enums.StoreStatus;
    /** Store platform. Generic by default */
    platform: keyof typeof enums.Platform;
    /** Breakpoint after reaching that view will switch to desktop mode */
    mobileBreakpoint: number;
    /** Request method type */
    api: {
        method: Method;
    };
    /** Disable event tracking in analytics */
    analytics?: {
        [key in keyof typeof enums.AnalyticsEventKey]?: false;
    };
    /**
     * Should observe dom change to dynamically attach/detach widgets
     * @warn this change may slow down website
     */
    observeDomChanges: boolean;
    /** URL management configuration */
    location: {
        /**
         * Search page url
         * - Search widget will be rendered only on this URL
         * - Autocomplete will redirect to this page
        */
        searchUrl: string;
        /** Search query prefix eq(?findify_q) */
        prefix: string;
        /** Reserved search query keys to keep custom query like UTM tags */
        keys?: string[];
    };
    /** Custom nodes mapping where widgets will be attached */
    selectors: {
        [selector: string]: keyof typeof enums.Feature;
    };
    /** Currency display setup */
    currency: {
        code: string;
        symbol: string;
        thousandsSeparator: string;
        decimalSeparator: string;
        symbolOnLeft: boolean;
        spaceBetweenAmountAndSymbol: boolean;
        decimalDigits: number;
    };
    /** List of collection urls */
    collections: string[];
    /** Features setup. On feature level specific config should be merged with the root */
    features: {
        autocomplete: Autocomplete;
        search: Search;
        content: Content;
        recommendations: {
            [key: string]: Recommendation;
        };
    };
    /** Sticker component display options */
    stickers: {
        discount: boolean;
        outOfStock: boolean;
    };
    /** Map colors from value to hex or url  */
    colorMapping: {
        [key: string]: string;
    };
    /** Translations */
    translations: Translations;
    /** Customizations */
    components: {
        [key: string]: () => void;
    };
};

}
declare module 'Content' {
import { BaseFeature } from 'BaseFeature';
import { Breakpoints } from 'Breakpoints';
import { PaginationType } from 'enums';
export interface Content extends BaseFeature<'Content'> {
    /**
     * Pagination settings
     */
    pagination: {
        /** Type of pagination */
        type: keyof typeof PaginationType;
        /** How many times will lazy load before show `Load more` button */
        autoLoadTimes: number;
        /** Step between pages in pagination component eq: `< 1 [step] 3 [step] 5 >` */
        step: number;
    };
    /**
     * Scroll top after items update setting
    */
    scrollTop: {
        enabled: boolean;
        /** CSS selector of container you need to scroll to */
        selector: string;
        /** +/- container`s offset */
        offset: number;
    };
    /**
     * Layout breakpoints definition
     */
    breakpoints: {
        grid: Breakpoints;
        layout: Breakpoints;
    };
}

}
declare module 'enums' {
export enum StoreStatus {
    'live' = 0,
    'disabled' = 1,
    'paused' = 2,
    'created' = 3
}
export enum Feature {
    'autocomplete' = 0,
    'search' = 1,
    'recommendation' = 2,
    'content' = 3,
    'custom' = 4
}
export enum Platform {
    'generic' = 0,
    'shopify' = 1,
    'bigcommerce' = 2,
    'magento' = 3,
    'magento2' = 4,
    'neto' = 5,
    'jetshop' = 6
}
export enum AnalyticsEventKey {
    'view-page' = 0,
    'purchase' = 1,
    'update-cart' = 2,
    'click-item' = 3,
    'add-to-cart' = 4
}
export enum FilterType {
    'text' = 0,
    'category' = 1,
    'range' = 2,
    'color' = 3,
    'price' = 4,
    'rating' = 5
}
export enum ProductPriceTemplate {
    'min-max' = 0,
    'from-min' = 1,
    'to-max' = 2
}
export enum ProductVariantsTemplate {
    'radio' = 0,
    'select' = 1,
    'text' = 2
}
export enum ProductTemplate {
    'vertical' = 0,
    'horizontal' = 1
}
/**
 * Autocomplete
 */
export enum AutocompleteRenderNode {
    'parent' = 0,
    'self' = 1,
    'body' = 2
}
export enum AutocompleteTemplate {
    'dropdown' = 0,
    'sidebar' = 1,
    'fullscreen' = 2,
    'fullscreen-with-input' = 3
}
export enum AutocompletePosition {
    'left' = 0,
    'right' = 1
}
export enum SuggestionTemplate {
    'horizontal' = 0,
    'vertical' = 1
}
/**
 * Recommendation
 */
export enum RecommendationType {
    'trending' = 0,
    'newest' = 1,
    'viewedViewed' = 2,
    'viewed' = 3,
    'viewedBought' = 4,
    'purchasedTogether' = 5,
    'featured' = 6
}
export enum RecommendationTemplate {
    'slider' = 0,
    'grid' = 1
}
/**
 * Search / Smart Collections
 */
export enum PaginationType {
    'lazy' = 0,
    'static' = 1
}
export enum FacetsPosition {
    'left' = 0,
    'right' = 1,
    'top' = 2
}
export enum SearchOrder {
    default = "",
    asc = "asc",
    desc = "desc"
}

}
declare module 'Immutable' {
import { Map } from 'immutable';
import { Config } from 'Config';
import { Autocomplete, AutocompleteSizeType } from 'Autocomplete';
import { Search } from 'Search';
import { Recommendation } from 'Recommendation';
import { Content } from 'Content';
import * as enums from 'enums';
type Maybe<T> = T | undefined;
type CopyMaybe<T, U> = Maybe<T> extends T ? Maybe<U> : U;
type CopyAnyMaybe<T, U, V> = CopyMaybe<T, V> | CopyMaybe<U, V>;
type MayBePrimitive<T> = T extends Record<string, any> ? Factory<T> : T;
export interface Factory<State> extends Map<keyof State, any> {
    toJS(): State;
    get<I extends keyof State>(key: I): MayBePrimitive<State[I]>;
    get<I extends keyof State, NSV>(key: I, notSetValue: NSV): MayBePrimitive<State[I]> | NSV;
    getIn<K1 extends keyof State, K2 extends keyof NonNullable<State[K1]>>(path: [K1, K2]): MayBePrimitive<CopyMaybe<State[K1], NonNullable<State[K1]>[K2]>>;
    getIn<K1 extends keyof State, K2 extends keyof NonNullable<State[K1]>, K3 extends keyof NonNullable<NonNullable<State[K1]>[K2]>>(path: [K1, K2, K3]): MayBePrimitive<CopyAnyMaybe<State[K1], NonNullable<State[K1]>[K2], NonNullable<NonNullable<State[K1]>[K2]>[K3]>>;
    getIn<K1 extends keyof State, NSV>(// Same stuff but with notSetValue. 
    path: [K1], notSetValue: NSV): State[K1] | NSV;
    getIn<K1 extends keyof State, K2 extends keyof NonNullable<State[K1]>, NSV>(path: [K1, K2], notSetValue: NSV): MayBePrimitive<CopyMaybe<State[K1], NonNullable<State[K1]>[K2]>> | NSV;
    getIn<K1 extends keyof State, K2 extends keyof NonNullable<State[K1]>, K3 extends keyof NonNullable<NonNullable<State[K1]>[K2]>, NSV>(path: [K1, K2, K3], notSetValue: NSV): MayBePrimitive<CopyAnyMaybe<State[K1], NonNullable<State[K1]>[K2], NonNullable<NonNullable<State[K1]>[K2]>[K3] | NSV>>;
}
type FEConfig = {
    widgetKey: string;
    node: HTMLElement;
    widgetType: enums.Feature;
    cssSelector?: string;
    slot?: string;
};
export type BaseConfig = Factory<Config & FEConfig>;
export type AutocompleteConfig = Factory<Config & Autocomplete & AutocompleteSizeType & FEConfig>;
export type SearchConfig = Factory<Config & Search & FEConfig>;
export type ContentConfig = Factory<Config & Content & FEConfig>;
export type RecommendationConfig = Factory<Recommendation & Config & FEConfig>;
export type FeatureConfig = AutocompleteConfig | SearchConfig | RecommendationConfig | ContentConfig;
type FeaturesMapping = {
    autocomplete: AutocompleteConfig;
    search: SearchConfig;
    recommendation: RecommendationConfig;
    content: ContentConfig;
    custom: ContentConfig;
};
export type SpecificConfig<T extends keyof typeof enums.Feature> = FeaturesMapping[T];
export {};

}
declare module 'ProductType' {
import { ProductPriceTemplate, ProductVariantsTemplate, ProductTemplate } from 'enums';
export type ProductType = {
    /**
     * Product template
     * Custom string value could be used if you need to have
     * specific view in widget
     */
    template: keyof typeof ProductTemplate | string;
    /**
     * Product price component display options
     */
    price: {
        template: keyof typeof ProductPriceTemplate;
    };
    /**
     * Title component display options
     */
    title?: {
        /**
         * Max number of title lines to be shown
         * the rest of text will be cropped
         */
        lines: number;
    };
    /**
     * Description component display options
     */
    description?: {
        /**
         * Max number of title lines to be shown
         * the rest of text will be cropped
         */
        lines: number;
    };
    /**
     * Variants component display options
     */
    variants: {
        display: boolean;
        template: keyof typeof ProductVariantsTemplate;
    };
    /**
     * Image component display options
     */
    image?: {
        /**
         * If number not set images will keep its original aspect
         * To make lazy loading work smoothly we should preserve aspect ratio
             * 0 - by default
         */
        aspectRatio: number;
        /**
         * If "true" images will be loaded just when they appear in view
         */
        lazy: boolean;
        /**
         * Screen offset when images will start loading
         */
        lazyOffset: number;
    };
};

}
declare module 'Recommendation' {
import { BaseFeature } from 'BaseFeature';
import { Breakpoints } from 'Breakpoints';
import * as enums from 'enums';
export interface Recommendation extends BaseFeature<'Recommendation'> {
    /**
     * If recommendation enabled
     */
    enabled: boolean;
    /**
     * Recommendation slot
     */
    slot: string;
    /**
     * Recommendation type
     */
    type: keyof typeof enums.RecommendationType;
    /**
     * Recommendation template
     */
    template: keyof typeof enums.RecommendationTemplate;
    /**
     * Max amount of items in response
     */
    limit: number;
    /**
     * Min amount of items when widget should be rendered
     */
    minResultsToShow: number;
    /**
     * If `true` will pick all products from analytics
     * Required only for `purchasedTogether` type
     */
    multipleIds: boolean;
    /**
     * Widget title
     */
    title: string;
    /**
     * Layout breakpoints definition
     */
    breakpoints: {
        grid: Breakpoints;
    };
}

}
declare module 'Search' {
import { BaseFeature } from 'BaseFeature';
import { Breakpoints } from 'Breakpoints';
import * as enums from 'enums';
export interface Search extends BaseFeature<'Search'> {
    /**
    * If present - will render Recommendation widget with given type
    * if no results has been returned
    */
    zeroResultsType?: Exclude<keyof typeof enums.RecommendationType, 'bought' | 'purchasedTogether'>;
    /**
     * Collection Only
     * Show fallback for smart collection if no results was returned or error happened
     */
    fallbackEnabled: boolean;
    /**
     * Collection Only
     * If `true` filters from page will be included as rules
     */
    includeRules: boolean;
    /**
     * Scroll top after items update setting
     */
    scrollTop: {
        enabled: boolean;
        /** CSS selector of container you need to scroll to */
        selector: string;
        /** +/- container`s offset */
        offset: number;
    };
    /**
     * Layout breakpoints definition
     */
    breakpoints: {
        grid: Breakpoints;
        layout: Breakpoints;
    };
    /**
     * Sorting options
     */
    sorting: {
        options: {
            field: string | 'default';
            order: keyof typeof enums.SearchOrder;
            label: string;
        }[];
    };
    /**
     * Pagination settings
     */
    pagination: {
        /** Type of pagination */
        type: keyof typeof enums.PaginationType;
        /** How many times will lazy load before show `Load more` button */
        autoLoadTimes: number;
        /** Step between pages in pagination component eq: `< 1 [step] 3 [step] 5 >` */
        step: number;
    };
    /**
     * Facets setup
     */
    facets: {
        /** Facets component position
         * `left` - on left from product matches
         * `top` - above
         * `right` - next to products (changes flex order)
         */
        position: keyof typeof enums.FacetsPosition;
        /**
         * If `true` will stick facets container to top of window
         */
        sticky: boolean;
        /**
         * Expand only one facet per time
         */
        accordion: boolean;
        /**
         * Defines if facets could be hidden or not
         */
        hidable: boolean;
        /**
         * Filters setup
         */
        filters: {
            [filterName: string]: {
                type: keyof typeof enums.FilterType;
                label: string;
                initiallyCollapsed: boolean;
                /**
                 * CheckboxFacet specific option
                 * Number of visible facet options before "show more" button clicked
                 */
                maxItemsCount: number;
                /**
                 * Step for range input
                 */
                precision: number;
            };
        };
    };
}

}
declare module 'Translations' {
export type Translations = {
    'suggestions.accessibleTitle': string;
    'product.availableInVariants': string;
    'facets.less': string;
    'facets.more': string;
    'facets.allCategories': string;
    'facets.expanded': string;
    'facets.collapsed': string;
    'facets.submit': string;
    'facets.filters': string;
    'facets.clearAll': string;
    'facets.hide': string;
    'facets.back': string;
    'facets.done': string;
    'facets.seeResults': string;
    'pagination.previous': string;
    'pagination.goTo': string;
    'pagination.next': string;
    'actions.showFilters': string;
    'actions.sorting': string;
    'actions.back': string;
    'actions.seeResults': string;
    'actions.sortBy': string;
    'search.title': string;
    'search.loadPrev': string;
    'search.loadMore': string;
    'search.noQuery': string;
    'search.showingEmpty': string;
    'search.showing': string;
    'search.zeroResultsFor': string;
    'search.partialMatch': string;
    'search.accessibleUpdate': string;
    'zeroresults.sorryNoResults': string;
    'zeroresults.noResultsFound': string;
    'zeroresults.noResultEmptyQuery': string;
    'zeroresults.tryOneOfThese': string;
    'zeroresults.checkOutPopularProducts': string;
    'autocomplete.trendingSearches': string;
    'autocomplete.suggestionsTitle': string;
    'autocomplete.trendingProducts': string;
    'autocomplete.productMatches': string;
    'autocomplete.tipResults': string;
    'autocomplete.viewAll': string;
    'autocomplete.placeholder': string;
};

}
