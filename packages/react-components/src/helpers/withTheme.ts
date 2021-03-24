import { createElement, useMemo } from 'react';

export default (defaultTheme) => (Component) => ({ theme = {}, ...props }) => {
  const _theme = useMemo(() => ({ ...defaultTheme, ...theme }), [theme]);
  return createElement(Component, { ...props, theme: _theme });
};
