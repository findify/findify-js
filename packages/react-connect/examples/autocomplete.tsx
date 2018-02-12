import * as React from 'react';
import { create } from 'react-test-renderer';
// tslint:disable-next-line:import-name
import { Autocomplete, connectSuggestions, connectItems } from '../src';

// tslint:disable-next-line:variable-name
const Suggestions = connectSuggestions(({ suggestions, getSuggestionProps }) => {
  const s = suggestions && suggestions.toJS();
  return !!suggestions && suggestions.map((suggestion, index) =>
    <button { ...getSuggestionProps(index) }>
      <span>{ suggestion.get('value') }</span>
    </button>
  );
});

// tslint:disable-next-line:variable-name
const Products = connectItems(
  ({ items }) => {
    return !!items && items.map((item, index) =>
      <div key={item.hashCode()}>
        <h5>Title: { item.get('title') }</h5>
      </div>
    );
  })

// tslint:disable-next-line:variable-name
const App = (
  <Autocomplete apiKey='8a2c6a1e-1aac-4047-8514-f284203c4b59' defaults={{ q: 'white' }}>
    <>
      <Suggestions />
      <Products />
    </>
  </Autocomplete>
);

create(App);
