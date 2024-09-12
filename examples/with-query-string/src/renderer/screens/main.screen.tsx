import { useSearchParams } from 'react-router-dom'

export function MainScreen() {
  const [params] = useSearchParams()

  return (
    <>
      <header className="flex flex-col items-center">
        <h1 className="title text-5xl">Electron Router DOM</h1>

        <p className="text-lg text-muted-foreground">
          A react-router-dom adapter for Electron apps.
        </p>
      </header>

      <div>
        <h2>
          <strong>version:</strong> {params.get('version')}
        </h2>

        <h2>
          <strong>author:</strong> {params.get('name')}
        </h2>
      </div>
    </>
  )
}
