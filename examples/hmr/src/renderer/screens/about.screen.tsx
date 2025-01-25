import json from '~/package.json'

export function AboutScreen() {
  return (
    <div>
      <h1 className="title text-5xl">About</h1>

      <main className="flex flex-col gap-4 mt-4">
        <p>{json.description}</p>
      </main>
    </div>
  )
}
