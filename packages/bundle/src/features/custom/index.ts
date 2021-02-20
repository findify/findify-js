import { createElement } from "react";

import lazy from '../../helpers/renderLazyComponent';

const lazyComponent = lazy(() => import(
  '@findify/react-components/src/layouts/Custom'
));

export default (_, widget) => createElement(lazyComponent, widget);
