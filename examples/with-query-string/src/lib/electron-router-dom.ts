import { createElectronRouter, type Query } from 'electron-router-dom'

export const { Router, registerRoute, settings } = createElectronRouter({
  port: 4927,

  types: {
    ids: ['main'],
    queryKeys: ['name', 'version'],
  },
})

declare global {
  type Types = typeof settings

  interface URLSearchParams {
    get<T extends Types>(name: Query.Keys<T>): Query.Return
    set<T extends Types>(name: Query.Keys<T>, value: string): void
    append<T extends Types>(name: Query.Keys<T>, value: string): void
    delete<T extends Types>(name: Query.Keys<T>, value?: string): void
    has<T extends Types>(name: Query.Keys<T>, value?: string): boolean
    forEach<T extends Types>(
      callbackfn: (
        value: string,
        key: Query.Keys<T>,
        parent: URLSearchParams
      ) => void
    ): void
    getAll<T extends Types>(name: Query.Keys<T>): string[]
    keys<T extends Types>(): IterableIterator<Query.Keys<T>>
    entries<T extends Types>(): IterableIterator<[Query.Keys<T>, string]>
  }
}
