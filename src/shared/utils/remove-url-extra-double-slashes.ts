export function removeURLExtraDoubleSlashes(url: string) {
  return url.replace(/([^:]\/)\/+/g, '$1')
}
