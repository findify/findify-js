export default (
  fn: (...args: any[]) => void,
  wait: number = 0,
  immediate: boolean = false
) => {
	let timeout;
	return function (...args) {
    const ctx = this;
  
    clearTimeout(timeout);

    const callNow = immediate && !timeout;

    timeout = setTimeout(() => {
      timeout = null;
      return !immediate && fn.apply(ctx, args);
    }, wait);
    
    return callNow && fn.apply(ctx, args);
	};
};
