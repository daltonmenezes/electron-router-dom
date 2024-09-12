import { app, BrowserWindow } from 'electron'
import path from 'node:path'

import json from '../../../../packages/electron-router-dom/package.json'
import { registerRoute } from 'lib/electron-router-dom'

async function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 300,
    show: false,
    resizable: false,
    alwaysOnTop: true,
  })

  registerRoute({
    id: 'main',

    query: {
      version: json.version,
      name: json.author.name,
    },

    browserWindow: mainWindow,
    htmlFile: path.join(__dirname, '../renderer/index.html'),
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
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
