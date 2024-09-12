import { app, BrowserWindow } from 'electron'
import { join } from 'node:path'

import { registerRoute } from '../lib/electron-router-dom'

import json from 'electron-router-dom/package.json'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 200,
    show: false,
    alwaysOnTop: true,
  })

  registerRoute({
    id: 'main',
    browserWindow: mainWindow,
    htmlFile: join(__dirname, '../renderer/index.html'),

    query: {
      version: json.version,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
