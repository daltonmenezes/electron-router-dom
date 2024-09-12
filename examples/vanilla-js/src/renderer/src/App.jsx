import { useSearchParams } from 'react-router-dom'

export function App() {
  const [params] = useSearchParams()

  return (
    <>
      <h1>Electron Router DOM</h1>

      <ul className="version">
        <li>v{params.get('version')}</li>
      </ul>
    </>
  )
}
