function joinParams(url: string, params: string) {
  const urlWithoutTrailingSlash =
    url.slice(-1) !== '/' ? url : url.slice(0, -1);

  return urlWithoutTrailingSlash + '?' + params;
}

export { joinParams };
