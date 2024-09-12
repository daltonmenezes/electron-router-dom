import type { LoadFileOptions } from 'electron'

import { removeURLExtraDoubleSlashes } from 'shared/utils/remove-url-extra-double-slashes'

export function createURLRoute(
  route: string,
  id: string,
  options?: Omit<LoadFileOptions, 'hash'>
) {
  let url = `${route}/#/${id}`

  if (options?.query) {
    const query = new URLSearchParams(options.query).toString()

    url = `${route}?${query}#/${id}?${query}`
  }

  return removeURLExtraDoubleSlashes(url)
}
