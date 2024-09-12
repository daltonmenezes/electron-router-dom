import { useMemo } from 'react'

import {
  RouterProvider,
  createHashRouter,
  createRoutesFromChildren,
  type RouterProviderProps,
} from 'react-router-dom'

import { toLowerCaseKeys } from 'shared/utils/to-lower-case-keys'

export type RouteDef = Record<string, JSX.Element>

export type RouterProps<T extends RouteDef> =
  | T
  | {
      _providerProps: Omit<Partial<RouterProviderProps>, 'router'>
    }

/**
 * Renders a router component based on the provided routes.
 * @process renderer
 */
export function Router<T extends RouteDef>({
  _providerProps,
  ...routes
}: RouterProps<T>) {
  const selectAllSlashes = /\//g

  const rawId =
    location.hash.split(selectAllSlashes)?.[1]?.toLowerCase() || 'main'

  const windowID = rawId.split('?')[0] || 'main'
  const transformedRoutes: RouteDef = toLowerCaseKeys(routes)

  const Route = () => transformedRoutes[windowID]

  const router = useMemo(
    () =>
      createHashRouter(createRoutesFromChildren(Route()), {
        basename: `/${windowID}`,
      }),
    [windowID]
  )

  return (
    <RouterProvider {...(_providerProps && _providerProps)} router={router} />
  )
}
