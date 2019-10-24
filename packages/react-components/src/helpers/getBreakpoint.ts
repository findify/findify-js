const isFunction = (check) => {
  return check && {}.toString.call(check) === '[object Function]';
 }
 
export default (breakpoints, width = window.innerWidth) => {
  if (!breakpoints) return undefined;

  if (isFunction(breakpoints)) return breakpoints(width);

  const points = Object.keys(breakpoints);

  return points
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
    .filter(point => Number(point) <= width)
    .pop() || points[0];
}
