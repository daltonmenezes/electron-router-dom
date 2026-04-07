import { type ComponentType, useMemo } from 'react'

import {
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
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
 * Helper to grep windowId from {@link location.hash}.
 * @process renderer
 */
export function getWindowId(): string {
  const selectAllSlashes = /\//g;

  const rawId =
    location.hash.split(selectAllSlashes)?.[1]?.toLowerCase() || "main";

  return rawId.split("?")[0] || "main";
}

/**
 * Renders a router component based on the provided routes.
 * @process renderer
 */
export function Router<T extends RouteDef>({
  _providerProps,
  ...routes
}: RouterProps<T>): JSX.Element {
  const windowID = getWindowId()
  const router = useMemo(
    () => {
      const transformedRoutes: RouteDef = toLowerCaseKeys(routes)
      const newRoutes = createRoutesFromElements(
        transformedRoutes[windowID]
      )

      return createHashRouter(newRoutes, {
        basename: `/${windowID}`,
      })
    },
    [windowID]
  )

  const RouterProviderComponent =
    RouterProvider as ComponentType<RouterProviderProps>

  return (
    <RouterProviderComponent
      {...(_providerProps && _providerProps)}
      router={router}
    />
  )
}
