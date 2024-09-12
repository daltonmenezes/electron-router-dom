import { Route } from 'react-router-dom'

import { MainScreen } from './screens/main.screen'
import { AboutScreen } from './screens/about.screen'

import { Router } from 'lib/electron-router-dom'
import { Layout } from './layout'

export function Routes() {
  return (
    <Router
      main={
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainScreen />} />
        </Route>
      }
      about={<Route path="/" element={<AboutScreen />} />}
    />
  )
}
