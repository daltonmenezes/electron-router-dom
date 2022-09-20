import { LoadFileOptions } from 'electron'

export function createFileRoute(
  path: string,
  id: string,
  options?: Omit<LoadFileOptions, 'hash'>
): [string, LoadFileOptions] {
  return [
    path,
    {
      ...(options ? options : {}),
      hash: `/${id}`,
    },
  ]
}
