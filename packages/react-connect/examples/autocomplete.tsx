import * as React from 'react';
import { create } from 'react-test-renderer';
import { Autocomplete } from '@findify/agent';
// tslint:disable-next-line:import-name
import Analytics from '@findify/analytics';
import { Provider, connectSuggestions, connectItems } from '../src';

const analytics = new Analytics({ key: '8a2c6a1e-1aac-4047-8514-f284203c4b59' });
const autocomplete = new Autocomplete({
  key: '8a2c6a1e-1aac-4047-8514-f284203c4b59',
  immutable: true,
  user: {
    uid: '1',
    sid: '1'
  }
})
.defaults({ q: 'white' })

// tslint:disable-next-line:variable-name
const Suggestions = connectSuggestions(({ suggestions, getSuggestionProps }) => {
  const s = suggestions && suggestions.toJS();
  return !!suggestions && suggestions.map((suggestion, index) => {
    const props = getSuggestionProps(suggestion);
    if (index === 2) props.onClick();
    return <div { ...props }/>
  });
});

// tslint:disable-next-line:variable-name
const Products = connectItems({ feature: 'autocomplete' })(
  ({ items, getItemProps }) => {
    const s = items && items.toJS();
    return !!items && items.map((item, index) => {
      const props = getItemProps(item);
      if (index === 0) props.onClick();
      return <div { ...props }/>
    });
  })

// tslint:disable-next-line:variable-name
const App = (
  <Provider agent={autocomplete} analytics={analytics}>
    <>
      <Suggestions />
      <Products />
    </>
  </Provider>
);

create(App);
