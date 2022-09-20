<h1 align="center">Electron Router DOM</h1>

<p align="center">🌎 A react-router-dom adapter for Electron apps
  <br/><br/>
  <!-- Patreon -->
  <a href="https://www.patreon.com/daltonmenezes">
    <img alt="patreon url" src="https://img.shields.io/badge/support%20on-patreon-1C1E26?style=for-the-badge&labelColor=1C1E26&color=61ffca"/>
  </a>
  <!-- Version -->
  <a href="https://github.com/daltonmenezes/electron-router-dom/releases">
     <img alt="releases url" src="https://img.shields.io/npm/v/electron-router-dom.svg?style=for-the-badge&labelColor=1C1E26&color=61ffca"/>
  </a>  
  <!-- License -->
  <a href="https://github.com/daltonmenezes/electron-router-dom/blob/main/LICENSE">
    <img alt="license url" src="https://img.shields.io/badge/license%20-MIT-1C1E26?style=for-the-badge&labelColor=1C1E26&color=61ffca"/>
  </a>
</p>

<p align="center">
  <a href="#electron-router-dom">
    <img alt="preview" src="./docs/images/undraw_the_world_is_mine_re_j5cr.svg" width="600">
  </a>
</p>

If you've already tried using react-router-dom with Electron, had difficulties getting it to work both in development and in production and in different windows, this library is for you!

# Features
- 🚀 Ready for Development and Production environments
- 🔥 Works on Multiple windows
- 📦 Isolated routes by window id

# Installation
In your terminal, run:
```bash
yarn add electron-router-dom

# OR

npm i electron-router-dom
```
**Router DOM is a peer dependency**, if you haven't installed it yet or your package manager won't handle it automatically for you, so run:
```bash
yarn add react-router-dom

# OR

npm i react-router-dom
```

# Usage

The main thing to keep in mind is: you must **use the same window id** in the **Electron Main Process** used in `createFileRoute` and `createURLRoute` functions and in the **Electron Renderer Process** in the `<Router>` component prop names.

### Electron Main Process

<details>

```ts
import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions as WindowOptions,
} from 'electron'

import { createFileRoute, createURLRoute } from 'electron-router-dom'
import { join } from 'path'

function createWindow(id: string, options: WindowOptions = {}) {
  const window = new BrowserWindow({
    width: 700,
    height: 473,
    ...options,
  })

  const devServerURL = createURLRoute(process.env['ELECTRON_RENDERER_URL']!, id)

  const fileRoute = createFileRoute(
    join(__dirname, '../renderer/index.html'),
    id
  )

  process.env.NODE_ENV === 'development'
    ? window.loadURL(devServerURL)
    : window.loadFile(...fileRoute)

  return window
}

app.whenReady().then(() => {
  createWindow('main', {
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
    },
  })

  createWindow('about', {
    width: 450,
    height: 350,
    show: false,
  })
})
```

</details>

### Electron Renderer Process

<details>

Create a `routes.tsx` file:
```tsx
import { Router, Route } from 'electron-router-dom'

import { MainScreen, AboutScreen, SearchScreen } from './screens'

export function AppRoutes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<MainScreen />} />
          <Route path="/search" element={<SearchScreen />} />
        </>
      }
      about={<Route path="/" element={<AboutScreen />} />}
    />
  )
}
```
Then, import the `AppRoutes` in your `index.tsx`:
```tsx
import ReactDom from 'react-dom/client'
import React from 'react'

import { AppRoutes } from './routes'

ReactDom
  .createRoot(document.querySelector('app') as HTMLElement)
  .render(
    <React.StrictMode>
      <AppRoutes />
    </React.StrictMode>
  )
```
A simple example of a MainScreen component:
```tsx
import { useNavigate } from 'react-router-dom'

// The "App" comes from the context bridge in preload/index.ts
const { App } = window

export function MainScreen() {
  const navigate = useNavigate()

  return (
    <main>
      <button onClick={() => navigate('/search')}>Go to Search screen</button>

      <button onClick={App.OpenAboutWindow}>Open About window</button>
    </main>
  )
}
```

</details>

# API

## Electron Main Process

### createFileRoute
> Creates the route for Electron Window loadFile method for production mode with the given window ID.

**Params:**
- `path: string`
- `id: string`
- `options?: Electron.LoadFileOptions`

**Return:**
- `Array: [string, Electron.LoadFileOptions]`

Example:
```ts
mainWindow.loadFile(
  ...createFileRoute(
    join(__dirname, '../renderer/index.html'),
    'main'
  )
)
```

### createURLRoute
> Creates the URL route for Electron Window loadURL method for development mode for the given window ID.

**Params:**
- `route: string`
- `id: string`

**Return:** `String`

Example:
```ts
mainWindow.loadURL(
  createURLRoute(
    'http://localhost:3333',
    'main'
  )
)
```

## Electron Renderer Process

### Router
> The prop names should be the window ids used in main process passsing a Route component to be rendered when route/window matches

**Props:** `[windowID: string]: JSX.Element`

Example:
```tsx
<Router
  main={<Route path="/" element={<MainScreen />} />}
  about={<Route path="/" element={<AboutScreen />} />}
  settings={<Route path="/" element={<SettingsScreen />} />}
/>
```
#### Multiple Routes in the same window
```tsx
<Router
  main={
    <>
      <Route path="/" element={<MainScreen />} />
      <Route path="/search" element={<SearchScreen />} />
    </>
  }
/>
```

### Route
It's the [react-router-dom](https://reactrouter.com/en/main/route/route#type-declaration) `<Route />` component, same props, same usage. 😄

# Contributing
> **Note**: contributions are always welcome, but always **ask first**, — please — before work on a PR.

That said, there's a bunch of ways you can contribute to this project, like by:

- :beetle: Reporting a bug
- :page_facing_up: Improving this documentation
- :rotating_light: Sharing this project and recommending it to your friends
- :dollar: Supporting this project on GitHub Sponsors or Patreon
- :star2: Giving a star on this repository

# License

[MIT © Dalton Menezes](https://github.com/daltonmenezes/electron-router-dom/blob/main/LICENSE)
