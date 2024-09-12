import { useSearchParams } from 'react-router-dom'

export function AboutScreen() {
  const [params] = useSearchParams()

  return (
    <main className="flex flex-col w-screen h-screen p-6 items-center justify-center gap-1">
      <p className="text-muted-foreground">
        A react-router-dom adapter for Electron apps.
      </p>

      <span className="text-primary-foreground bg-primary rounded-sm px-1">
        Current version: {params.get('version')}
      </span>
    </main>
  )
}
