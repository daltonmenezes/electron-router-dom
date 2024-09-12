import { Link } from 'react-router-dom'

export function ErrorScreen() {
  return (
    <div className="flex flex-col p-4 gap-2">
      <h1 className="title text-5xl">Failed to load...</h1>

      <Link
        to={{
          pathname: '/',
          search: location.search,
        }}
      >
        Back to Releases
      </Link>
    </div>
  )
}
