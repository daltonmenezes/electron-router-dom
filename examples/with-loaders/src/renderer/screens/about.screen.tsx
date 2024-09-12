import { useLoaderData } from 'react-router-dom'

import type { AboutData } from 'renderer/shared/types'

export function AboutScreen() {
  const data = useLoaderData() as AboutData

  return (
    <div>
      <h1 className="title text-5xl">About</h1>

      <main className="flex flex-col gap-4 mt-4">
        <div className="flex w-full gap-2">
          <span>⭐️ {data.stargazers_count}</span>
          <span>🍴 {data.forks_count}</span>
        </div>

        <p>{data.description}</p>
      </main>
    </div>
  )
}
