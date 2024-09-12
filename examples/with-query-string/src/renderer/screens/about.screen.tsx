import { useSearchParams } from 'react-router-dom'

export function AboutScreen() {
  const [params] = useSearchParams()

  return (
    <div className="flex flex-col items-center px-8">
      <p className="text-lg text-muted-foreground">
        A react-router-dom adapter for Electron apps.
      </p>

      <p className="text-lg text-muted-foreground">
        Currently on version{' '}
        <strong className="text-secondary-active">
          {params.get('version')}
        </strong>
        .
      </p>
    </div>
  )
}
