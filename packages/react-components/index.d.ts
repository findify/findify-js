import * as React from 'react';

declare global {
  type Theme = object // TODO: implement more okayish type then alias
  interface ThemedSFC<P = {}, C = {}> extends React.StatelessComponent<P> {
    (props: P & { children?: React.ReactNode, theme: Theme }, context?: C): React.ReactElement<any> | null;
    propTypes?: React.ValidationMap<P>;
    contextTypes?: React.ValidationMap<C>;
    defaultProps?: Partial<P>;
    displayName?: string;
  }
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
