import { HashRouter, Routes } from 'react-router-dom'

import { toLowerCaseKeys } from '../shared'

export { Route } from 'react-router-dom'

export interface RouterProps {
  [windowID: string]: any
}

export function Router(routes: RouterProps) {
  const selectAllSlashes = /\//g

  const windowID =
    location.hash.split(selectAllSlashes)?.[1]?.toLowerCase() || 'main'

  const transformedRoutes = toLowerCaseKeys(routes)

  return (
    <HashRouter basename={windowID}>
      <Routes>{transformedRoutes[windowID]}</Routes>
    </HashRouter>
  )
}
