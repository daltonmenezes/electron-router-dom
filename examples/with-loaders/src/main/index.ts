import { app, BrowserWindow, shell } from 'electron'
import path from 'node:path'

import { registerRoute } from 'lib/electron-router-dom'

async function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 700,
    height: 450,
    show: false,
    resizable: false,
    alwaysOnTop: true,
  })

  registerRoute({
    id: 'main',
    browserWindow: mainWindow,
    htmlFile: path.join(__dirname, '../renderer/index.html'),
  })

  mainWindow.on('ready-to-show', mainWindow.show)
}

app.whenReady().then(() => {
  createMainWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('web-contents-created', (_, contents) =>
  contents.on('will-navigate', (event, url) => {
    event.preventDefault()

    if (url.startsWith(process.env.ELECTRON_RENDERER_URL!)) return

    shell.openExternal(url)
  })
)
