import * as React from 'react';
import { Map } from 'immutable'

declare global {
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
