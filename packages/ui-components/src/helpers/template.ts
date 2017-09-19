import { memoize, unescape } from 'lodash';

export default (template = '', selector = /%s/g) => {
  const tpl = unescape(template);
  return memoize((...args) => {
    let index = -1;
    return tpl.replace(selector, () => {
      index++;
      return args[index] || '';
    });
  });
};
