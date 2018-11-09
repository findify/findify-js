
const separateWords = (string, options: any = {}) => {
  const separator = options.separator || '_';
  const split = options.split || /(?=[A-Z])/;
  return string.split(split).join(separator);
}

export const decamelize = (string, options?) => separateWords(string, options).toLowerCase();
