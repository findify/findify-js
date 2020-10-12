/**
 * @module components/common/Sticky
 */

import React from 'react';
import cx from 'classnames';

export default ({ theme, registerRoot, registerContainer, registerSizer, children, state, title }) =>
<section className={theme.root} role="region" aria-label={title} ref={registerRoot} tabIndex={0}>
  <div className={cx(theme.container, theme[state])} ref={registerContainer}>
    { children }
  </div>
  <div className={theme.wrapper} ref={registerSizer} />
</section>
