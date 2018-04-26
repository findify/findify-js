import React from 'react';
import cx from 'classnames';

export default ({ theme, registerRoot, registerContainer, registerSizer, children, state }) =>
<div className={theme.root} ref={registerRoot}>
  <div className={cx(theme.container, theme[state])} ref={registerContainer}>
    { children }
  </div>
  <div className={theme.wrapper} ref={registerSizer} />
</div>
