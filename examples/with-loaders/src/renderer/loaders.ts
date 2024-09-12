import type { LoaderFunctionArgs } from 'react-router-dom'

import type { AboutData, ReleaseData } from './shared/types'

export async function releasesLoader({ request }: LoaderFunctionArgs) {
  const response = await fetch(
    'https://api.github.com/repos/daltonmenezes/electron-router-dom/releases',
    {
      signal: request.signal,
    }
  )

  const releases: ReleaseData[] = await response.json()

  return releases
}

export async function aboutLoader({ request }: LoaderFunctionArgs) {
  const response = await fetch(
    'https://api.github.com/repos/daltonmenezes/electron-router-dom',
    {
      signal: request.signal,
    }
  )

  const data: AboutData = await response.json()

  return data
}
