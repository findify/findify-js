import * as React from 'react';
import { create } from 'react-test-renderer';
import { Autocomplete } from '@findify/agent';
import * as Analytics from '@findify/analytics';
import { Provider, connectSuggestions } from '../src';

const analytics = Analytics({ key: '8a2c6a1e-1aac-4047-8514-f284203c4b59' });
const autocomplete = new Autocomplete({
  key: '8a2c6a1e-1aac-4047-8514-f284203c4b59',
  user: {
    uid: '1',
    sid: '1'
  }
})

const Component = connectSuggestions((props) => {
  console.log(props);
  props.onClick('looololo')
  return <div />;
})

const App = (
  <Provider agent={autocomplete} analytics={analytics}>
    <Component />
  </Provider>
);

create(App);
