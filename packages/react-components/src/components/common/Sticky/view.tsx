import React from 'react';
import cx from 'classnames';

export default ({ theme, registerRoot, registerContainer, registerWrapper, children, state }) =>
<div className={theme.root} ref={registerRoot}>
  <div className={theme.wrapper} ref={registerWrapper}>
    <div className={cx(theme.container, theme[state])} ref={registerContainer}>
      { children }
    </div>
  </div>
</div>
