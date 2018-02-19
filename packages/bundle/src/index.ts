import 'core-js/es6/promise';
import loadJs from 'load-js';

Promise.all([
  import(
    /* webpackChunkName: "analytics" */
    '@findify/analytics-dom'
  ),
  import(
    /* webpackChunkName: "connect" */
    '@findify/react-connect'
  ),
  import(
    /* webpackChunkName: "agent" */
    '@findify/agent'
  ),
])
.then(deps => {
  console.log(global);
  
  
});
