import { removeURLExtraDoubleSlashes } from 'src/shared'

export function createURLRoute(route: string, id: string) {
  const URL = `${route}/#/${id}`

  return removeURLExtraDoubleSlashes(URL)
}
