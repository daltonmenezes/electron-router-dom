import { app, BrowserWindow } from 'electron'
import path from 'node:path'

import { registerRoute } from 'lib/electron-router-dom'

async function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 650,
    height: 300,
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

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
