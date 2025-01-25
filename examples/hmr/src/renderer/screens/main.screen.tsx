import json from '../../../../../packages/electron-router-dom/package.json'

export function MainScreen() {
  return (
    <>
      <header className="flex flex-col items-center">
        <h1 className="title text-5xl">Electron Router DOM</h1>

        <p className="text-lg text-muted-foreground">
          A react-router-dom adapter for Electron apps.
        </p>

        <h2 className="title text-4xl mt-2">v{json.version}</h2>
      </header>
    </>
  )
}
