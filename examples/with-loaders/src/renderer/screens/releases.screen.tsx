import { useLoaderData } from 'react-router-dom'

import { ScrollArea } from 'renderer/components/ui/scroll-area'
import { Separator } from 'renderer/components/ui/separator'

import type { ReleaseData } from 'renderer/shared/types'

export function ReleasesScreen() {
  const releases = useLoaderData() as ReleaseData[]

  return (
    <>
      <header className="flex flex-col items-center">
        <h1 className="title text-5xl">Electron Router DOM</h1>

        <p className="text-lg text-muted-foreground">
          A react-router-dom adapter for Electron apps.
        </p>
      </header>

      <div className="backdrop-blur-md">
        <ScrollArea className="h-[200px] w-[150px] rounded-xl p-4 border border-border">
          {releases?.map((release) => (
            <div key={release.id} className="text-sm text-center">
              <a href={release.html_url}>{release.name}</a>

              <Separator className="my-2 bg-border" />
            </div>
          ))}
        </ScrollArea>
      </div>
    </>
  )
}
