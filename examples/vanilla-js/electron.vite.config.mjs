import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

import { settings } from './src/lib/electron-router-dom'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },

  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },

    plugins: [react()],

    server: {
      port: settings.port,
    },
  },
})
