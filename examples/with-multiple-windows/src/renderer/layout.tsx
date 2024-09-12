import { type MouseEvent, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'

import { Vortex } from './components/ui/vortex'

const { api } = window

export function Layout() {
  const aboutButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    api.onAboutWindowClosed(() => {
      aboutButtonRef.current!.disabled = false
    })
  }, [])

  function createAboutWindow(event: MouseEvent<HTMLButtonElement>) {
    api.createAboutWindow()
    event.currentTarget.disabled = true
  }

  return (
    <main className="flex flex-col items-center gap-5 mt-1">
      <nav className="flex w-full gap-2 p-4">
        <button
          className="disabled:opacity-50 disabled:text-primary"
          onClick={createAboutWindow}
          ref={aboutButtonRef}
        >
          About
        </button>
      </nav>

      <section className="items-center justify-center flex flex-col gap-6">
        <Outlet />
      </section>

      <div className="fixed left-0 -top-50 size-full -z-10 overflow-hidden">
        <Vortex
          backgroundColor="transparent"
          className="flex size-full"
          rangeY={300}
          baseRadius={2}
          particleCount={20}
          rangeSpeed={1.5}
          baseHue={50}
        />
      </div>
    </main>
  )
}
