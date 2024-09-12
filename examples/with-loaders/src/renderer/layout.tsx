import { NavLink, Outlet } from 'react-router-dom'

import { Separator } from './components/ui/separator'
import { Vortex } from './components/ui/vortex'

export function Layout() {
  return (
    <main className="flex flex-col items-center gap-5 mt-1">
      <nav className="flex w-full gap-2 p-4">
        <NavLink to="/">Releases</NavLink>

        <Separator orientation="vertical" className="bg-white border-border" />

        <NavLink to="/about">About</NavLink>

        <Separator orientation="vertical" />

        <NavLink to="/fail">Fail</NavLink>
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
