import { BrowserWindow } from 'electron'
import path from 'node:path'

import { registerRoute } from 'lib/electron-router-dom'

type Route = Parameters<typeof registerRoute>[0]

interface WindowProps extends Electron.BrowserWindowConstructorOptions {
  id: Route['id']
  query?: Route['query']
}

export function createWindow({ id, query, ...options }: WindowProps) {
  const window = new BrowserWindow({
    width: 600,
    height: 250,
    show: false,
    resizable: false,
    alwaysOnTop: true,

    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
    },

    ...options,
  })

  registerRoute({
    id,
    query,
    browserWindow: window,
    htmlFile: path.join(__dirname, '../renderer/index.html'),
  })

  window.on('ready-to-show', () => {
    window.show()
  })

  return window
}

export function createMainWindow() {
  const mainWindow = createWindow({
    id: 'main',
  })

  mainWindow.on('closed', () => {
    BrowserWindow.getAllWindows().forEach((browserWindow) => {
      browserWindow.close()
    })
  })
}
