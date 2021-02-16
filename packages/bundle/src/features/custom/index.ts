import { createElement } from "react";

import lazy from '../../helpers/renderLazyComponent';

const lazyComponent = lazy(() => import(
  /* webpackChunkName: "additional" */
  '@findify/react-components/src/layouts/Custom'
));

export default (widget) => () => createElement(lazyComponent, widget);
