/**
 * @description Check if the app is running in development mode
 * @process main
 * @returns boolean
 */
export function isDev() {
  const { app } = require('electron')

  return !app.isPackaged
}
