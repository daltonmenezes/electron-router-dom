import { ipcRenderer, contextBridge } from 'electron'

const api = {
  createAboutWindow: () => {
    ipcRenderer.invoke('create-about-window')
  },

  onAboutWindowClosed: (callback: () => void) => {
    ipcRenderer.on('about-window-closed', callback)
  },
} as const

contextBridge.exposeInMainWorld('api', api)

declare global {
  interface Window {
    api: typeof api
  }
}
