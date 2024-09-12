import { Route } from 'react-router-dom'

import { ReleasesScreen } from './screens/releases.screen'
import { AboutScreen } from './screens/about.screen'
import { ErrorScreen } from './screens/error.screen'

import { aboutLoader, releasesLoader } from './loaders'
import { Router } from 'lib/electron-router-dom'
import { Layout } from './layout'

export function Routes() {
  return (
    <Router
      _providerProps={{
        fallbackElement: (
          <div className="flex w-full h-screen items-center justify-center">
            <h1 className="title text-3xl">Loading...</h1>
          </div>
        ),
      }}
      main={
        <Route path="/" element={<Layout />} errorElement={<ErrorScreen />}>
          <Route
            path="/"
            loader={releasesLoader}
            element={<ReleasesScreen />}
          />

          <Route path="/about" loader={aboutLoader} element={<AboutScreen />} />
        </Route>
      }
    />
  )
}
