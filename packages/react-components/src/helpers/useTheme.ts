import { useMemo } from "react";

export default (theme = {}, styles = {}) =>
  useMemo<{ [className: string]: string }>(() =>
    ({ ...theme, ...styles })
  , [styles]);
