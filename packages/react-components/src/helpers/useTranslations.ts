import { useConfig } from '@findify/react-connect';
import { Config } from '@findify/store-configuration';
import { useMemo } from 'react';
import unescape from 'lodash/unescape';

const createTranslator = (
  strings: Config['translations'] = {},
  selector: RegExp
) => {
  return (key: string, ...args: any[]): string => {
    const value = strings[key];
    const isTemplate = selector.test(value);

    if (!value) return key;
    if (!isTemplate) return value;

    const tpl = unescape(value);
    let index = -1;
    return tpl.replace(selector, () => {
      index++;
      return args[index] || '';
    });
  };
};

export default () => {
  const { config } = useConfig();
  return useMemo(() => createTranslator(config.get('translations'), /%s/), []);
};
