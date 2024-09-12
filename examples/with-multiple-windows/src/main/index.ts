import { app, BrowserWindow, ipcMain } from 'electron'

import json from '../../../../packages/electron-router-dom/package.json'
import { createMainWindow, createWindow } from './factories'

app.whenReady().then(() => {
  createMainWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

ipcMain.handle('create-about-window', ({ sender }) => {
  const aboutWindow = createWindow({
    id: 'about',
    width: 400,
    height: 200,

    query: {
      version: json.version,
    },
  })

  aboutWindow.on('closed', () => {
    if (sender.isDestroyed()) {
      return
    }

    sender.send('about-window-closed')
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
