function countBytesInString(s: string) {
  return encodeURI(s).split(/%..|./).length - 1;
}

export { countBytesInString };
