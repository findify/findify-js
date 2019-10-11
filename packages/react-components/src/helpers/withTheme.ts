import React, { useMemo } from 'react'

export default defaultTheme => Component => ({ theme, ...props }) => {
  const _theme = useMemo(() => ({ ...defaultTheme, ...theme }), [theme]);
  return React.createElement(Component, { ...props, theme: _theme })
}
