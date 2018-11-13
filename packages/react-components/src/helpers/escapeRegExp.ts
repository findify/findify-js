const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
const reHasRegExpChar = RegExp(reRegExpChar.source);

export const escapeRegExp = s => s && reHasRegExpChar.test(s)
    ? s.replace(reRegExpChar, '\\$&')
    : s;
