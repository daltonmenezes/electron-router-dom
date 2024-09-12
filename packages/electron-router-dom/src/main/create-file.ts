import type { LoadFileOptions } from 'electron'

export function createFileRoute(
  path: string,
  id: string,
  options?: Omit<LoadFileOptions, 'hash'>
): [string, LoadFileOptions] {
  const _options = (options || {}) as LoadFileOptions

  let url = `/${id}`

  if (options?.query) {
    const query = new URLSearchParams(options.query).toString()

    url = `${url}?${query}#/${id}`
  }

  _options.hash = url

  return [path, _options]
}
