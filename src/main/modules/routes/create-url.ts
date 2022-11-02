import { removeURLExtraDoubleSlashes } from '../../../shared'

export function createURLRoute(route: string, id: string) {
  const URL = `${route}/#/${id}`

  return removeURLExtraDoubleSlashes(URL)
}
