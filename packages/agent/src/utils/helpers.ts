export const isObject = (value) => {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

export const isFunction = (value) => {
  if (!isObject(value)) return false;
  return typeof value === "function";
}

export const isArray = (value) => isObject(value) && Array.isArray(value);

export const identity = v => v;

export const debounce = (fn, wait?) => {
	let timeout;
	return function () {
    const ctx = this;
    const args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(() => fn.apply(ctx, args), wait || 0);
	};
};
