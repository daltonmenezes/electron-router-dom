import type { BrowserWindow } from 'electron'

import type {
  LiteralUnion,
  TrueCondition,
  ElectronRouterOutput,
} from './shared/types'

import {
  type RouteDef,
  type RouterProps,
  Router as RendererRouter,
} from './renderer'

export type { RouteDef, RouterProps }

import { createFileRoute } from './main/create-file'
import { createURLRoute } from './main/create-url'
import { isDev } from './shared/utils/is-dev'

export type { Query } from './shared/types'

const defaults = { port: 3000, windowId: 'main' } as const

export function createElectronRouter<
  const T extends {
    /**
     * @description The port where the dev server is running.
     * Only necessary if you are not using the devServerUrl property and you are not using the default port.
     * @default 3000
     */
    port?: number

    /**
     * @description The URL of the dev server is running.
     * If not provided, it will use the default URL: `http://localhost:${port}`
     */
    devServerUrl?: string

    /**
     * @description The types definition for the router
     */
    types?: {
      /**
       * @description Enable or disable strict mode
       * @default true
       */
      strict?: boolean

      /**
       * @description The IDs of the routes to represent each of the browser windows you will use.
       * Think of it as a basename of a route.
       */
      ids?: string[]

      /**
       * @description The query keys that will be used in the URLSearchParams
       */
      queryKeys?: string[]
    }
  },
>({ types, devServerUrl, port = defaults.port }: ElectronRouterOutput<T>) {
  type Types = NonNullable<T['types']>
  type IsStrictMode = Types['strict'] extends boolean ? Types['strict'] : true

  /**
   * @description Registers a BrowserWindow to a route
   * @process main
   */
  function registerRoute<
    const S extends {
      /**
       * @description The ID of the route to represent the browser window you are using.
       * Think of it as a basename for this window/route.
       */
      id: Types['ids'] extends string[]
        ? TrueCondition<
            IsStrictMode,
            Types['ids'][number],
            LiteralUnion<Types['ids'][number], string>
          >
        : string

      /**
       * @description The query string in object format to be used in the
       * **URLSearchParams** / **useSearchParams**
       */
      query?: Types['queryKeys'] extends string[]
        ? TrueCondition<
            IsStrictMode,
            Partial<Record<Types['queryKeys'][number], unknown>>,
            Partial<
              Record<LiteralUnion<Types['queryKeys'][number], string>, unknown>
            >
          >
        : Record<string, unknown>

      /**
       * @description The port where the dev server is running.
       *  If a port is already defined in **createElectronRouter** settings,
       *  that port will not be used in this **registerRoute** in favor of this new one.
       */
      port?: number

      /**
       * @description The path to dev server URL.
       * Recommended for HMR (Hot Module Replacement) or cases you need full control over the URL.
       * If not provided, it will use the default URL: `http://localhost:${port}`
       * or the one defined in **createElectronRouter** settings.
       */
      devServerUrl?: string

      /**
       * @description The path to the HTML file related to the BrowserWindow
       */
      htmlFile: string

      browserWindow: BrowserWindow
    },
  >(props: S) {
    const serverUrl =
      props.devServerUrl ||
      devServerUrl ||
      `http://localhost:${props.port ?? port}`

    const windowId = props.id || defaults.windowId

    if (isDev()) {
      const URLRoute = createURLRoute(serverUrl, windowId, {
        query: props.query as Record<string, string>,
      })

      props.browserWindow.loadURL(URLRoute)

      return
    }

    const fileRoute = createFileRoute(props.htmlFile, windowId, {
      query: props.query as Record<string, string>,
    })

    props.browserWindow.loadFile(...fileRoute)
  }

  /**
   * @description The router component
   * @process renderer
   */
  function Router(
    props: Partial<
      RouterProps<
        Types['ids'] extends string[]
          ? IsStrictMode extends true
            ? Record<Types['ids'][number], JSX.Element>
            : Record<LiteralUnion<Types['ids'][number], string>, JSX.Element>
          : Record<string, JSX.Element>
      >
    >
  ): JSX.Element {
    return RendererRouter(props as RouteDef)
  }

  const settings = {
    port,
    devServerUrl,

    types: {
      strict: types?.strict ?? true,
      ids: types?.ids ?? [],
      queryKeys: types?.queryKeys ?? [],
    },
  } as {
    port: T['port'] extends number ? T['port'] : typeof defaults.port
    devServerUrl: T['devServerUrl']

    types: {
      strict: Types['strict'] extends boolean ? Types['strict'] : true
      ids: Types['ids'] extends string[] ? Types['ids'] : []
      queryKeys: Types['queryKeys'] extends string[] ? Types['queryKeys'] : []
    }
  }

  return {
    Router,
    settings,
    registerRoute,
  } as const
}
